export default function MyFooter() {
  return (
    <footer class="p-10">
      <div class="flex flex-wrap items-center justify-center">
        <p class="text-center">
          <a
            href="https://t.me/emredev"
            class="text-blue-500 hover:underline"
          >
            Telegram
          </a>
        </p>

        <div class="m-4" />

        <p class="text-center">
          <a
            href="https://github.com/yurtemre7"
            class="text-blue-500 hover:underline"
          >
            GitHub
          </a>
        </p>

        <div class="m-4" />

        <p class="text-center">
          <a
            href="impressum"
            class="text-blue-500 hover:underline"
          >
            Impressum
          </a>
        </p>

        <div class="m-4" />

        <p class="text-center text-gray-500">
          © {new Date().getFullYear()} Emre Yurtseven
        </p>

        <div class="m-4" />

        <p class="text-center text-gray-500">
          made with `fresh` @ Deno
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
