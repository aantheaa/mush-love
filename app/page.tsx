"use client";

import { useEffect, useRef, useState } from "react";
import { Monofett } from "next/font/google";
import hasMush from "@/lib/mushDetector";
import JSConfetti from "js-confetti";

// watercolor painting, cluster of mushrooms with psychedelic coloring, bright colors, magical feeling
const monofett = Monofett({
  subsets: ["latin"],
  variable: "--font-monofett",
  weight: "400",
});

export default function Home() {
  const [input, setInput] = useState("");
  const [imageData, setImageData] = useState<string>();
  const [isLoading, setIsLoading] = useState(false);
  const confetti = useRef<JSConfetti>();
  useEffect(() => {
    confetti.current = new JSConfetti();
  }, []);

  const handleSend = async (txt: string) => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/getImage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ text: txt }),
      });
      if (response.ok) {
        const { data } = await response.json();
        setImageData(`data:image/jpeg;base64,${data}`);
        if (!hasMush(txt)) {
          setTimeout(() => {
            alert("🍄 nice try, but you're missing the mushrooms 🍄");
          }, 0);
        }
        confetti.current?.addConfetti({
          emojis: ["🍄"],
          emojiSize: 50,
          confettiNumber: 100,
        });
      } else {
        console.error("Failed: " + response.status);
        alert("oh no something went wrong");
      }
    } catch (error) {
      console.error("Failed:", error);
    }
    setIsLoading(false);
  };

  return (
    <main
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: "100vw",
        padding: "0 16px",
      }}
    >
      <h3
        style={{
          textAlign: "center",
          marginTop: "50px",
          fontSize: 48,
          color: "salmon",
        }}
        className={`${monofett.className} .site-header`}
      >
        <span style={{ opacity: 0.6 }}>welcome to</span>
        <br />
        mush love ai
      </h3>
      <p
        style={{
          textAlign: "center",
          marginTop: "50px",
          marginBottom: "50px",
          maxWidth: 500,
          color: "gray",
        }}
      >
        a fungi-run lab hidden deep in the forest, dedicated to making all your
        mushroom dreams come true. use your imagination to describe a scene
        involving mushrooms and be sure to specify the artistic style
        you&apos;re imagining, e.g.{" "}
        <span style={{ color: "lightgoldenrodyellow" }}>
          watercolor painting, colors, and overall vibe.
        </span>{" "}
        It usually takes around 5 seconds for the fungis to work their magic...
      </p>

      <textarea
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            handleSend(input);
            e.stopPropagation();
            e.preventDefault();
          }
        }}
        style={{
          padding: 8,
          borderRadius: 10,
          width: "100%",
          maxWidth: 600,
          fontSize: 14,
        }}
        rows={2}
      />
      <button
        id="submit-btn"
        onClick={() => handleSend(input)}
        style={{
          fontSize: "18px",
          marginTop: "20px",
          marginBottom: "20px",
          padding: "8px 16px",
          cursor: isLoading ? "not-allowed" : "pointer",
          borderRadius: 12,
          background: "salmon",
          borderWidth: 0,
        }}
        className={isLoading ? "bounce" : ""}
        disabled={isLoading || !input}
      >
        {isLoading ? "🍄 loading 🍄" : "🍄 send 🍄"}
      </button>
      {imageData && (
        <img
          src={imageData}
          alt="Fetched"
          style={{ maxWidth: "100%", borderRadius: 10, maxHeight: "90vh" }}
        />
      )}
      <div
        style={{
          bottom: "0",
          width: "100%",
          textAlign: "center",
          margin: "32px 0",
          color: "gray",
          fontSize: 13,
        }}
      >
        by Anthea
      </div>
    </main>
  );
}
