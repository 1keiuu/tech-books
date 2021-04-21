exports.createCheckBoxText = (obj, genre) => {
  let text = "";
  if (obj.isDone) text = "- [x]";
  else text = "- [ ]";
  const noteLink = `tech-books/tree/main/notes/${genre}/${obj.title}`;
  return `${text} [${obj.title}](${obj.amazonLink})\r\r[memo](${noteLink})`;
};

exports.createSubTitle = (title) => {
  return `**${title}**`;
};
