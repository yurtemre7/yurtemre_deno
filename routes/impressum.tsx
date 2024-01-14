export default function Impressum() {
  return (
    <div class="h-screen w-screen bg-blue-600 text-white grid place-content-center">
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
            Telefon: +49 1779214352
          </p>
          <p>
            E-Mail:
            <a
              href="mailto:yurtemre7@icloud.com"
              class="font-bold hover:underline"
            >
              {" yurtemre7@icloud.com"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
