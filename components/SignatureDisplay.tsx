"use client";

import { useEffect, useState } from "react";

const FRAME_1 = [
  '  ______    ____ ',
  ' /\\    /\\  | "o |',
  '|  \\/\\/  |/ ___\\|',
  '|gpPacheco_/     ',
  '/_/_/ /_/_/      ',
].join("\n");

const FRAME_2 = [
  '  ______    ____ ',
  ' /\\    /\\  | "^ |',
  '|  \\/\\/  |/ ___\\|',
  '|gpPacheco_/     ',
  '\\_\\_\\ \\_\\_\\      ',
].join("\n");

export default function SignatureDisplay() {
  const [frame, setFrame] = useState(0);

  const frames = [FRAME_1, FRAME_2];

  useEffect(() => {
    const interval = setInterval(() => {
      setFrame((prev) => (prev === 0 ? 1 : 0));
    }, 300);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col items-center">
      <pre
        aria-label="ASCII signature animation"
        style={{
          color: "#38bdf8",
          fontFamily: "'Courier New', Courier, monospace",
          fontSize: "clamp(0.55rem, 1.2vw, 0.8rem)",
          lineHeight: "1.35",
          letterSpacing: "0",
          userSelect: "none",
          display: "inline-block",
          minWidth: "18ch",
          textAlign: "left",
          textShadow:
            "0 0 12px rgba(56,189,248,0.6), 0 0 30px rgba(56,189,248,0.2)",
          whiteSpace: "pre",
          transition: "opacity 0.15s ease",
        }}
      >
        {frames[frame]}
      </pre>
    </div>
  );
}
