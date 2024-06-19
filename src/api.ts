interface Idiag {
  error: number;
  success: boolean;
  data?: any;
  count?: number;
  downloadTime?: number;
  processTime?: number;
}

export const consume = async (
  setLoading: (b: boolean) => void,
  setDownloaded: (e: number) => void,
  url: string,
  endPoint: string
) => {
  const startTime = new Date();
  const response = await fetch(url + "/" + endPoint + "?count=1000", {
    signal: AbortSignal.timeout(60000),
  });
  const stream = response.body;
  const textStream = stream!.pipeThrough(new TextDecoderStream());
  const downloadCompleteTime = new Date();
  const timeDifference = downloadCompleteTime.getTime() - startTime.getTime();
  const downloadSeconds = timeDifference / 1000;

  const returnArray = [];
  let allData = "";
  let totalDownloaded = 0;
  let iteration = 0;
  let jsonDiag: Idiag = { error: 0, success: true };

  const processStartTime = new Date();
  try {
    for await (const chunk of textStream) {
      setLoading(false);
      // console.log(
      //   'chunk length',
      //   chunk.length,
      //   ', allData.length: ' + allData.length,
      // );
      totalDownloaded = totalDownloaded + chunk.length;
      setDownloaded(totalDownloaded);
      allData += chunk;
      let endPosition = allData.indexOf("}");

      while (endPosition > 0) {
        if (iteration === 0) {
          // get the error number and success variable
          const firstBracketPosition = allData.indexOf("[");
          const diagnostics =
            allData.substring(0, firstBracketPosition + 1) + "]}";
          jsonDiag = JSON.parse(diagnostics);
          allData = allData.substr(firstBracketPosition + 1);

          endPosition = allData.indexOf("}");
          const tmp = allData.substring(0, endPosition + 1);
          const record = JSON.parse(tmp);
          returnArray.push(record);
          allData = allData.substr(endPosition + 2);
        } else {
          if (allData.startsWith(",")) {
            allData = allData.substr(1);
          }
          endPosition = allData.indexOf("}");
          const record = JSON.parse(allData.substring(0, endPosition + 1));
          returnArray.push(record);
          allData = allData.substr(endPosition + 2);
        }

        // update end position
        endPosition = allData.indexOf("}");
        iteration++;
      }
    }
    if (allData.length > 0) {
      const endPosition = allData.indexOf("}");
      if (endPosition > 0) {
        const record = JSON.parse(allData);
        returnArray.push(record);
      }
    }
  } catch (error) {
    console.log(`error on iteration: ${iteration}, allData: ${allData}`);
    console.log("error", error);
  }

  const processEndTime = new Date();
  const difference = processEndTime.getTime() - processStartTime.getTime();
  const processSeconds = difference / 1000;

  const data: Idiag = {
    error: jsonDiag.error,
    success: jsonDiag.success,
    data: returnArray,
    count: returnArray.length,
    downloadTime: downloadSeconds,
    processTime: processSeconds,
  };
  return data;
};
