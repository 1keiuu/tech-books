exports.createCheckBoxText = (obj, genre) => {
  let text = "";
  if (obj.isDone) text = "- [x]";
  else text = "- [ ]";
  const noteLink = `https://github.com/1keiuu/tech-books/tree/main/notes/${genre}/${obj.slug}`;
  return `${text} [${obj.title}](${obj.amazonLink}) / [memo](${noteLink})`;
};

exports.createSubTitle = (title) => {
  return `**${title}**`;
};
