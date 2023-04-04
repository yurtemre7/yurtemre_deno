import { Handlers, PageProps } from "$fresh/server.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";

interface ElswordData {
  news: News[];
}

interface News {
  title: string;
  description: string;
  link: string;
  pubDate: string;
}

export const handler: Handlers<ElswordData> = {
  async GET(_, ctx) {
    const resp = await fetch("https://de.elsword.gameforge.com/news/archive");

    const html = await resp.text();

    // get #news
    const news = new DOMParser().parseFromString(html, "text/html");

    if (!news) {
      return ctx.render();
    }

    const newsList = news.getElementById("news");
    if (!newsList) {
      return ctx.render();
    }

    const newsItems = newsList.getElementsByClassName("news");
    if (!newsItems) {
      return ctx.render();
    }
    // console.log("newsItems", newsItems);
    // console.log("newsItems.length", newsItems.length);
    const newsArray: News[] = [];
    for (let i = 0; i < newsItems.length; i++) {
      const newsItem = newsItems[i];
      // console.log("newsItem", newsItem);
      // for the title, it is a <a> tag with the title as text and href is the link
      const title = newsItem.getElementsByTagName("a")[0].textContent;
      const link = newsItem.getElementsByTagName("a")[0].getAttribute("href");
      // the description is in a <details> tag and the text is in a <p> tag
      const description = newsItem
        .getElementsByTagName("details")[0]
        .getElementsByTagName("p")[0].textContent;
      // the date in also in the <details> tag and inside a <span> of class "news_data" and inside a <time> tag
      const pubDate = newsItem
        .getElementsByTagName("details")[0]
        .getElementsByTagName("span")[0]
        .getElementsByTagName("time")[0].textContent;

      newsArray.push({
        title: title,
        description: description,
        link: link ? link : "",
        pubDate: pubDate,
      });
    }

    const elsData: ElswordData = {
      news: newsArray,
    };

    // console.log("elsData", elsData);

    return ctx.render(elsData);
  },
};

export default function Home(props: PageProps<ElswordData>) {
  // console.log(props.data);
  return (
    <div class="dark:bg-black h-full w-full text-center p-10 items-center">
      <div class="mx-auto text-center flex-row flex items-center justify-center">
        <a href="/" class="text-blue-500 flex-auto">
          <svg
            class="w-6 h-6"
            fill="none"
            width="36"
            height="36"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
        </a>
        <div class="dark:bg-black dark:text-white text-black">
          <h1 class="text-4xl font-bold text-center">yurtemre.de</h1>
          <h2 class="text-2xl font-bold text-center">Elsword News</h2>
        </div>
        <div class="dark:text-black text-white flex-auto">
          <svg
            class="w-6 h-6"
            fill="none"
            width="36"
            height="36"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            ></path>
          </svg>
        </div>
      </div>
      <div class="p-5 dark:text-white mx-auto items-center justify-center flex-col flex dark:bg-black">
        {props.data.news.map((newsItem) => {
          // return a cool card looking box where the title is big, the description is smaller and the date is even smaller.
          // add a link to the news item at the bottom right

          return (
            <div class="rounded-2xl border-4 hover:border-blue-500 dark:hover:border-white dark:border-gray-500 p-4 m-16 p-5">
              <h2>{newsItem.title}</h2>
              <p>{newsItem.description}</p>
              <p>{newsItem.pubDate}</p>
              <a class="text-blue-500" href={newsItem.link}>Link</a>
            </div>
          );
        })}
      </div>
    </div>
  );
}
