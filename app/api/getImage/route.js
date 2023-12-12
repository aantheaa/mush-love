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
      body: JSON.stringify({
        prompt,
        steps: 32,
        width: 1024,
        height: 1024,
        use_ssd: false,
        use_turbo: false,
        use_hosted_url: false,
        use_refiner: true,
      }),
    });
    if (response.ok) {
      const res = await response.json();
      return NextResponse.json(res);
    } else {
      return NextResponse.json({ error: "Failed to fetch image" });
    }
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch image," });
  }
}
