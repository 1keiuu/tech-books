export const createCheckBoxText = (obj: Book, genreName: string) => {
  let text = "";
  if (obj.status == "done") text = "- [x]";
  else text = "- [ ]";
  const noteLink = `https://github.com/1keiuu/tech-books/tree/main/notes/${genreName}/${obj.slug}`;
  return `${text} [${obj.title}](${noteLink}) / [amazon](${obj.amazonLink})`;
};

export const createSubTitle = (title: string) => {
  return `**${title}**`;
};

export const isReading = (notePath: string, status: readingStatus) => {
  const fs = require("fs");
  const res = fs.readFileSync(`${notePath}/README.md`);
  const lineLength = res.toString().split("\n").length;
  if (lineLength > 5 && status !== "done") return true;
  return false;
};

export const createReadingImg = () => {
  return "　<img src='https://user-images.githubusercontent.com/46051957/115986629-19e16980-a5ec-11eb-8abe-a477bb86c2d3.png' alt='reading...'/> ";
};
