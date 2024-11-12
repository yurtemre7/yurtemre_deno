import { useEffect } from 'preact/hooks';

// Configuration
const SNOWFLAKE_COUNT = 25; // Adjust for more or fewer snowflakes

// Snowflake style
const generateRandomSnowflake = () => ({
  left: Math.random() * 100 + 'vw', // Random horizontal position
  animationDuration: 5 + Math.random() * 5 + 's', // Random falling speed
  opacity: 0.5 + Math.random() * 0.5, // Random opacity for variation
  transform: `scale(${0.3 + Math.random() * 0.7})`, // Random scale
});

export default function Snowfall() {
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
          ❄️
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