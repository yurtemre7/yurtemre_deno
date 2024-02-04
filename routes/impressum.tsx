export default function Impressum() {
  return (
    <div className="h-screen w-screen bg-blue-600 text-white grid place-content-center">
      <head>
        <title>yurtemre.de | Impressum</title>
      </head>

      <div className="m-4">
        <div className="mx-auto items-center text-center justify-center flex-col flex">
          <p className="text-xl font-bold">
            Angaben gemäß § 5 TMG
          </p>
          <p>
            Emre Yurtseven
          </p>
          <p>
            Innsbrucker Straße 47A, <br /> 10825 Berlin, Deutschland
          </p>
          <div className="m-4" />
          <p className="text-xl font-bold">
            Kontakt
          </p>
          <p>
            Telefon: +49 1779214352
          </p>
          <p>
            E-Mail:
            <a
              href="mailto:info@yurtemre.de"
              className="font-bold hover:underline"
            >
              {" info@yurtemre.de"}
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}
