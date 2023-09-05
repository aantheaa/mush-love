import { NextResponse } from "next/server";

export async function POST(req) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.SUBSTRATE_SECRET_KEY}`,
  };
  const { text } = await req.json();
  let prompt;
  if (!text.toLowerCase().includes("shroom")) {
    prompt = `mushrooms, ${text}`;
  } else {
    prompt = text;
  }

  try {
    const response = await fetch("https://api.substrate.run/sdxl", {
      method: "POST",
      headers,
      body: JSON.stringify({ prompt, steps: 32 }),
    });

    if (response.ok) {
      const responseData = await response.json();
      return NextResponse.json({ data: responseData.generated_images[0] });
    } else {
      return NextResponse.json({ error: "Failed to fetch image" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch image," });
  }
}
