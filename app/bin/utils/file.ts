export const generateSettingsJson = (
  genreID: number,
  fileName: string,
  dirNameJP: string
): GenreSettings => {
  const data = {
    genreID: genreID,
    name: fileName ? fileName : "unset",
    "name-jp": dirNameJP ? dirNameJP : "未設定",
  };
  return data;
};

export const generateBooksJson = (
  genreID: number,
  bookTitle: string,
  bookSlug: string
): Book => {
  if (!bookSlug) throw Error("bookSlug is required");
  const data = {
    genreID: genreID,
    title: bookTitle ? bookTitle : "未設定",
    slug: bookSlug,
    amazonLink: "",
    dueYear: "",
    isDone: false,
  };
  return data;
};

export const generateGenreReadme = (genreNameJp: string): string => {
  if (!genreNameJp) return "";
  return `# ${genreNameJp}\r\r`;
};
