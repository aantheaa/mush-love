export default function hasMush(prompt: string): boolean {
  if (prompt.startsWith("!")) {
    return true;
  }
  const cleanedText = prompt.toLowerCase();
  return cleanedText.includes("shroom") || cleanedText.includes("mush");
}
