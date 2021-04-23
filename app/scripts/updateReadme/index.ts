#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const { createCheckBoxText, createSubTitle } = require("./templateUtility");

const templatePath = path.resolve(__dirname, "./template.md");
const buffer = fs.readFileSync(templatePath);
const templateStr = buffer.toString();

const baseBookDirPath = path.resolve(__dirname, "../../../data/books/");
const baseNotesDirPath = path.resolve(__dirname, "../../../notes/");
const rootDirPath = path.resolve(__dirname, "../../../");

const genres = fs.readdirSync(baseBookDirPath);

// FIXME:かなり適当に書いてるのでリファクタ

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
    if (genre == "README.md") continue;
    const bookJsonDirPath = `${baseBookDirPath}/${genre}/books.json`;
    const settingJsonDirPath = `${baseBookDirPath}/${genre}/settings.json`;
    const settings = JSON.parse(fs.readFileSync(settingJsonDirPath));
    const books = JSON.parse(fs.readFileSync(bookJsonDirPath));
    const dueYearBooks = books.filter((book: Book) => {
      return book.dueYear == targetYear;
    });
    if (dueYearBooks.length == 0) continue;
    // targetBooks.push(dueYearBooks);
    booksText += `${createSubTitle(settings["name-jp"])}\r\r`;
    // targetBooks.forEach((books) => {
    dueYearBooks.forEach((book: Book) => {
      booksText += `${createCheckBoxText(book, genre)}\r\r`;
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
    return book.isDone == true;
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
