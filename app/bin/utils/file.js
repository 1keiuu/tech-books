exports.generateSettingsJson = (fileName, dirNameJP) => {
  const data = {
    name: fileName,
    "name-jp": dirNameJP,
  };
  return JSON.stringify(data, null, 2);
};

exports.generateBooksJson = (bookTitle) => {
  if (!bookTitle) return JSON.stringify({}, null, 2);
  const data = {
    title: bookTitle,
    slug: "",
    amazonLink: "",
    noteLink: "",
    dueYear: "",
    isDone: false,
  };
  return JSON.stringify(data, null, 2);
};
