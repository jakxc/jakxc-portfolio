"use client";

import { useEffect, useState } from "react";

export default function Footer() {
  const [currentYear, setCurrentYear] = useState(0);

  useEffect(() => {
    setCurrentYear(new Date().getFullYear());
  }, []);

  return (
    <footer className="px-6 py-6 text-center text-xs">
      <p className="font-display text-sm">
        © Copyright {currentYear} - jakxc
      </p>
    </footer>
  );
}