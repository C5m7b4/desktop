export interface IBody {
  _uid: string;
  component: string;
  height: number;
  width: number;
  title?: string;
  name?: string;
}

interface IContent {
  body: IBody[];
}

export interface ILayout {
  content: IContent;
}

export const layout: ILayout = {
  content: {
    body: [
      {
        _uid: "hkhwer98u987",
        component: "counter",
        height: 400,
        width: 400,
        title: "Counter",
        name: "Counter",
      },
    ],
  },
};

export const layout1: ILayout = {
  content: {
    body: [
      {
        _uid: "lkjlkjlksdf",
        component: "window",
        height: 500,
        width: 400,
        title: "Window",
        name: "Window",
      },
      {
        _uid: "hsdkerer",
        component: "calculator",
        height: 200,
        width: 400,
        title: "Calculator",
        name: "Calculator",
      },
    ],
  },
};
