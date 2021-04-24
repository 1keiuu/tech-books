export const generateSettingsJson = (
  fileName: string,
  dirNameJP: string
): GenreSettings => {
  const data = {
    name: fileName ? fileName : "unset",
    "name-jp": dirNameJP ? dirNameJP : "未設定",
  };
  return data;
};

export const generateBooksJson = (bookTitle: string): Book => {
  const data = {
    title: bookTitle ? bookTitle : "未設定",
    slug: "unset",
    amazonLink: "",
    noteLink: "",
    dueYear: "",
    isDone: false,
  };
  return data;
};

export const generateGenreReadme = (genreNameJp: string): string => {
  if (!genreNameJp) return "";
  return `# ${genreNameJp}\r\r`;
};
