interface InitialData {
    title: string;
    lat: string;
    long: string;
  }
  
  export default function DeeplinkButton({ title, lat, long }: InitialData) {
    function onDeeplinkOpen() {
      const url =
        `yrtmr://deeplink.yurtemre.de/add-pin?title=${title}&lat=${lat}&long=${long}`;
      globalThis.open(url, "_blank");
    }
    return (
      <button
        onClick={onDeeplinkOpen}
        class="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-black rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
      >
        Öffne den Standort in der App
      </button>
    );
  }