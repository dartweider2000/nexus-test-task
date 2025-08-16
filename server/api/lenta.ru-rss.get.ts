import pkg from "rss-to-json";
// Необходимый костыль, т.к у библиотеки проблема с типизацией
const { parse } = pkg as unknown as { parse: typeof pkg };

export default defineEventHandler(async () => {
  const rss = await parse("https://lenta.ru/rss");
  return rss;
});
