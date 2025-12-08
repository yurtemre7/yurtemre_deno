import { define } from "../utils.ts";

export default define.page(function SteelMouse() {
  return (
    <div>
      <head>
        <title>SteelMouse | yurtemre.de</title>
      </head>
      <nav className="p-4">
        <div className="flex justify-between items-center">
          <a
            href="/"
            className="text-lg font-bold hover:underline"
          >
            ← yurtemre.de
          </a>
          <h2 className="font-bold text-center">SteelMouse</h2>
        </div>
      </nav>
      <div className="min-h-screen flex flex-col items-center justify-center p-6">
        <div className="w-full max-w-3xl flex items-center gap-4 mb-6">
          <img
            src="/logo.ico"
            alt="SteelMouse"
            className="w-12 h-12 rounded-md"
          />
          <div>
            <span className="text-2xl font-bold">SteelMouse</span>
            <p className="text-sm">
              Minimal tray app for SteelSeries mice — battery & charging status
            </p>
          </div>
        </div>

        <main className="w-full max-w-3xl">
          <section className="mb-4">
            <h2 className="text-lg font-semibold mb-2">About</h2>
            <p>
              This is a minimal app to show your mouse battery status in the
              system tray. It supports SteelSeries mice and is designed to be
              simple and unobtrusive.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Features</h2>
            <ul className="list-disc list-inside pl-4">
              <li>Shows battery percentage and charging status</li>
              <li>Customizable update interval</li>
              <li>Lightweight and easy to use</li>
            </ul>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Images</h2>
            <div className="image-gallery">
              <img
                src="/steelmouse.png"
                alt="System Tray Icon"
                className="rounded-md"
              />
            </div>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold mb-2">
              Download &amp; Install
            </h2>
            <a
              href="https://github.com/yurtemre7/mouse-battery/releases/latest"
              className="cta-button"
              target="_blank"
            >
              Download Latest Setup
            </a>
            <ol className="mt-3 list-decimal list-inside">
              <li>
                Go to{" "}
                <a
                  href="https://github.com/yurtemre7/mouse-battery/releases/latest"
                  target="_blank"
                  className="hover:underline"
                >
                  the latest release page
                </a>.
              </li>
              <li>
                Download the <b>Setup</b> file for your system.
              </li>
              <li>Run the installer. That's it!</li>
            </ol>
            <p className="mt-2 text-sm">
              <b>Note:</b> This application currently only supports{" "}
              <b>Windows</b>.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold mb-2">Contribute</h2>
            <p>
              Contributions are welcome! If you have ideas, bug fixes, or
              improvements, please open an issue or submit a pull request on
              {" "}
              <a
                href="https://github.com/yurtemre7/mouse-battery/"
                target="_blank"
                className="hover:underline"
              >
                GitHub
              </a>.
            </p>
          </section>

          <section className="mb-4">
            <h2 className="text-lg font-semibold mb-2">License</h2>
            <p>
              MIT License. See{" "}
              <a
                href="https://github.com/yurtemre7/mouse-battery/blob/main/LICENSE"
                target="_blank"
                className="hover:underline"
              >
                LICENSE
              </a>{" "}
              for details.
            </p>
          </section>
        </main>
      </div>
    </div>
  );
});
