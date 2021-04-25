export const createCheckBoxText = (obj: Book, genreName: string) => {
  let text = "";
  if (obj.isDone) text = "- [x]";
  else text = "- [ ]";
  const noteLink = `https://github.com/1keiuu/tech-books/tree/main/notes/${genreName}/${obj.slug}`;
  return `${text} [${obj.title}](${noteLink}) / [amazon](${obj.amazonLink})`;
};

export const createSubTitle = (title: string) => {
  return `**${title}**`;
};

export const isReading = (notePath: string, isDone: boolean) => {
  const fs = require("fs");
  const res = fs.readFileSync(`${notePath}/README.md`);
  const lineLength = res.toString().split("\n").length;
  if (lineLength > 5 && !isDone) return true;
  return false;
};

export const createReadingImg = () => {
  return "<img src='https://user-images.githubusercontent.com/46051957/115982968-91f26400-a5d9-11eb-9d19-9bb5ebce27d8.jpg' alt='reading...'/> ";
};
