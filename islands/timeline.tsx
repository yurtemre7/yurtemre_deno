type TimelineEvent = {
    year: number;
    title: { en: string; ja: string };
    description: { en: string; ja: string };
  };
  
  
  const events: TimelineEvent[] = [
    {
        year: 2020,
        title: { en: "University", ja: "大学" },
        description: { en: "Began studying at Technische Universität Berlin Computer Science.", ja: "ベルリン工科大学でコンピュータサイエンスの勉強を始めました。" },
    },
    {
        year: 2021,
        title: { en: "Joined Appmelder", ja: "Appmelderに入社" },
        description: { en: "Started as a Junior Frontend Developer at Appmelder.", ja: "Appmelderでジュニアフロントエンド開発者として働き始めました。" },
    },
    {
        year: 2023,
        title: { en: "Joined DEIN ERSTER TAG", ja: "DEIN ERSTER TAGに入社" },
        description: { en: "Began work as a Junior Frontend Developer.", ja: "ジュニアフロントエンド開発者として働き始めました。" },
    },
    {
        year: 2024,
        title: { en: "Learning Japanese", ja: "日本語を学ぶ" },
        description: { en: "Began learning Japanese and had a trip to Japan.", ja: "日本語を学び始め、日本を旅行しました。" },
    },
    {
        year: 2024,
        title: { en: "Bachelor of Science", ja: "学士号" },
        description: { en: "Achieved a Bachelor's Degree in Computer Science.", ja: "コンピュータサイエンスの学士号を取得しました。" },
    },
];

type TimelineProps = {
    language: "en" | "ja";
};
  

export default function Timeline({ language }: TimelineProps) {
    return (
      <div className="relative w-full px-6 py-10">
        {/* Fixed Title */}
        <h2 className="text-center text-2xl font-semibold mb-6 sticky top-0 bg-white dark:bg-gray-900 z-10">
          {language === "en" ? "Timeline" : "タイムライン"}
        </h2>
  
        {/* Timeline Container */}
        <div className="relative w-full overflow-x-auto pb-6">
          {/* Horizontal Line */}
          <div className="relative flex items-center">
            <div className="absolute top-1/2 w-full h-1 bg-gray-300 dark:bg-gray-700"></div>
  
            {/* Events */}
            <div className="flex gap-20 min-w-[100%] px-10">
              {events.map((event, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center gap-3 opacity-85 hover:opacity-100"
                >
                  {/* Event Card */}
                  <div className="w-[200px] p-4 m-4 bg-white dark:bg-gray-900 rounded-lg shadow-md transition-transform duration-300 hover:border-2 hover:border-white dark:hover:border-gray-400">
                    <h3 className="text-blue-500 font-bold text-xl">{event.year}</h3>
                    <p className="font-medium">{event.title}</p>
                    <p className="text-gray-600 dark:text-gray-400 text-sm">{event.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }