#!/usr/bin/env node

const fs = require("fs");
const path = require("path");

const { createCheckBoxText, createSubTitle } = require("./templateUtility");

const templatePath = path.resolve(__dirname, "./template.md");
const buffer = fs.readFileSync(templatePath);
const templateStr = buffer.toString();
// console.log(templateStr);

const baseBookDirPath = path.resolve(__dirname, "../../../data/books/");
const baseNotesDirPath = path.resolve(__dirname, "../../../notes/");
const rootDirPath = path.resolve(__dirname, "../../../");

const genres = fs.readdirSync(baseBookDirPath);

// FIXME:かなり適当に書いてるのでリファクタ

let textData = "";
const booksGroupByYears = [
  { year: "2021", body: [] },
  { year: "2022", body: [] },
  //   { year: "2023", body: [] },
];

// by year
for (let i1 = 0; i1 < booksGroupByYears.length; i1++) {
  const booksGroupByYear = booksGroupByYears[i1];
  const targetYear = booksGroupByYear.year;
  const targetBooks = booksGroupByYear.body;

  // by genre
  const allBooks = [];
  let booksText = "";
  for (let i2 = 0; i2 < genres.length; i2++) {
    const genre = genres[i2];
    if (genre == "README.md") continue;
    const bookJsonDirPath = `${baseBookDirPath}/${genre}/books.json`;
    const settingJsonDirPath = `${baseBookDirPath}/${genre}/settings.json`;
    const settings = JSON.parse(fs.readFileSync(settingJsonDirPath));
    const books = JSON.parse(fs.readFileSync(bookJsonDirPath));
    const dueYearBooks = books.filter((book) => {
      return book.dueYear == targetYear;
    });
    if (dueYearBooks.length == 0) continue;
    targetBooks.push(dueYearBooks);
    booksText += `${createSubTitle(settings["name-jp"])}\r\r`;
    targetBooks.forEach((books) => {
      books.forEach((book) => {
        booksText += `${createCheckBoxText(book, genre)}\r\r`;
        if (!allBooks.includes(book)) allBooks.push(book);
      });
    });
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
    dueYearDoneBooks.length / allGenreBooksGroupByYear.length
  );
  if (allGenreBooksGroupByYear.length == 0) continue;
  textData += `## ${targetYear}\r`;
  textData += `**達成率: ${achievementRate}%**\r\r`;
  textData += booksText;
}

fs.writeFileSync(`${rootDirPath}/README.md`, textData);
