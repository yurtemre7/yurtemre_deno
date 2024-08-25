import { useSignal } from "@preact/signals";

const parenURL = "https://yurtemre7.github.io/paren/";

export default function ParenFlutter() {
    const maxWidth = useSignal(300);

    function toggleWidth() {
        if (maxWidth.value == 600) {
            maxWidth.value = 300;
        } else {
            maxWidth.value = 600;
        }
    }

    return (
        <div className="text-center items-center w-1/2 my-10">
            <h2 className="text-4xl font-bold text-white mb-8">Check it out here</h2>
            <div className="flex justify-center m-6">
                <iframe className="rounded-2xl" src={parenURL} height="600" width={`${maxWidth} sm:300`} />
            </div>
            <button onClick={toggleWidth} className="sm:inline hidden text-white mx-4 p-2 rounded bg-orange-800 hover:bg-orange-900 transition-colors duration-300">
                Switch View
            </button>
        </div>
    );

}