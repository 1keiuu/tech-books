#!/usr/bin/env node

import { listAllGenreSettings } from "./utils/genre";

const main = () => {
  updateReadme();
};
const updateReadme = () => {
  const fs = require("fs");
  const path = require("path");

  const {
    createCheckBoxText,
    createSubTitle,
    createStatusImg,
  } = require("./utils/template");

  const templatePath = path.resolve(
    __dirname,
    "../../bin/assets/genre/ReadmeTemplate.md"
  );
  const buffer = fs.readFileSync(templatePath);
  const templateStr = buffer.toString();

  const baseBookDirPath = path.resolve(__dirname, "../../../data/genres");
  const rootDirPath = path.resolve(__dirname, "../../../");

  const genres = listAllGenreSettings();
  //   FIXME:かなり適当に書いてるのでリファクタ

  let textData = templateStr;
  const booksGroupByYears = [
    { year: "2021", body: [] },
    { year: "2022", body: [] },
    //   { year: "2023", body: [] },
  ];

  const years = ["2021", "2022", "2023"];

  // by year
  for (let i1 = 0; i1 < years.length; i1++) {
    const targetYear = years[i1];

    // by genre
    const allBooks: Book[] = [];
    const booksTextArray = [];
    for (let i2 = 0; i2 < genres.length; i2++) {
      const genre = genres[i2];
      let booksText = "";
      const bookJsonDirPath = `${baseBookDirPath}/${genre.slug}/books.json`;
      const settingJsonDirPath = `${baseBookDirPath}/${genre.slug}/settings.json`;
      const settings = JSON.parse(fs.readFileSync(settingJsonDirPath));
      const books = JSON.parse(fs.readFileSync(bookJsonDirPath));
      const dueYearBooks = books.filter((book: Book) => {
        return book.dueYear == targetYear;
      });
      if (dueYearBooks.length == 0) continue;
      // targetBooks.push(dueYearBooks);
      booksText += `${createSubTitle(settings["name"])}\r\r`;
      // targetBooks.forEach((books) => {
      dueYearBooks.forEach((book: Book) => {
        booksText += `${createCheckBoxText(book, genre.slug)} `;
        booksText += `${createStatusImg(book.status)}`;
        booksText += `\r\r`;
        if (!allBooks.includes(book)) allBooks.push(book);
      });
      // });
      booksTextArray.push(booksText);
    }
    // NOTE: 今年期限の本(全ジャンル)
    const allGenreBooksGroupByYear = allBooks.filter((book) => {
      return book.dueYear == targetYear;
    });
    // NOTE: 今年読んだ本(全ジャンル)
    const dueYearDoneBooks = allGenreBooksGroupByYear.filter((book) => {
      return book.status == "done";
    });
    const achievementRate = Math.floor(
      (dueYearDoneBooks.length / allGenreBooksGroupByYear.length) * 100
    );
    if (allGenreBooksGroupByYear.length == 0) continue;
    textData += `## ${targetYear}\r`;
    textData += `**達成率: ${achievementRate}%**\r\r`;
    textData += booksTextArray.join("");
  }

  fs.writeFileSync(`${rootDirPath}/README.md`, textData);
};

main();
