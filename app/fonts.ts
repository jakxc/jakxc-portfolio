import localFont from "next/font/local";

export const pokemonSolid = localFont({
  src: "../public/assets/fonts/Pokemon Solid.ttf",
  variable: "--font-display",
  display: "swap",
});

export const pokemonClassic = localFont({
  src: "../public/assets/fonts/Pokemon Classic.ttf",
  variable: "--font-mono-dex",
  display: "swap",
});
