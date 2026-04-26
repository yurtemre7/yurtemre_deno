import { define } from "@/utils.ts";

interface Evt {
  title: string;
  days: number[];
  desc: string;
  icon: string;
  hex: string;
  dim: string;
  border: string;
  glow: string;
}

interface DayInfo {
  date: Date;
  name: string;
  short: string;
  num: number;
  month: string;
  evt: Evt | null;
  isToday: boolean;
}

const EVENTS: Evt[] = [
  {
    title: "RM - 100%",
    days: [1, 7, 13, 19, 25, 31],
    desc: "100% chance of random missions!",
    icon: "🎲",
    hex: "#c084fc",
    dim: "rgba(192,132,252,0.08)",
    border: "rgba(192,132,252,0.2)",
    glow: "rgba(192,132,252,0.3)",
  },
  {
    title: "Heroic x2",
    days: [2, 8, 14, 20, 26],
    desc: "Double Heroic dungeon drops + 2 extra daily rewards!",
    icon: "⚔️",
    hex: "#fbbf24",
    dim: "rgba(251,191,36,0.08)",
    border: "rgba(251,191,36,0.2)",
    glow: "rgba(251,191,36,0.3)",
  },
  {
    title: "Fishing Day",
    days: [3, 9, 15, 21, 27],
    desc: "Unlimited fishing stamina and rod super durability!",
    icon: "🎣",
    hex: "#22d3ee",
    dim: "rgba(34,211,238,0.08)",
    border: "rgba(34,211,238,0.2)",
    glow: "rgba(34,211,238,0.3)",
  },
  {
    title: "Rosso x2",
    days: [4, 10, 16, 22, 28],
    desc: "Doubled drop rate for Rosso Raid!",
    icon: "🔥",
    hex: "#f87171",
    dim: "rgba(248,113,113,0.08)",
    border: "rgba(248,113,113,0.2)",
    glow: "rgba(248,113,113,0.3)",
  },
  {
    title: "Berthe x2",
    days: [5, 11, 17, 23, 29],
    desc: "Doubled drop rate for Berthe Raid!",
    icon: "❄️",
    hex: "#60a5fa",
    dim: "rgba(96,165,250,0.08)",
    border: "rgba(96,165,250,0.2)",
    glow: "rgba(96,165,250,0.3)",
  },
  {
    title: "Prof 50%",
    days: [6, 12, 18, 24, 30],
    desc: "50% Profession EXP boost!",
    icon: "⚒️",
    hex: "#34d399",
    dim: "rgba(52,211,153,0.08)",
    border: "rgba(52,211,153,0.2)",
    glow: "rgba(52,211,153,0.3)",
  },
];

function getEvt(d: number): Evt | null {
  for (const e of EVENTS) if (e.days.includes(d)) return e;
  return null;
}

function buildWeek(): DayInfo[] {
  const now = new Date();
  const out: DayInfo[] = [];
  for (let i = 0; i < 7; i++) {
    const d = new Date(now);
    d.setDate(now.getDate() + i);
    out.push({
      date: d,
      name: d.toLocaleDateString("en-US", { weekday: "long" }),
      short: d.toLocaleDateString("en-US", { weekday: "short" }),
      num: d.getDate(),
      month: d.toLocaleDateString("en-US", { month: "long" }),
      evt: getEvt(d.getDate()),
      isToday: i === 0,
    });
  }
  return out;
}

export default define.page(() => {
  const week = buildWeek();
  const today = week[0];
  const te = today.evt;

  return (
    <div class="w-full flex flex-col">
      {/* ─── MAIN ─── */}
      <main class="flex-1 min-h-0 m-10 grid grid-cols-1">
        {/* LEFT */}
        <section class="flex flex-col gap-4 min-h-0">
          {/* TODAY */}
          <div
            class="min-h-0 relative rounded-2xl flex flex-col items-center justify-center text-center p-6"
            style={`
              border: 1px solid ${te ? te.border : "#1a1a28"};
              ${
              te
                ? `box-shadow: inset 0 1px 0 0 ${te.border}, 0 0 80px -30px ${te.glow};`
                : ""
            }
            `}
          >
            {te && (
              <div
                class="absolute pointer-events-none"
                style={`
                  top: 50%; left: 50%; transform: translate(-50%, -50%);
                  width: 400px; height: 400px; border-radius: 50%;
                  filter: blur(100px); opacity: 0.06;
                  background: ${te.hex};
                `}
              />
            )}

            <div class="relative">
              {te && (
                <span
                  class="inline-flex items-center gap-1.5 p-1 rounded-full font-black uppercase tracking-widest"
                  style={`background: ${te.dim}; border: 1px solid ${te.border}; color: ${te.hex};`}
                >
                  <span
                    class="w-1.5 h-1.5 rounded-full animate-pulse"
                    style={`background: ${te.hex};`}
                  />
                  Active Now
                </span>
              )}

              <div
                class="text-5xl m-10"
                style="filter: drop-shadow(0 8px 16px rgba(0,0,0,0.6));"
              >
                {te?.icon ?? "📅"}
              </div>

              <h2
                class="text-3xl font-black mb-2"
                style={`color: ${
                  te?.hex ?? "#6b7280"
                }; letter-spacing: -0.03em;`}
              >
                {te?.title ?? "No Event"}
              </h2>

              <p class="text-sm max-w-sm mx-auto leading-relaxed">
                {te?.desc ?? "No mini event scheduled for today."}
              </p>

              <p class="m-4 text-gray-700 font-mono">
                {today.name} · {today.month} {today.num}
              </p>
            </div>
          </div>

          {/* UPCOMING */}
          <div class="flex-1 min-h-0 flex flex-col gap-2">
            <div class="font-bold uppercase tracking-widest">Next Up</div>
            <div class="flex flex-col gap-2">
              {week.slice(1, 7).map((c, i) => {
                const e = c.evt;
                if (!e) return null;
                return (
                  <div
                    key={c.num}
                    class="rounded-xl flex items-center gap-3 px-4 py-2.5"
                    style={`background: ${e.dim}; border: 1px solid ${e.border};`}
                  >
                    <span class="text-lg">{e.icon}</span>
                    <div class="flex-1 min-w-0">
                      <div class="flex items-baseline gap-2">
                        <span class="font-bold" style={`color: ${e.hex};`}>
                          {e.title}
                        </span>
                        <span class="">{c.name} {c.num}. {c.month}</span>
                      </div>
                      <p class="truncate">{e.desc}</p>
                    </div>
                    {i === 0 && (
                      <span class="font-bold uppercase tracking-wider bg-black/30 px-1.5 py-0.5 rounded">
                        Next
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
            <span className="flex">
              Data from:{" "}
              <a href="https://www.elsrift.to/events">
                https://www.elsrift.to/events
              </a>
            </span>
          </div>
        </section>
      </main>
    </div>
  );
});
