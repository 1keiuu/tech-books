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
  return "　<img src='https://user-images.githubusercontent.com/46051957/115986488-64aeb180-a5eb-11eb-912f-4844ddc9467f.png' alt='reading...'/> ";
};
