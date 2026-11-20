"use client";

import { useState } from "react";
import ProjectCard from "../ProjectCard";
import { projects } from "@/data/portfolio";

const pad = (n: number) => String(n).padStart(2, "0");

export default function ProjectsScreen() {
  const [index, setIndex] = useState(0);
  const total = projects.length;

  if (total === 0) {
    return (
      <p className="font-dex text-xs text-(--color-gbc-lcd-mid)">
        &gt; NO ENTRIES YET
      </p>
    );
  }

  const step = (dir: 1 | -1) => setIndex((i) => (i + dir + total) % total);

  return (
    <div>
      <h1 className="font-dex text-xs text-(--color-gbc-lcd-mid) sm:text-sm">
        &gt; POKÉDEX
      </h1>

      <ProjectCard project={projects[index]} index={index} />

      <div className="mt-5 flex items-center justify-between font-dex text-[10px] text-(--color-gbc-lcd-ink) uppercase sm:text-xs">
        <button
          type="button"
          onClick={() => step(-1)}
          aria-label="Previous entry"
          className="px-1 py-1 hover:bg-(--color-gbc-lcd-light) focus-visible:outline-2 focus-visible:outline-(--color-gbc-lcd-ink)"
        >
          &lt; Prev
        </button>
        <span aria-live="polite">
          {pad(index + 1)} / {pad(total)}
        </span>
        <button
          type="button"
          onClick={() => step(1)}
          aria-label="Next entry"
          className="px-1 py-1 hover:bg-(--color-gbc-lcd-light) focus-visible:outline-2 focus-visible:outline-(--color-gbc-lcd-ink)"
        >
          Next &gt;
        </button>
      </div>
    </div>
  );
}