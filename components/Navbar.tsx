"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { links } from "@/data/navigation";

export default function Navbar() {
  const pathname = usePathname();
  if (pathname === "/") return null;

  return (
    <header className="sticky top-0 left-0 z-50 flex h-screen w-56 shrink-0 flex-col border-r-4 border-(--color-dex-red-dark) bg-(--color-dex-red) shadow-lg">
      <nav className="flex flex-1 flex-col overflow-y-auto py-4">
        <ul className="flex flex-col items-stretch gap-1 px-3">
          {links.map((link) => {
            const isActive = pathname === link.href;
            return (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className={`font-dex flex items-center justify-start rounded px-3 py-2 font-semibold transition-colors hover:bg-(--color-dex-red-dark) hover:text-(--color-yellow) ${
                    isActive
                      ? "bg-(--color-dex-red-dark) text-(--color-yellow)"
                      : "text-(--color-cream)/90"
                  }`}
                >
                  {link.label}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
    </header>
  );
}
