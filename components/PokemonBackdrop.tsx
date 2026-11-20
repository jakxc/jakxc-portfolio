import Image from "next/image";

const SPRITE_BASE =
  "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/versions/generation-v/black-white/animated";

type Sprite = {
  name: string;
  id: number;
  className: string;
  delay: string;
};

// Scattered across the full page background (not just viewport corners),
// so they turn up at different points as the page scrolls.
const SPRITES: Sprite[] = [
  {
    name: "Arcanine",
    id: 59,
    className: "left-[6%] top-[12%]",
    delay: "0s",
  },
  {
    name: "Marowak",
    id: 105,
    className: "right-[8%] top-[38%]",
    delay: "0.6s",
  },
  {
    name: "Scizor",
    id: 212,
    className: "left-[10%] top-[66%]",
    delay: "1.2s",
  },
  {
    name: "Kingler",
    id: 99,
    className: "right-[6%] top-[88%]",
    delay: "1.8s",
  },
  {
    name: "Snorlax",
    id: 143,
    className: "left-[20%] top-[30%]",
    delay: "2.4s",
  },
  {
    name: "Lapras",
    id: 131,
    className: "right-[18%] top-[60%]",
    delay: "3s",
  },
  {
    name: "Venusaur",
    id: 3,
    className: "left-[30%] top-[10%]",
    delay: "3.6s",
  },
  {
    name: "Gengar",
    id: 94,
    className: "right-[28%] top-[20%]",
    delay: "4.2s",
  }
];

/**
 * Decorative, animated classic-style Pokémon sprites scattered behind the
 * page content. Purely decorative: hidden from assistive tech and dimmed
 * out entirely when the user prefers reduced motion.
 */
export default function PokemonBackdrop() {
  return (
    <div
      aria-hidden="true"
      className="pokemon-backdrop pointer-events-none absolute inset-0 -z-10 overflow-hidden"
    >
      {SPRITES.map((sprite) => (
        <Image
          key={sprite.name}
          src={`${SPRITE_BASE}/${sprite.id}.gif`}
          alt=""
          width={96}
          height={96}
          unoptimized
          className={`animate-bob absolute w-16 h-auto drop-shadow-md sm:w-24 ${sprite.className}`}
          style={{ animationDelay: sprite.delay }}
          loading="lazy"
        />
      ))}
    </div>
  );
}
