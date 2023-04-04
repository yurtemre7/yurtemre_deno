export default function MyFooter() {
  return (
    <footer class="p-10">
      <div class="flex flex-wrap items-center justify-center">
        <p class="text-center">
          <a
            href="https://t.me/emredev"
            target="_blank"
            class="font-bold hover:underline"
          >
            Telegram
          </a>
        </p>

        <div class="m-4" />

        <p class="text-center">
          <a
            href="https://github.com/yurtemre7"
            target="_blank"
            class="font-bold hover:underline"
          >
            GitHub
          </a>
        </p>

        <div class="m-4" />

        <p class="text-center">
          <a
            href="impressum"
            class="font-bold hover:underline"
          >
            Impressum
          </a>
        </p>

        <div class="m-4" />

        <p class="text-center">
          <a
            href="datenschutz"
            class="font-bold hover:underline"
          >
            Datenschutz
          </a>
        </p>

        <div class="m-4" />

        <p class="text-center text-gray-800">
          © {new Date().getFullYear()} Emre Yurtseven
        </p>

        <div class="m-4" />

        <p class="text-center text-gray-800">
          made with{" "}
          <a
            class="font-bold hover:underline"
            href="https://fresh.deno.dev/"
            target="_blank"
          >
            fresh
          </a>{" "}
          @{" "}
          <a
            class="font-bold hover:underline"
            href="https://deno.land/"
            target="_blank"
          >
            Deno
          </a>
        </p>
        <div class="ml-4" />
        <img
          src="/logo.svg"
          height="22px"
          width="22px"
          alt="the fresh logo: a sliced lemon dripping with juice"
        />
      </div>
    </footer>
  );
}
