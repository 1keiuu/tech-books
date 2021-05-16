export const createCheckBoxText = (book: Book, genreName: string): string => {
  let checkboxText = "";
  if (book.status == "done") checkboxText = "- [x]";
  else checkboxText = "- [ ]";
  const noteLink = `https://github.com/1keiuu/tech-books/tree/main/notes/${genreName}/${book.slug}`;
  if (book.status !== "yet")
    return `${checkboxText} [${book.title}](${noteLink})`;
  else return `${checkboxText} ${book.title}`;
};

export const createSubTitle = (title: string): string => {
  return `**${title}**`;
};

export const createStatusImg = (status: string): string => {
  if (status == "reading")
    return "　<img src='https://user-images.githubusercontent.com/46051957/115986717-907e6700-a5ec-11eb-827f-38c9e3b8c1ff.png' alt='reading...'/> ";
  if (status == "done")
    return "　<img src='https://user-images.githubusercontent.com/46051957/115987365-b78a6800-a5ef-11eb-8ba7-82fb20225bb4.png' alt='done!'/>";
  return "";
};
