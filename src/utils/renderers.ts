const renderCurrency = (input: string | number): string => {
  console.log("rendering currency", input);
  input = input.toString();
  const pos = input.indexOf(".");
  if (pos >= 0) {
    const left = input.substring(0, pos);
    const right = input.substring(pos + 1);
    return left + "." + right;
  } else {
    return input.toString() + ".00";
  }
};

export const Renderers = {
  renderCurrency: renderCurrency,
};
