import { define } from "../utils.ts";

export default define.page(function Impressum() {
  return (
    <div className="min-h-screen w-full flex flex-col items-center bg-[#0A0F1E] text-[#E2E8F0]">
      <div className="max-w-2xl w-full p-6 md:p-12 rounded-lg shadow-md my-8">
        {/* Backlink to Home */}
        <div className="mb-4">
          <a href="/" className="hover:underline">
            ← Back to Home
          </a>
        </div>

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
  );
});
