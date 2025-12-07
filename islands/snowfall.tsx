import { useEffect, useState } from "preact/hooks";

const SNOWFLAKE_COUNT = 12;

const getSeasonalEmoji = (): string => {
  const today = new Date();
  const month = today.getMonth();
  const day = today.getDate();

  const newYearEmojis = ["🎇", "🎆", "🥳"];
  const aprilFoolsEmojis = ["🤣", "😜", "🤪"];
  const birthdayEmojis = ["🎂", "🎉", "🎁"];
  const springEmojis = ["🌸", "🌷", "🌼"];
  const summerEmojis = ["☀️", "🌞", "🏖️"];
  const fallEmojis = ["🍂", "🍁", "🎃"];
  const winterEmojis = ["❄️", "⛄", "🎄"];

  const getRandomEmoji = (emojis: string[]) =>
    emojis[Math.floor(Math.random() * emojis.length)];

  if (month === 0 && day === 1) return getRandomEmoji(newYearEmojis);
  if (month === 3 && day === 1) return getRandomEmoji(aprilFoolsEmojis);
  if (month === 0 && day === 16) return getRandomEmoji(birthdayEmojis);
  if (month === 6 && day === 2) return getRandomEmoji(birthdayEmojis);

  if (month >= 2 && month <= 4) return getRandomEmoji(springEmojis);
  if (month >= 5 && month <= 7) return getRandomEmoji(summerEmojis);
  if (month >= 8 && month <= 10) return getRandomEmoji(fallEmojis);
  return getRandomEmoji(winterEmojis);
};

const generateRandomSnowflake = () => {
  const duration = 10 + Math.random() * 12; // seconds
  const scale = 0.35 + Math.random() * 0.85;
  return {
    left: Math.random() * 100 + "vw",
    duration,
    animationDuration: `${duration}s`,
    // a bit more transparent to make it less crowdy
    opacity: 0.15 + Math.random() * 0.35,
    scale,
    fontSize: `${8 + Math.random() * 28}px`,
    // negative delay so flakes are staggered across the animation timeline
    animationDelay: `-${Math.random() * duration}s`,
    // start slightly off-screen above
    topStart: `-${30 + Math.random() * 70}vh`,
  };
};

export default function Snowfall() {
  const emoji = getSeasonalEmoji();
  const [documentHeight, setDocumentHeight] = useState(0);

  useEffect(() => {
    const updateHeight = () => {
      setDocumentHeight(document.documentElement.scrollHeight);
    };

    updateHeight();

    const resizeObserver = new ResizeObserver(updateHeight);
    resizeObserver.observe(document.body);

    const mutationObserver = new MutationObserver(updateHeight);
    mutationObserver.observe(document.body, {
      subtree: true,
      childList: true,
      attributes: true,
    });

    globalThis.addEventListener("resize", updateHeight);

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      globalThis.removeEventListener("resize", updateHeight);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ height: `${documentHeight}px` }}
    >
      {Array.from({ length: SNOWFLAKE_COUNT }).map((_, index) => {
        const flake = generateRandomSnowflake();
        return (
          <div
            key={index}
            className="snowflake fixed text-white"
            style={{
              left: flake.left,
              top: flake.topStart,
              opacity: flake.opacity,
              fontSize: flake.fontSize,
              animation: `fall linear infinite`,
              animationDuration: flake.animationDuration,
              animationDelay: flake.animationDelay,
              // keep scale available to the keyframes via a CSS variable
              transform: `translateY(0) scale(${flake.scale})`,
              // @ts-ignore - set CSS variable inline
              ["--flake-scale"]: String(flake.scale),
            } as unknown as Record<string, string | number>}
          >
            {emoji}
          </div>
        );
      })}

      <style>
        {`
          @keyframes fall {
            0% {
              transform: rotate(0deg) scale(var(--flake-scale, 1));
            }
            100% {
              transform: translateY(${documentHeight + globalThis.innerHeight}px) rotate(360deg) scale(var(--flake-scale, 1));
            }
          }
        `}
      </style>
    </div>
  );
}
