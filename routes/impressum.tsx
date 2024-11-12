export default function Impressum() {
  return (
    <div
      className="min-h-screen w-full flex flex-col items-center bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100">
      <div
        className="max-w-2xl w-full p-6 md:p-12 rounded-lg shadow-md border border-gray-200 dark:border-gray-700 my-8">

        {/* Backlink to Home */}
        <div className="mb-4">
          <a href="/" className="text-blue-500 hover:underline text-sm">← Back to Home</a>
        </div>

        <h1 className="text-3xl font-semibold mb-4">Impressum</h1>
        <p className="text-gray-600 dark:text-gray-400 mb-6">
          Angaben gemäß § 5 TMG
        </p>
        <h2 className="text-xl font-semibold mb-2">Kontakt Information</h2>
        <section className="mb-8">
          <p><strong>Emre Yurtseven</strong></p>
          <p>Innsbrucker Straße 47a</p>
          <p>10825 Berlin</p>
          <p>Deutschland</p>
          <p>Email: <a href="mailto:yurtemre7@icloud.com" className="text-blue-500">yurtemre7@icloud.com</a></p>
          <p>Tel: +49 1779214352</p>
        </section>
      </div>
    </div>
  );
}