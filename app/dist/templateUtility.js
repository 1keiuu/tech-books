"use strict";
exports.createCheckBoxText = function (obj, genreName) {
    var text = "";
    if (obj.isDone)
        text = "- [x]";
    else
        text = "- [ ]";
    var noteLink = "https://github.com/1keiuu/tech-books/tree/main/notes/" + genreName + "/" + obj.slug;
    return text + " [" + obj.title + "](" + obj.amazonLink + ") / [memo](" + noteLink + ")";
};
exports.createSubTitle = function (title) {
    return "**" + title + "**";
};
