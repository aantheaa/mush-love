export default function hasMush(prompt: string): boolean {
  if (prompt.startsWith("!")) {
    return true;
  }
  return prompt.toLowerCase().includes("shroom");
}
