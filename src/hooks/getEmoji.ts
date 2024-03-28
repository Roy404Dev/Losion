
interface Emoji {
  unified: string;
  // Add more properties if necessary
}


export const getEmoji = (e: Emoji) => {
  let sym = e.unified.split("-");
  let codesArray: number[] = []; // Explicitly defining the type as number[]
  sym.forEach((el) => codesArray.push(parseInt(el, 16))); // Parse hexadecimal string to number
  let emoji = String.fromCodePoint(...codesArray);
  return emoji;
};