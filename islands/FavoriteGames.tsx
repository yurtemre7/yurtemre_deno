import { useState } from "preact/hooks";

export default function FavoriteGames() {
  const [bgColor, setBgColor] = useState('');

  return (
    <div class={`h-screen text-center flex flex-col items-center justify-center transition-colors duration-500 ease-in-out ${bgColor}`}>
      <h1 class="text-5xl font-bold hover:underline mb-10">Meine Lieblingsspiele</h1>
      <div class="flex space-x-10">
        <p class="text-xl hover:underline" onMouseEnter={() => setBgColor('bg-yellow-500 bg-opacity-80')} onMouseLeave={() => setBgColor('')}>Pokémon</p>
        <p class="text-xl hover:underline" onMouseEnter={() => setBgColor('bg-blue-700 bg-opacity-80')} onMouseLeave={() => setBgColor('')}>League of Legends</p>
        <p class="text-xl hover:underline" onMouseEnter={() => setBgColor('bg-red-600 bg-opacity-80')} onMouseLeave={() => setBgColor('')}>Elsword</p>
      </div>
    </div>
  );
}