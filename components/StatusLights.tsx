const lights = [
  { top: "12%", left: "8%", color: "var(--color-cyan)", delay: "0s" },
  { top: "70%", left: "90%", color: "var(--color-yellow)", delay: "0.5s" },
  { top: "82%", left: "14%", color: "var(--color-green-led)", delay: "1s" },
  { top: "25%", left: "85%", color: "var(--color-dex-red)", delay: "1.5s" },
];

export default function StatusLights() {
  return (
    <div
      className="pointer-events-none absolute inset-0 overflow-hidden"
      aria-hidden="true"
    >
      {lights.map((l, i) => (
        <span
          key={i}
          className="dex-led absolute h-3 w-3 animate-blip"
          style={{
            top: l.top,
            left: l.left,
            backgroundColor: l.color,
            color: l.color,
            animationDelay: l.delay,
          }}
        />
      ))}
    </div>
  );
}
