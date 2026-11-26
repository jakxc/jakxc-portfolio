import Image from "next/image";
import { experience } from "@/data/portfolio";

// PokeAPI item used as the icon. The standard Poké Ball is the one that still
// reads clearly in black and white (Great/Ultra/Master Ball turn muddy).
const BALL = "poke-ball";

async function fetchBallSprite(): Promise<string | null> {
  try {
    const res = await fetch(`https://pokeapi.co/api/v2/item/${BALL}`, {
      // Item data almost never changes, and PokeAPI asks clients to cache
      next: { revalidate: 60 * 60 * 24 * 30 },
    });
    if (!res.ok) return null;

    const data: { sprites?: { default?: string | null } } = await res.json();
    return data.sprites?.default ?? null;
  } catch {
    return null; // PokeAPI unreachable: render the page without icons
  }
}

export default async function ExperienceScreen() {
  const ballSrc = await fetchBallSprite();

  return (
    <div className="text-black">
      <h1 className="font-dex text-xs sm:text-sm">&gt; EVOLUTION LINE</h1>
      <p className="mt-2 text-[10px] leading-relaxed sm:text-xs">
        My journey so far — each role a new evolution.
      </p>

      {/* ml-3 keeps the number squares inside the scroll area */}
      <ol className="mt-5 ml-3 flex flex-col gap-7 border-l-2 border-black pl-6">
        {experience.map((item, i) => (
          <li key={item.id} className="relative">
            <span
              className="absolute top-0 -left-[2.3rem] flex h-6 w-6 items-center justify-center bg-black font-dex text-[10px] text-white"
              aria-hidden="true"
            >
              {i + 1}
            </span>

            <div className="flex items-start justify-between gap-3">
              <h2 className="font-dex text-xs leading-snug sm:text-sm">
                {item.role}
              </h2>
              {ballSrc && (
                <Image
                  src={ballSrc}
                  alt=""
                  width={30}
                  height={30}
                  unoptimized
                  className="shrink-0 grayscale contrast-150 [image-rendering:pixelated]"
                />
              )}
            </div>

            <p className="mt-1 font-dex text-[10px] sm:text-xs">
              {item.company}
            </p>
            <p className="mt-2 w-fit bg-black px-2 py-0.5 font-dex text-[10px] text-white">
              {item.period}
            </p>

            <p className="mt-3 border-2 border-black p-3 text-[10px] leading-relaxed sm:text-xs">
              {item.description}
            </p>

            <ul className="mt-3 space-y-1.5 text-[10px] leading-relaxed sm:text-xs">
              {item.highlights.map((h) => (
                <li key={h} className="flex gap-2">
                  <span
                    className="mt-[0.35rem] h-1.5 w-1.5 shrink-0 bg-black"
                    aria-hidden="true"
                  />
                  {h}
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ol>
    </div>
  );
}