export const generateSettingsJson = (fileName: string, dirNameJP: string) => {
  const data = {
    name: fileName,
    "name-jp": dirNameJP,
  };
  return JSON.stringify(data, null, 2);
};

export const generateBooksJson = (bookTitle: string) => {
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

export const generateGenreReadme = (genreNameJp: string) => {
  if (!genreNameJp) return "";
  return `# ${genreNameJp}\r\r`;
};
