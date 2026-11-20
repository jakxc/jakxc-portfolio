"use client";

import { useState } from "react";
import { skills } from "@/data/portfolio";

type Ability = {
  name: string;
  /** Rating out of 10 */
  score: number;
  /** Category name in `skills` whose items show as this ability's moves */
  skillCategory?: string;
};

// Set `skillCategory` to the matching category name in data/portfolio
// to list that category's items under the ability. Leave it out to hide moves.
const ABILITIES: readonly Ability[] = [
  { name: "Front-End Development", score: 9, skillCategory: "Frontend" },
  { name: "Back-End Development", score: 6, skillCategory: "Backend" },
  {
    name: "Database Management & Data Storage",
    score: 6,
    skillCategory: "Databases",
  },
  { name: "DevOps, Tools & Deployment", score: 7, skillCategory: "DevOps" },
  { name: "AI Integration", score: 8, skillCategory: "AI" },
];

const MAX_SCORE = 10;
const CX = 80;
const CY = 80;
const RADIUS = 58;
const RINGS = [1 / 3, 2 / 3, 1];

const pad = (n: number, size: number) => String(n).padStart(size, "0");

function movesFor(ability: Ability): readonly string[] {
  if (!ability.skillCategory) return [];
  return skills.find((g) => g.category === ability.skillCategory)?.items ?? [];
}

// Point on the radar for axis i of n, starting at 12 o'clock
function vertex(i: number, n: number, r: number): [string, string] {
  const angle = -Math.PI / 2 + (i * 2 * Math.PI) / n;
  return [(CX + r * Math.cos(angle)).toFixed(1), (CY + r * Math.sin(angle)).toFixed(1)];
}

function Radar({ selected }: { selected: number }) {
  const n = ABILITIES.length;
  const ring = (scale: number) =>
    ABILITIES.map((_, i) => vertex(i, n, RADIUS * scale).join(",")).join(" ");
  const data = ABILITIES.map((a, i) =>
    vertex(i, n, (RADIUS * a.score) / MAX_SCORE).join(","),
  ).join(" ");

  return (
    <svg
      viewBox="0 0 160 160"
      role="img"
      aria-label={`Ability radar: ${ABILITIES.map(
        (a) => `${a.name} ${a.score} out of ${MAX_SCORE}`,
      ).join(", ")}`}
      className="h-40 w-40 shrink-0"
    >
      {RINGS.map((s) => (
        <polygon
          key={s}
          points={ring(s)}
          strokeWidth={1}
          className="fill-none stroke-(--color-gbc-lcd-ink)/30"
        />
      ))}

      {ABILITIES.map((_, i) => {
        const [x, y] = vertex(i, n, RADIUS);
        return (
          <line
            key={i}
            x1={CX}
            y1={CY}
            x2={x}
            y2={y}
            strokeWidth={1}
            className="stroke-(--color-gbc-lcd-ink)/30"
          />
        );
      })}

      <polygon
        points={data}
        strokeWidth={1.5}
        strokeLinejoin="round"
        className="fill-(--color-gbc-lcd-mid)/40 stroke-(--color-gbc-lcd-ink)"
      />

      {ABILITIES.map((a, i) => {
        const [x, y] = vertex(i, n, (RADIUS * a.score) / MAX_SCORE);
        return (
          <circle
            key={i}
            cx={x}
            cy={y}
            r={i === selected ? 4 : 2.5}
            className="fill-(--color-gbc-lcd-ink)"
          />
        );
      })}

      {/* Numbers match the rows below */}
      {ABILITIES.map((_, i) => {
        const [x, y] = vertex(i, n, RADIUS + 12);
        return (
          <text
            key={i}
            x={x}
            y={y}
            textAnchor="middle"
            dominantBaseline="central"
            className={`font-dex text-[9px] ${
              i === selected
                ? "fill-(--color-gbc-lcd-ink)"
                : "fill-(--color-gbc-lcd-mid)"
            }`}
          >
            {pad(i + 1, 2)}
          </text>
        );
      })}
    </svg>
  );
}

export default function SkillsScreen() {
  const [selected, setSelected] = useState(0);
  const ability = ABILITIES[selected];
  const moves = movesFor(ability);

  return (
    <div>
      <h1 className="font-dex text-xs text-(--color-gbc-lcd-mid) sm:text-sm">
        &gt; ABILITIES
      </h1>

      {/* Radar + selected entry header */}
      <div className="mt-3 flex flex-col items-center gap-3 sm:flex-row sm:items-start">
        <Radar selected={selected} />

        <div className="min-w-0 flex-1 self-stretch" aria-live="polite">
          <p className="font-dex text-[10px] text-(--color-gbc-lcd-mid)">
            NO. {pad(selected + 1, 3)}
          </p>
          <h2 className="mt-1 font-dex text-sm leading-snug font-bold text-(--color-gbc-lcd-ink) sm:text-base">
            {ability.name}
          </h2>
          <div className="mt-3 flex flex-wrap gap-2">
            <span className="bg-(--color-gbc-lcd-ink) px-2 py-0.5 text-[10px] text-(--color-gbc-lcd-light)">
              {ability.score}/{MAX_SCORE}
            </span>
            {moves.length > 0 && (
              <span className="border-2 border-(--color-gbc-lcd-ink) px-2 py-0.5 text-[10px] text-(--color-gbc-lcd-ink)">
                {moves.length} MOVES
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Stat rows */}
      <ul className="mt-4 flex flex-col gap-1">
        {ABILITIES.map((a, i) => {
          const isSelected = i === selected;
          return (
            <li key={a.name}>
              <button
                type="button"
                aria-pressed={isSelected}
                onClick={() => setSelected(i)}
                className={`w-full px-1.5 py-1.5 text-left focus-visible:outline-2 focus-visible:outline-(--color-gbc-lcd-ink) ${
                  isSelected ? "bg-(--color-gbc-lcd-light)" : ""
                }`}
              >
                <span className="flex items-start gap-2 text-[10px] leading-snug text-(--color-gbc-lcd-ink) uppercase">
                  <span
                    className={`gbc-cursor mt-0.5 ${isSelected ? "" : "invisible"}`}
                    aria-hidden="true"
                  />
                  <span className="text-(--color-gbc-lcd-mid)">{pad(i + 1, 2)}</span>
                  <span className="min-w-0 flex-1">{a.name}</span>
                  <span className="whitespace-nowrap">
                    {a.score}/{MAX_SCORE}
                  </span>
                </span>
                <span className="mt-1 flex gap-0.5" aria-hidden="true">
                  {Array.from({ length: MAX_SCORE }, (_, b) => (
                    <span
                      key={b}
                      className={`h-2 flex-1 ${
                        b < a.score
                          ? "bg-(--color-gbc-lcd-ink)"
                          : "bg-(--color-gbc-lcd-ink)/15"
                      }`}
                    />
                  ))}
                </span>
              </button>
            </li>
          );
        })}
      </ul>

      {/* Moves for the selected ability */}
      {moves.length > 0 && (
        <>
          <h2 className="mt-5 font-dex text-[10px] text-(--color-gbc-lcd-mid) uppercase">
            &gt; {ability.name} moves
          </h2>
          <ul className="mt-2 grid grid-cols-1 gap-2 sm:grid-cols-2">
            {moves.map((item) => (
              <li
                key={item}
                className="border-2 border-(--color-gbc-lcd-ink) bg-(--color-gbc-lcd-light) px-2 py-1.5 text-[10px] leading-tight text-(--color-gbc-lcd-ink) uppercase"
              >
                {item}
              </li>
            ))}
          </ul>
        </>
      )}

      {/* Dex entry */}
      <p className="mt-5 mb-1 border-2 border-(--color-gbc-lcd-ink) bg-(--color-gbc-lcd-light) p-3 text-[10px] leading-relaxed text-(--color-gbc-lcd-ink)">
        Constantly trying to learn new stacks and keep up to date in the ever-evolving world of web and app development.
      </p>
    </div>
  );
}