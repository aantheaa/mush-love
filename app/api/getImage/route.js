import { NextResponse } from "next/server";
import hasMush from "../../../lib/mushDetector";

function mushify(text) {
  let finalPrompt;

  if (text.startsWith("!")) {
    finalPrompt = text.slice(1);
  } else if (hasMush(text)) {
    finalPrompt = text;
  } else {
    finalPrompt = `shroom ${text}`;
  }

  return finalPrompt;
}

export async function POST(req) {
  const headers = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: `Bearer ${process.env.SUBSTRATE_SECRET_KEY}`,
  };
  const { text } = await req.json();
  const prompt = mushify(text);

  try {
    const response = await fetch("https://api.substrate.run/sdxl", {
      method: "POST",
      headers,
      body: JSON.stringify({ prompt, steps: 32, width: 800, height: 800 }),
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
