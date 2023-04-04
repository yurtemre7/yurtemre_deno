import { Handlers, PageProps } from "$fresh/server.ts";
import { DOMParser } from "https://deno.land/x/deno_dom@v0.1.36-alpha/deno-dom-wasm.ts";
import MyFooter from "../components/MyFooter.tsx";

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
    <html class="bg-gradient-to-r from-indigo-600 to-blue-600 text-white">
      <div class="text-center items-center">

        <h2 class="text-2xl font-bold text-center mt-10">Elsword News</h2>
        <div class="grid grid-cols-1 gap-16 m-16">
          {props.data.news.map((newsItem) => {
            // return a cool card looking box where the title is big, the description is smaller and the date is even smaller.
            // add a link to the news item at the bottom right

            return (
              <div class="rounded-2xl p-4">
                <h2>{newsItem.title}</h2>
                <br></br>
                <p>{newsItem.description}</p>
                <p>{newsItem.pubDate}</p>
                <a class="font-bold hover:underline" href={newsItem.link}>
                  Link
                </a>
              </div>
            );
          })}
        </div>
      </div>
      <MyFooter/>
    </html>
  );
}
