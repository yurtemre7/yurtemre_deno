export default function Impressum() {
  return (
    <div class="h-screen w-screen bg-gradient-to-r from-indigo-600 to-blue-600 text-white grid place-content-center">
      <head>
        <title>yurtemre.de | Impressum</title>
      </head>

      <div class="m-4">
        <div class="mx-auto items-center text-center justify-center flex-col flex">
          <p class="text-xl font-bold">
            Angaben gemäß § 5 TMG
          </p>
          <p>
            Emre Yurtseven
          </p>
          <p>
            Gradestraße 30, <br /> 12347 Berlin, Deutschland
          </p>
          <div class="m-4" />
          <p class="text-xl font-bold">
            Kontakt
          </p>
          <p>
            Telefon: +49 177 921 43 52
          </p>
          <p>
            E-Mail:
            <a
              href="mailto:emreyurtseven18@gmail.com"
              class="font-bold hover:underline"
            >
              {" emreyurtseven18@gmail.com"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
