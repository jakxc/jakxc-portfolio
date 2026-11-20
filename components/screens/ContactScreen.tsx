"use client";

import Typewriter from "typewriter-effect";
import { profile } from "@/data/portfolio";

function PokeballIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" className={className} aria-hidden="true">
      <circle cx="12" cy="12" r="10" fill="none" stroke="currentColor" strokeWidth="2.5" />
      <path d="M2 12h6.5M15.5 12H22" stroke="currentColor" strokeWidth="2.5" />
      <circle cx="12" cy="12" r="3.5" fill="none" stroke="currentColor" strokeWidth="2.5" />
    </svg>
  );
}

type RowProps = {
  label: string;
  value: string;
  href?: string;
  external?: boolean;
};

function Row({ label, value, href, external }: RowProps) {
  const classes =
    "flex items-start justify-between gap-4 border-2 border-black px-3 py-2.5 font-dex text-xs text-black sm:text-sm";
  const content = (
    <>
      <span className="shrink-0 text-xxs">{label}</span>
      <span className="min-w-0 text-right text-xxs [overflow-wrap:anywhere]">
        {value}
      </span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
        className={`${classes} transition-colors hover:bg-black hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black`}
      >
        {content}
      </a>
    );
  }
  return <div className={classes}>{content}</div>;
}

export default function Contact() {
  return (
    <section className="flex flex-1 flex-col items-center justify-center">
      <div className="w-full max-w-2xl border-4 border-black p-1">
        <div className="relative overflow-hidden border-2 border-black p-4 sm:p-6">
          {/* Faint watermark circle */}
          <div
            className="pointer-events-none absolute -left-10 top-10 h-72 w-72 rounded-full border-[16px] border-black/5"
            aria-hidden="true"
          />

          <div className="relative">
            {/* Title */}
            <p className="flex items-center gap-2 font-dex font-bold uppercase tracking-wide text-black">
              <PokeballIcon className="h-6 w-6 shrink-0 sm:h-8 sm:w-8" />
              Trainer Card
              <PokeballIcon className="h-6 w-6 shrink-0 sm:h-8 sm:w-8" />
            </p>

            {/* Info rows, full width */}
            <div className="mt-4 flex flex-col gap-3">
              <Row label="Name" value={profile.name} />
              <Row label="Class" value={profile.role.toUpperCase()} />
              <Row
                label="Email"
                value={profile.email}
                href={`mailto:${profile.email}`}
              />
              <Row
                label="GitHub"
                value="View ▸"
                href={profile.socials.github}
                external
              />
              <Row
                label="LinkedIn"
                value="View ▸"
                href={profile.socials.linkedin}
                external
              />
              <Row label="Resume" value="Open ▸" href={profile.resumeUrl} />
            </div>

            {/* Bottom strip */}
            <div className="mt-4 border-y-2 border-black px-4 py-3 font-dex text-xs text-black sm:text-sm">
              <div className="flex items-center gap-2">
                <span aria-hidden="true">&gt;</span>
                <div className="inline-flex">
                  <Typewriter
                    onInit={(typewriter) => {
                      typewriter.typeString("AWAITING MESSAGE...").start();
                    }}
                  />
                </div>
              </div>
              <p className="mt-2 leading-relaxed text-black/90">
                Whether it&apos;s a project, a job opportunity, or just to say
                hi — my channel is always open.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}