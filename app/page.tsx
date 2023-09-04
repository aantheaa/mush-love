"use client";

import { useState } from "react";

// watercolor painting, cluster of mushrooms with psychedelic coloring, bright colors, magical feeling

export default function Home() {
  const [input, setInput] = useState("");
  const [imageData, setImageData] = useState(null);

  const handleSend = async () => {
    try {
      const response = await fetch("/api/getImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: input }),
      });

      if (response.ok) {
        const { data } = await response.json();
        setImageData(`data:image/jpeg;base64,${data}`);
      } else {
        console.error("Failed: " + response.status);
      }
    } catch (error) {
      console.error("Failed:", error);
    }
  };

  return (
    <main>
      <div>
        <div>By Anthea</div>
      </div>
      <div style={{ textAlign: "center" }}>
        <input value={input} onChange={(e) => setInput(e.target.value)} />
        <button onClick={handleSend}>Send</button>
        {imageData && <img src={imageData} alt="Fetched" />}
      </div>
      <p>welcome to mush love</p>
    </main>
  );
}
