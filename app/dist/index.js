#!/usr/bin/env node
"use strict";
var fs = require("fs");
var path = require("path");
var _a = require("./templateUtility"), createCheckBoxText = _a.createCheckBoxText, createSubTitle = _a.createSubTitle;
var templatePath = path.resolve(__dirname, "./template.md");
var buffer = fs.readFileSync(templatePath);
var templateStr = buffer.toString();
var baseBookDirPath = path.resolve(__dirname, "../../../data/books/");
var baseNotesDirPath = path.resolve(__dirname, "../../../notes/");
var rootDirPath = path.resolve(__dirname, "../../../");
var genres = fs.readdirSync(baseBookDirPath);
// FIXME:かなり適当に書いてるのでリファクタ
var textData = templateStr;
var booksGroupByYears = [
    { year: "2021", body: [] },
    { year: "2022", body: [] },
    //   { year: "2023", body: [] },
];
var years = ["2021", "2022", "2023"];
var _loop_1 = function (i1) {
    var targetYear = years[i1];
    // by genre
    var allBooks = [];
    var booksTextArray = [];
    var _loop_2 = function (i2) {
        var genre = genres[i2];
        var booksText = "";
        if (genre == "README.md")
            return "continue";
        var bookJsonDirPath = baseBookDirPath + "/" + genre + "/books.json";
        var settingJsonDirPath = baseBookDirPath + "/" + genre + "/settings.json";
        var settings = JSON.parse(fs.readFileSync(settingJsonDirPath));
        var books = JSON.parse(fs.readFileSync(bookJsonDirPath));
        var dueYearBooks = books.filter(function (book) {
            return book.dueYear == targetYear;
        });
        if (dueYearBooks.length == 0)
            return "continue";
        // targetBooks.push(dueYearBooks);
        booksText += createSubTitle(settings["name-jp"]) + "\r\r";
        // targetBooks.forEach((books) => {
        dueYearBooks.forEach(function (book) {
            booksText += createCheckBoxText(book, genre) + "\r\r";
            if (!allBooks.includes(book))
                allBooks.push(book);
        });
        // });
        booksTextArray.push(booksText);
    };
    for (var i2 = 0; i2 < genres.length; i2++) {
        _loop_2(i2);
    }
    // NOTE: 今年期限の本(全ジャンル)
    var allGenreBooksGroupByYear = allBooks.filter(function (book) {
        return book.dueYear == targetYear;
    });
    // NOTE: 今年読んだ本(全ジャンル)
    var dueYearDoneBooks = allGenreBooksGroupByYear.filter(function (book) {
        return book.isDone == true;
    });
    var achievementRate = Math.floor((dueYearDoneBooks.length / allGenreBooksGroupByYear.length) * 100);
    if (allGenreBooksGroupByYear.length == 0)
        return "continue";
    textData += "## " + targetYear + "\r";
    textData += "**\u9054\u6210\u7387: " + achievementRate + "%**\r\r";
    textData += booksTextArray.join("");
};
// by year
for (var i1 = 0; i1 < years.length; i1++) {
    _loop_1(i1);
}
fs.writeFileSync(rootDirPath + "/README.md", textData);
