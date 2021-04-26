declare type readingStatus = "yet" | "reading" | "done";
declare interface Book {
  genreID: number;
  title: string;
  slug: string;
  status: readingStatus;
  dueYear: string;
}
