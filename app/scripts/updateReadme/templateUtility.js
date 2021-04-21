exports.createCheckBoxText = (obj, genre) => {
  let text = "";
  if (obj.isDone) text = "- [x]";
  else text = "- [ ]";
  const noteLink = `/notes/${genre}/${obj.title}`;
  return `${text} [${obj.title}](${obj.amazonLink})\r[note](${noteLink})`;
};

exports.createSubTitle = (title) => {
  return `**${title}**`;
};
