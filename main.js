let url = "https://github.com/explore";

const request = require("request");
const cheerio = require("cheerio");
const topics = require("./topics");

request(url, cb);

function cb(err, response, html) {
  if (err) {
    console.log("Error", err);
  } else {
    handleHtml(html);
  }
}

function handleHtml(html) {
  let SelectorTool = cheerio.load(html);

  let anchorEle = SelectorTool(
    'a[data-selected-links="topics_path /topics/ /topics"]'
  );

  let relativeLink = anchorEle.attr("href");

  let fullLink = "https://github.com/" + relativeLink;

  topics.AllTopicLink(fullLink);
}
