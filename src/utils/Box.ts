export const Box = <T>(x: T[] | T) => ({
  map: (f: Function) => Box(f(x)),
  fold: (f: Function) => f(x),
  trace: () => {
    console.log("internal trace: ", x);
    return Box(x);
  },
  inspect: () => "Box: (" + x + ")",
});
