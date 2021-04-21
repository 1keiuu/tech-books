exports.createCheckBoxText = (obj) => {
  let text = "";
  if (obj.isDone) text = "- [x]";
  else text = "- [ ]";
  return `${text} [${obj.title}](${obj.amazonLink})`;
};

exports.createSubTitle = (title) => {
  return `**${title}**`;
};
