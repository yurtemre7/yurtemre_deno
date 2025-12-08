import { useSignal } from "@preact/signals";

const parenURL = "/iparen";

export default function ParenFlutter() {
  const maxWidth = useSignal(350);

  function toggleWidth() {
    if (maxWidth.value == 700) {
      maxWidth.value = 350;
    } else {
      maxWidth.value = 700;
    }
  }

  return (
    <div className="flex flex-col items-center w-full md:w-1/2 mx-auto my-10">
      <h2 className="text-4xl font-bold text-white mb-8 text-center">
        Check it out here
      </h2>

      <div className="flex justify-center w-full px-4 mb-6">
        <iframe
          className="rounded-2xl w-full"
          src={parenURL}
          height={700}
          width={maxWidth.value}
          style={{ maxWidth: `${maxWidth.value}px` }}
        />
      </div>

      <button
        type="button"
        onClick={toggleWidth}
        className="cta-button"
      >
        Switch View
      </button>
    </div>
  );
}
