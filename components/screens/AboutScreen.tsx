import Image from "next/image";
import { profile } from "@/data/portfolio";

export default function AboutScreen() {
  return (
    <div className="min-w-0 flex-1">
      <h1 className="font-dex text-xs text-(--color-gbc-lcd-mid) sm:text-sm">
        &gt; ABOUT ME
      </h1>
      <p className="font-dex mt-3 text-xxs leading-relaxed whitespace-pre-line text-(--color-gbc-lcd-ink)/90 sm:text-sm">
        {profile.about}
      </p>
    </div>
  );
}