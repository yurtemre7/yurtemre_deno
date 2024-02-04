interface InitialData {
    id: string;
    view: string;
    name: string;
  }

export default function SyncButton({ id, view, name }: InitialData) {
    function onDeeplinkOpen() {
      const url =
        `yrtmr://deeplink.yurtemre.de/add-location?id=${id}&view=${view}&name=${name}`;
      globalThis.open(url, "_blank");
    }
    return (
      <button
        onClick={onDeeplinkOpen}
        className="inline-flex items-center py-2.5 px-4 text-xs font-medium text-center text-white bg-black rounded-lg focus:ring-4 focus:ring-blue-200 hover:bg-blue-800"
      >
        Öffne den Online Standort in der App
      </button>
    );
  }