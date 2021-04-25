declare type readingStatus = "yet" | "reading" | "done";
declare interface Book {
  genreID: number;
  title: string;
  amazonLink: string;
  slug: string;
  status: readingStatus;
  dueYear: string;
}
