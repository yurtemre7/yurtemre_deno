import { Head } from "$fresh/runtime.ts";

export default function Error404() {
  return (
    <>
      <Head>
        <title>404 - Page not found</title>
      </Head>
      <div className="px-4 py-8 mx-auto bg-[#0A0F1E]">
        <div className="max-w-screen-md mx-auto flex flex-col items-center justify-center">
          <h1 className="text-4xl font-bold">
            404 - Ach, es gibt zu viele Witze mit diesem Errorcode...
          </h1>
          <p className="my-4">
            Diese Seite existiert (noch) nicht! 🤷‍♂️
          </p>
          <a href="/" className="hover:underline">Zur Homepage</a>
        </div>
      </div>
    </>
  );
}
