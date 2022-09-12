interface JokeProp {
  joke: string;
}

export default function Welcome({ joke }: JokeProp) {
  return (
    <div class="dark:bg-black m-10">
      <div class="h-screen text-center flex items-center justify-center">
        <div class="dark:text-gray-500">
          <p class="text-5xl font-bold hover:underline">
            Hey Du 😄
          </p>
          <div class="m-10" />
          <p class="text-xl">
            Willkommen auf meiner Website, ich grüße Dich. 🖐️
          </p>
          <div class="m-10" />
          <p class="text-xl">
            Der Witz des Tages:
          </p>
          <div class="m-5" />
          <p class="text-xl">
            {joke}
          </p>
        </div>
      </div>
    </div>
  );
}
