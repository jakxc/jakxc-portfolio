export default function PowerLed() {
  return (
    <div className="flex items-center gap-2" aria-hidden="true">
      <span className="gbc-led h-2 w-2 bg-(--color-btn-a) text-(--color-btn-a)" />
      <span className="font-body text-[8px] tracking-[0.2em] text-(--color-gbc-bezel-text)">
        POWER
      </span>
    </div>
  );
}