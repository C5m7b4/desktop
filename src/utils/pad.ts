export type PadInput = string;
export type PadDirection = "left" | "right";

export const pad = (
  input: PadInput,
  desiredLength: number,
  padChar: string,
  direction: PadDirection = "left"
) => {
  if (typeof input !== "string") return input;
  if (typeof desiredLength !== "number") return input;
  if (typeof padChar !== "string") return input;

  const charsToPad = desiredLength - input.length;
  const padding = [...Array(Number(charsToPad))].map(() => {
    return padChar;
  });

  if (direction.toLowerCase() === "left") {
    return padding.join("") + input;
  } else {
    return input + padding.join("");
  }
};
