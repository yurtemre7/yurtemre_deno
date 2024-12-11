import { useEffect } from 'preact/hooks';

// Configuration
const SNOWFLAKE_COUNT = 25; // Adjust for more or fewer snowflakes

// Determine the appropriate emoji based on the date
const getSeasonalEmoji = (): string => {
  const today = new Date();
  const month = today.getMonth(); // 0 = January, 11 = December
  const day = today.getDate();

  // Special dates
  if (month === 0 && day === 1) return '🎇'; // New Year's Day
  if (month === 3 && day === 1) return '🤣'; // April Fools' Day
  if (month === 0 && day === 16) return '🎂'; // Your birthday (January 16)
  if (month === 6 && day === 2) return '🎂'; // Little brother's birthday (July 2)

  // Seasonal emojis
  if (month >= 2 && month <= 4) return '🌸'; // Spring
  if (month >= 5 && month <= 7) return '☀️'; // Summer
  if (month >= 8 && month <= 10) return '🍂'; // Fall
  return '❄️'; // Winter
};

// Snowflake style
const generateRandomSnowflake = () => ({
  left: Math.random() * 100 + 'vw', // Random horizontal position
  animationDuration: 5 + Math.random() * 5 + 's', // Random falling speed
  opacity: 0.5 + Math.random() * 0.5, // Random opacity for variation
  transform: `scale(${0.3 + Math.random() * 0.7})`, // Random scale
});

export default function Snowfall() {
  const emoji = getSeasonalEmoji();

  // Generate snowflakes on initial render
  useEffect(() => {
    // Ensures the animation restarts if component remounts
    return () => globalThis.cancelAnimationFrame(0);
  }, []);

  return (
    <div aria-hidden="true" className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Render snowflakes */}
      {Array.from({ length: SNOWFLAKE_COUNT }).map((_, index) => (
        <div
          key={index}
          className="snowflake absolute top-0 text-white"
          style={{
            position: 'absolute',
            left: generateRandomSnowflake().left,
            opacity: generateRandomSnowflake().opacity,
            fontSize: `${10 + Math.random() * 15}px`, // Random size between 10px and 25px
            animation: `fall linear infinite`,
            animationDuration: generateRandomSnowflake().animationDuration,
            transform: generateRandomSnowflake().transform,
          }}
        >
          {emoji}
        </div>
      ))}

      {/* Animation styling for falling snowflakes */}
      <style>
        {`
          @keyframes fall {
            0% {
              transform: translateY(-100vh) rotate(0deg);
            }
            100% {
              transform: translateY(100vh) rotate(360deg);
            }
          }
        `}
      </style>
    </div>
  );
}
