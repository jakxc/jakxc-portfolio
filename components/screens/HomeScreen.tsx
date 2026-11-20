"use client";

import Image from "next/image";
import Typewriter from "typewriter-effect";
import { profile } from "@/data/portfolio";

export default function HomeScreen() {
  return (
    <div className="flex items-start gap-4">
      <div className="relative min-h-64 w-1/3 shrink-0 self-stretch">
        <Image
          src="/assets/images/jakxc-avatar.png"
          alt="Jack Chen"
          fill
          sizes="8rem"
          className="object-contain object-top"
          priority
        />
      </div>

      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 font-dex text-xs text-(--color-gbc-lcd-mid) sm:text-sm">
          <span aria-hidden="true">&gt;</span>
          <div className="inline-flex">
           <Typewriter
              onInit={(typewriter) => {
                typewriter.typeString('Hello World...')
                  .start();
              }}
            />
          </div>
        </div>
        <h1 className="mt-3 font-dex text-xl font-bold text-(--color-gbc-lcd-ink) sm:text-2xl">
          {profile.name}
        </h1>
        <p className="font-dex mt-3 text-xs text-(--color-gbc-lcd-ink) sm:text-sm">
          {profile.role.toUpperCase()}
        </p>
        <p className="font-dex mt-4 text-xxs leading-relaxed whitespace-pre-line text-(--color-gbc-lcd-ink)/90 sm:text-sm">
          {profile.tagline}
        </p>
      </div>
    </div>
  );
}