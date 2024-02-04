import { PageProps } from "$fresh/server.ts";
import MyFooter from "../components/my_footer.tsx";
import SyncButton from "../islands/SyncButton.tsx";

export default function Deeplink(props: PageProps) {
  const params = props.url.searchParams;
  const pId = params.get("id");
  const pView = params.get("view");
  const pName = params.get("name");

  if (!pId || !pView || !pName) {
    return <div>Ohne ID, VIEW oder Name geht es nicht.</div>;
  }

  return (
    <html className="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
      <div className="text-center p-10 items-center">
        <head>
          <title>yurtemre.de | Sync</title>
        </head>

        <h2 className="text-2xl font-bold text-center">Deeplink</h2>
        <div className="p-5 h-screen mx-auto items-center justify-center flex-col flex">
          <p className="text-xl font-bold">
            Ein Online Standort mit dem Titel {pName} wird mit dir geteilt:
          </p>

          <div className="m-5"></div>

          <SyncButton id={pId} view={pView} name={pName} />
        </div>
      </div>
      <MyFooter />
    </html>
  );
}