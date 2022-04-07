const request = require("request");
const cheerio = require("cheerio");
const projects = require("./topicProjects");

function AllTopicLink(url) {
  request(url, cb);

  function cb(err, response, html) {
    if (err) {
      console.log("Error", err);
    } else {
      getAllTopicLinks(html);
    }
  }

  function getAllTopicLinks(html) {
    let SelectorTool = cheerio.load(html);

    let allTopicCards = SelectorTool(
      ".py-4.border-bottom.d-flex.flex-justify-between  a:nth-child(2)"
    );

    let allTopicsName = SelectorTool(
      ".py-4.border-bottom.d-flex.flex-justify-between  a:nth-child(2) > p:nth-child(1)"
    );

    for (let i = 0; i < 3; i++) {
      let topicsReletiveLink = SelectorTool(allTopicCards[i]).attr("href");

      let topicName = SelectorTool(allTopicsName[i]).text();

      let topicsFullLink = "https://github.com/" + topicsReletiveLink;
      // console.log(topicsFullLink);

      projects.Top8Projectlink(topicsFullLink, topicName);
    }
  }
}

module.exports = {
  AllTopicLink: AllTopicLink,
};
