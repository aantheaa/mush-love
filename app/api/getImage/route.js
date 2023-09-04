import { NextResponse } from "next/server";

export async function POST(req, res) {
  const myHeaders = {
    Accept: "application/json",
    "Content-Type": "application/json",
    Authorization: "Bearer apik_tBMK3wKpQHuf0V4opcMPYpNZQC0Uq9VB",
  };
  const { text } = await req.json();

  try {
    const response = await fetch("https://api.substrate.run/sdxl", {
      method: "POST",
      headers: myHeaders,
      body: JSON.stringify({ prompt: text }),
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
