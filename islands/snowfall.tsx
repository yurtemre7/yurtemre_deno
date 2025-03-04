import { useEffect, useState } from 'preact/hooks';

const SNOWFLAKE_COUNT = 20;

const getSeasonalEmoji = (): string => {
  const today = new Date();
  const month = today.getMonth();
  const day = today.getDate();

  const newYearEmojis = ['🎇', '🎆', '🥳'];
  const aprilFoolsEmojis = ['🤣', '😜', '🤪'];
  const birthdayEmojis = ['🎂', '🎉', '🎁'];
  const springEmojis = ['🌸', '🌷', '🌼'];
  const summerEmojis = ['☀️', '🌞', '🏖️'];
  const fallEmojis = ['🍂', '🍁', '🎃'];
  const winterEmojis = ['❄️', '⛄', '🎄'];

  const getRandomEmoji = (emojis: string[]) => emojis[Math.floor(Math.random() * emojis.length)];

  if (month === 0 && day === 1) return getRandomEmoji(newYearEmojis);
  if (month === 3 && day === 1) return getRandomEmoji(aprilFoolsEmojis);
  if (month === 0 && day === 16) return getRandomEmoji(birthdayEmojis);
  if (month === 6 && day === 2) return getRandomEmoji(birthdayEmojis);

  if (month >= 2 && month <= 4) return getRandomEmoji(springEmojis);
  if (month >= 5 && month <= 7) return getRandomEmoji(summerEmojis);
  if (month >= 8 && month <= 10) return getRandomEmoji(fallEmojis);
  return getRandomEmoji(winterEmojis);
};

const generateRandomSnowflake = () => ({
  left: Math.random() * 100 + 'vw',
  animationDuration: 12.5 + Math.random() * 5 + 's',
  opacity: 0.25 + Math.random() * 0.5,
  transform: `scale(${0.3 + Math.random() * 0.7})`,
});

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
    mutationObserver.observe(document.body, { subtree: true, childList: true, attributes: true });

    globalThis.addEventListener('resize', updateHeight);

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      globalThis.removeEventListener('resize', updateHeight);
    };
  }, []);

  return (
    <div
      aria-hidden="true"
      className="fixed inset-0 overflow-hidden pointer-events-none"
      style={{ height: `${documentHeight}px` }}
    >
      {Array.from({ length: SNOWFLAKE_COUNT }).map((_, index) => (
        <div
          key={index}
          className="snowflake fixed text-white"
          style={{
            left: generateRandomSnowflake().left,
            top:`-${50 + (Math.random() * 50)}vh`, // Start off-screen
            opacity: generateRandomSnowflake().opacity,
            fontSize: `${10 + Math.random() * 35}px`,
            animation: `fall linear infinite`,
            animationDuration: generateRandomSnowflake().animationDuration,
            transform: generateRandomSnowflake().transform,
          }}
        >
          {emoji}
        </div>
      ))}

      <style>
        {`
          @keyframes fall {
            0% {
              transform: rotate(0deg);
            }
            100% {
              transform: translateY(${documentHeight + globalThis.innerHeight}px) rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}