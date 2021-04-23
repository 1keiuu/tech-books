export const createCheckBoxText = (obj: Book, genreName: string) => {
  let text = "";
  if (obj.isDone) text = "- [x]";
  else text = "- [ ]";
  const noteLink = `https://github.com/1keiuu/tech-books/tree/main/notes/${genreName}/${obj.slug}`;
  return `${text} [${obj.title}](${obj.amazonLink}) / [memo](${noteLink})`;
};

export const createSubTitle = (title: string) => {
  return `**${title}**`;
};
