interface JokeProp {
  joke: string;
}

export default function Welcome({ joke }: JokeProp) {
  return (
    <div class="h-screen text-center flex items-center justify-center">
      <div class="">
        <p class="text-5xl font-bold hover:underline">
          Hey Du 😄
        </p>
        <div class="pt-10" />
        <p class="text-xl">
          Willkommen auf meiner Website, ich grüße Dich. 🖐️
        </p>
        <div class="pt-10" />
        <p class="text-xl">
          Der Witz des Tages:
        </p>
        <div class="pt-5" />
        <blockquote class="text-xl italic font-semibold">
          <p>
            "{joke}"
          </p>
        </blockquote>
      </div>
    </div>
  );
}
