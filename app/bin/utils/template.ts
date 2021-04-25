export const createCheckBoxText = (book: Book, genreName: string) => {
  let checkboxText = "";
  if (book.status == "done") checkboxText = "- [x]";
  else checkboxText = "- [ ]";
  const noteLink = `https://github.com/1keiuu/tech-books/tree/main/notes/${genreName}/${book.slug}`;
  if (book.status !== "yet")
    return `${checkboxText} [${book.title}](${noteLink})`;
  else return `${checkboxText} ${book.title}`;
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
  return "　<img src='https://user-images.githubusercontent.com/46051957/115986717-907e6700-a5ec-11eb-827f-38c9e3b8c1ff.png' alt='reading...'/> ";
};
