import type { Metadata } from "next";
import { Geist } from "next/font/google";
import { pokemonSolid, pokemonClassic } from "./fonts";
import PokemonBackdrop from "@/components/PokemonBackdrop";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-body",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Jakxc Portfolio",
  description: "A portfolio website for Jakxc, a software engineer and web developer.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${pokemonSolid.variable} ${pokemonClassic.variable} h-full antialiased`}
    >
      <body className="relative isolate flex min-h-full flex-col">
        <PokemonBackdrop />
        {children}
      </body>
    </html>
  );
}
