import { Repositories, Repository } from "../components/classes/Github.ts";

interface RepositoryProps {
  repos: Repositories;
}

export default function MeineProjekte({ repos }: RepositoryProps) {
  // shuffle the repos
  repos = repos.sort(() => 0.5 - Math.random());

  function onHover(repo: Repository, i: number) {
    console.log("enter");
    console.log(repo.url);
    console.log(i);

    // insert an i frame with the repo url next to the repo
    let iframe = document.createElement("iframe");
    iframe.src = repo.url;
    iframe.style.width = "100%";
    iframe.style.height = "100%";
    iframe.style.position = "absolute";
    iframe.style.top = "0";
    iframe.style.left = "0";
    iframe.style.zIndex = "100";
    iframe.style.border = "none";
    iframe.style.borderRadius = "10px";
    iframe.style.boxShadow = "0 0 10px 0 rgba(0,0,0,0.5)";
    iframe.style.transition = "all 0.5s ease-in-out";
    iframe.style.opacity = "0";
    iframe.style.pointerEvents = "none";
    iframe.style.transform = "scale(0.5)";
    iframe.style.transformOrigin = "top left";
    iframe.style.backgroundColor = "white";
    iframe.style.overflow = "hidden";
    iframe.style.padding = "0";
    iframe.style.margin = "0";
    iframe.style.display = "block";
  }

  function onLeave() {
    console.log("leave");
  }

  return (
    <div class="dark:bg-black m-10">
      <div class="h-full text-center flex items-center justify-center">
        <div class="dark:text-gray-500">
          <p class="text-5xl font-bold hover:underline">
            Meine Projekte 💻
          </p>
          {repos.length == 0
            ? <p class="p-12">Github Time Out Fehler xD</p>
            : ""}
          <div class="p-12 flex flex-wrap items-center justify-around gap-4">
            {repos.length != 0
              ? repos.map((repo, index) => (
                <div>
                  <div
                    class="group border rounded-2xl border-4 hover:border-blue-500 dark:hover:border-white dark:border-gray-500 p-4"
                    onMouseEnter={() => {
                      onHover(repo, index);
                    }}
                    onMouseLeave={onLeave}
                  >
                    <a
                      href={repo.html_url}
                      target="_blank"
                      class="text-xl group-hover:underline dark:group-hover:text-white group-hover:text-blue-500"
                    >
                      {repo.name}
                    </a>
                    <p class="text-sm dark:group-hover:text-white group-hover:text-blue-500">
                      {repo.description}
                    </p>
                  </div>
                  <iframe
                    class="group-hover:opacity-100 opacity-0"
                    id={`${index}`}
                    width={200}
                    height={300}
                    src={repo.url}
                  >
                  </iframe>
                </div>
              ))
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
