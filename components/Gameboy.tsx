"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import PowerLed from "./PowerLed";
import { links } from "@/data/navigation";

const COLOR_LETTERS = [
  { char: "C", color: "var(--color-btn-a)" },
  { char: "O", color: "var(--color-orange)" },
  { char: "L", color: "var(--color-btn-b)" },
  { char: "O", color: "var(--color-btn-dpad)" },
  { char: "R", color: "var(--color-purple)" },
];

// How far the D-pad scrolls the screen per press
const SCROLL_STEP = 40;

type ActionButtonProps = {
  letter: "A" | "B";
  label: string;
  href: string;
  /** When set, renders a <button> instead of a link. */
  onPress?: () => void;
  className?: string;
};

function ActionButton({ letter, label, href, onPress, className = "" }: ActionButtonProps) {
  const classes = `group flex items-center justify-center rounded focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-(--color-gbc-ink) ${className}`;
  const content = (
    <span
      className={`gbc-btn ${letter === "A" ? "gbc-btn-a" : "gbc-btn-b"}`}
      aria-hidden="true"
    >
      <span className="gbc-btn-letter">{letter}</span>
    </span>
  );

  if (onPress) {
    return (
      <button type="button" onClick={onPress} aria-label={label} className={classes}>
        {content}
      </button>
    );
  }
  return (
    <Link href={href} aria-label={label} className={classes}>
      {content}
    </Link>
  );
}

export default function GameBoy({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [cursor, setCursor] = useState(0);
  const itemRefs = useRef<(HTMLAnchorElement | HTMLButtonElement | null)[]>([]);
  const selectRef = useRef<HTMLButtonElement>(null);
  const screenRef = useRef<HTMLDivElement>(null);

  // The page you're already on is left out of the menu. EXIT is always last.
  const items = links.filter((link) => link.href !== pathname);
  const itemCount = items.length + 1;
  const onHome = pathname === "/";

  const moveCursor = useCallback(
    (dir: 1 | -1) => {
      setCursor((c) => (c + dir + itemCount) % itemCount);
    },
    [itemCount],
  );

  const closeMenu = useCallback(() => {
    setOpen(false);
    selectRef.current?.focus();
  }, []);

  const toggleMenu = () => {
    if (open) {
      setOpen(false);
      return;
    }
    setCursor(0);
    setOpen(true);
  };

  // D-pad: moves the menu cursor, or scrolls the screen when no menu is open
  const pressDpad = (dir: 1 | -1) => {
    if (open) moveCursor(dir);
    else screenRef.current?.scrollBy({ top: dir * SCROLL_STEP });
  };

  // New page, new screen: start at the top
  useEffect(() => {
    screenRef.current?.scrollTo({ top: 0 });
  }, [pathname]);

  // Keep focus on the highlighted item so Enter works natively
  useEffect(() => {
    if (!open) return;
    itemRefs.current[cursor]?.focus({ preventScroll: true });
  }, [open, cursor]);

  // Arrow keys move the cursor, Esc is the B button
  useEffect(() => {
    if (!open) return;
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowDown") {
        e.preventDefault();
        moveCursor(1);
      } else if (e.key === "ArrowUp") {
        e.preventDefault();
        moveCursor(-1);
      } else if (e.key === "Escape") {
        e.preventDefault();
        closeMenu();
      }
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, moveCursor, closeMenu]);

  return (
    <section className="relative flex flex-1 flex-col px-4 py-16">
      <div className="mx-auto flex w-full max-w-lg flex-1 flex-col justify-center">
        <div className="gbc-shell p-2 sm:p-4">
          {/* Dark bezel + LCD */}
          <div className="gbc-bezel">
            <div className="mb-2">
              <PowerLed />
            </div>

            <div className="gbc-lcd relative p-2 sm:p-4">
              {/* The current page renders here. Fixed height, so every
                  screen is the same size and long ones scroll. */}
              <div
                ref={screenRef}
                className="gbc-scroll h-full overflow-y-auto pr-1 pb-5"
              >
                {children}
              </div>

              <p
                className={`font-dex absolute right-4 bottom-4 left-4 flex items-center gap-2 text-[10px] text-(--color-gbc-lcd-mid) sm:right-6 sm:bottom-6 sm:left-6 ${
                  open ? "invisible" : ""
                }`}
              >
                <span className="gbc-cursor animate-cursor" aria-hidden="true" />
                {onHome ? "PRESS SELECT FOR MENU" : "PRESS B TO GO BACK"}
              </p>

              {/* In-screen menu, styled like the Pokémon start menu */}
              {open && (
                <nav id="gbc-menu" aria-label="Main menu" className="gbc-menu">
                  <ul>
                    {items.map((link, i) => (
                      <li key={link.href}>
                        <Link
                          href={link.href}
                          ref={(el) => {
                            itemRefs.current[i] = el;
                          }}
                          onClick={() => setOpen(false)}
                          onMouseEnter={() => setCursor(i)}
                          onFocus={() => setCursor(i)}
                          className="gbc-menu-item"
                        >
                          <span
                            className={`gbc-cursor ${cursor === i ? "" : "invisible"}`}
                            aria-hidden="true"
                          />
                          {link.label}
                        </Link>
                      </li>
                    ))}
                    <li>
                      <button
                        type="button"
                        ref={(el) => {
                          itemRefs.current[items.length] = el;
                        }}
                        onMouseEnter={() => setCursor(items.length)}
                        onFocus={() => setCursor(items.length)}
                        onClick={closeMenu}
                        className="gbc-menu-item"
                      >
                        <span
                          className={`gbc-cursor ${
                            cursor === items.length ? "" : "invisible"
                          }`}
                          aria-hidden="true"
                        />
                        Exit
                      </button>
                    </li>
                  </ul>
                </nav>
              )}
            </div>

            <p
              className="mt-3 text-center font-body text-[10px] tracking-[0.15em] text-(--color-gbc-bezel-text) sm:text-xs"
              aria-hidden="true"
            >
              PORTFOLIO{" "}
              {COLOR_LETTERS.map(({ char, color }, i) => (
                <span key={`${char}-${i}`} style={{ color }}>
                  {char}
                </span>
              ))}
            </p>
          </div>

          {/* Badge */}
          <div
            className="mt-5 ml-1 w-fit rounded-full border-2 border-(--color-gbc-yellow-dark) px-5 py-0.5 font-display text-[10px] tracking-[0.2em] text-(--color-gbc-yellow-dark)"
            aria-hidden="true"
          >
            J.C.
          </div>

          {/* D-pad + A/B buttons */}
          <div className="mt-4 flex items-center justify-between px-2 sm:px-4">
            <div className="gbc-dpad">
              <span aria-hidden="true" />
              <button
                type="button"
                aria-label={open ? "Move cursor up" : "Scroll up"}
                onClick={() => pressDpad(-1)}
                className="gbc-dpad-key top-0 left-1/3 h-1/3 w-1/3"
              />
              <button
                type="button"
                aria-label={open ? "Move cursor down" : "Scroll down"}
                onClick={() => pressDpad(1)}
                className="gbc-dpad-key bottom-0 left-1/3 h-1/3 w-1/3"
              />
            </div>

            <div className="flex items-end gap-5">
              {open ? (
                <ActionButton letter="B" label="Close menu" href="/" onPress={closeMenu} />
              ) : onHome ? (
                <ActionButton letter="B" label="Say hello" href="/contact" />
              ) : (
                <ActionButton letter="B" label="Back to home screen" href="/" />
              )}

              {open ? (
                <ActionButton
                  letter="A"
                  label="OK"
                  href="/projects"
                  className="-translate-y-4"
                  onPress={() => itemRefs.current[cursor]?.click()}
                />
              ) : (
                <ActionButton
                  letter="A"
                  label="Open Pokédex"
                  href="/projects"
                  className="-translate-y-4"
                />
              )}
            </div>
          </div>

          {/* SELECT / START + speaker */}
          <div className="mt-6 grid grid-cols-3 items-end">
            <div />
            <div className="flex justify-center gap-5">
              <div className="flex flex-col items-center gap-3">
                <button
                  ref={selectRef}
                  type="button"
                  aria-label={open ? "Close menu" : "Open menu"}
                  aria-expanded={open}
                  aria-controls="gbc-menu"
                  onClick={toggleMenu}
                  className="gbc-pill gbc-pill-btn"
                />
                <span
                  className="font-body text-[8px] tracking-widest text-(--color-gbc-yellow-dark)"
                  aria-hidden="true"
                >
                  SELECT
                </span>
              </div>
              <div className="flex flex-col items-center gap-3" aria-hidden="true">
                <span className="gbc-pill" />
                <span className="font-body text-[8px] tracking-widest text-(--color-gbc-yellow-dark)">
                  START
                </span>
              </div>
            </div>
            <div className="gbc-speaker justify-self-end" aria-hidden="true" />
          </div>
        </div>
      </div>
    </section>
  );
}