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

export const generateBooksJson = (
  bookTitle: string,
  bookSlug: string
): Book => {
  if (!bookSlug) throw Error("bookSlug is required");
  const data = {
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
