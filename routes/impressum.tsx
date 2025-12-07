import { define } from "../utils.ts";

export default define.page(function Impressum() {
  return (
    <div>
      <nav className="p-4">
        <div className="container mx-auto flex justify-between items-center">
          <a
            href="/"
            className="text-white text-lg font-bold hover:underline"
          >
            ← yurtemre.de
          </a>
          <h2 className="font-bold text-center">Impressum</h2>
        </div>
      </nav>
      <div className="min-h-screen w-full flex flex-col items-center">
        <div className="max-w-2xl w-full p-6 md:p-12 rounded-lg my-8">
          <h1 className="text-3xl font-semibold mb-4">Impressum</h1>
          <p className="mb-6">
            Angaben gemäß § 5 TMG
          </p>
          <h2 className="text-xl font-semibold mb-2">Kontakt Information</h2>
          <section className="mb-8">
            <p>
              <strong>Emre Yurtseven</strong>
            </p>
            <p>Innsbrucker Straße 47a</p>
            <p>10825 Berlin</p>
            <p>Deutschland</p>
            <p>
              Email:{" "}
              <a href="mailto:yurtemre7@icloud.com">
                yurtemre7@icloud.com
              </a>
            </p>
            <p>Tel: +49 1779214352</p>
          </section>
        </div>
      </div>
    </div>
  );
});
