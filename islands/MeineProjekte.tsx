import { Repositories, Repository } from "../components/classes/Github.ts";

interface RepositoryProps {
  repos: Repositories;
}

export default function MeineProjekte({ repos }: RepositoryProps) {
  // shuffle the repos
  repos = repos.sort(() => 0.5 - Math.random());

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
                  <div class="group border rounded-2xl border-4 hover:border-blue-500 dark:hover:border-white dark:border-gray-500 p-4">
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
                    <iframe
                      class="group-hover:opacity-100 opacity-0 group-hover:h-1/4 w-auto"
                      src={repo.contents_url}
                    >
                    </iframe>
                  </div>
                </div>
              ))
              : ""}
          </div>
        </div>
      </div>
    </div>
  );
}
