export default function About() {
  const diff = new Date().getTime() - new Date("2020-10-01").getTime();
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24));
  const semester = Math.ceil(days / (365 / 2));

  return (
    <div class="h-screen text-center flex items-center justify-center">
      <div>
        <p class="text-5xl font-bold hover:underline">
          Wer ist'n das? 🤷‍♂️
        </p>
        <div class="m-10" />
        <p class="text-xl">
          Emre ist ein Informatik Student im {semester}. Semester an der{"  "}
          <a
            class="hover:underline font-bold"
            href="https://www.tu.berlin/"
          >
            TU Berlin
          </a>{" "}
          und arbeitet bei{" "}
          <a
            class="hover:underline font-bold"
            href="https://www.deinerstertag.de/"
          >
            Dein erster Tag
          </a>{" "}
          als Junior Frontend Entwickler, spezifischer in der Cross-Platform
          App-Entwicklung mit{"  "}
          <a
            class="hover:underline font-bold"
            href="https://flutter.dev"
          >
            Flutter
          </a>.
        </p>
      </div>
    </div>
  );
}
