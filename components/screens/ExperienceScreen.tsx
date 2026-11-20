import StatusLights from "../StatusLights";
import { experience } from "@/data/portfolio";

export default function Experience() {
  return (
    <section className="relative flex flex-1 flex-col justify-center overflow-hidden bg-(--color-dex-red) px-6 py-20">
      <StatusLights />

      <div className="relative mx-auto w-full max-w-4xl">
        <div className="mb-12 flex flex-col items-center gap-3 text-center">
          <h1 className="font-display text-3xl font-bold text-(--color-cream) sm:text-4xl">
            Evolution Line
          </h1>
          <p className="max-w-xl text-sm text-(--color-cream)/80 sm:text-base">
            My journey so far — each role a new evolution.
          </p>
        </div>

        <ol className="relative flex flex-col gap-10 border-l-4 border-(--color-yellow)/70 pl-8">
          {experience.map((item, i) => (
            <li key={item.id} className="relative">
              <span
                className="dex-led absolute -left-[2.7rem] top-1 flex h-7 w-7 items-center justify-center bg-(--color-cyan) font-dex text-xs text-(--color-dex-red-dark)"
                aria-hidden="true"
              >
                {i + 1}
              </span>
              <div className="dex-card p-6">
                <div className="mb-2 flex flex-wrap items-baseline justify-between gap-2">
                  <h2 className="font-display text-xl font-bold text-(--color-ink)">
                    {item.role} · {item.company}
                  </h2>
                  <span className="font-dex text-sm text-(--color-dex-red-deep)">
                    {item.period}
                  </span>
                </div>
                <div className="dex-screen mb-3 p-4">
                  <p className="text-sm text-(--color-screen-light) sm:text-base">
                    {item.description}
                  </p>
                </div>
                <ul className="list-inside list-disc space-y-1 text-sm text-(--color-ink)/80">
                  {item.highlights.map((h) => (
                    <li key={h}>{h}</li>
                  ))}
                </ul>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
