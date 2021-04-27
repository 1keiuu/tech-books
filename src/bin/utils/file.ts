export const generateSettingsJson = (
  genreID: number,
  fileName?: string,
  dirNameJP?: string
): GenreSettings => {
  const data = {
    id: genreID,
    slug: fileName ? fileName : "unset",
    name: dirNameJP ? dirNameJP : "未設定",
  };
  return data;
};

export const generateBooksJson = (
  genreID: number,
  bookTitle: string,
  bookSlug: string,
  dueYear?: string,
  status?: readingStatus
): Book => {
  if (!bookSlug) throw Error("bookSlug is required");
  const data = {
    genreID: genreID,
    title: bookTitle ? bookTitle : "未設定",
    slug: bookSlug,
    dueYear: dueYear ? dueYear : "2021",
    status: status ? status : "yet",
  };
  return data;
};

export const generateGenreReadme = (genreNameJp: string): string => {
  if (!genreNameJp) return "";
  return `# ${genreNameJp}\r\r`;
};
