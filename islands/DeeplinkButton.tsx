interface InitialData {
  title: string;
  lat: string;
  long: string;
}

export default function DeeplinkButton({ title, lat, long }: InitialData) {
  function onDeeplinkOpen() {
    const url =
      `yrtmr://deeplink.yurtemre.de/add-pin?title=${title}&lat=${lat}&long=${long}`;
    window.open(url, "_blank");
  }
  return (
    <button
      onClick={onDeeplinkOpen}
      class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800"
    >
      Öffne den Standort in der App
    </button>
  );
}
