const request = require("request");
const cheerio = require("cheerio");
const issuses = require("./projectIssues");

function Top8Projectlink(url, topic) {
  request(url, cb);

  function cb(err, response, data) {
    if (err) {
      console.log("Error", err);
    } else {
      getTop8ProjectLink(data);
    }
  }

  function getTop8ProjectLink(html) {
    let SelectorTool = cheerio.load(html);

    let projectLinks = SelectorTool(
      ".f3.color-fg-muted.text-normal.lh-condensed"
    );
    // console.log(projectLinks.length);

    // console.log(topic);

    for (let i = 0; i < 8; i++) {
      let twoAnchor = SelectorTool(projectLinks[i]).find("a");

      let relativeProjectLink = SelectorTool(twoAnchor[1]).attr("href");

      // let fullProjectLink = "https://github.com/" + relativeProjectLink;
      let fullProjectLinkofIssues =
        "https://github.com/" + relativeProjectLink + "/issues";

      let ProjectName = relativeProjectLink.split("/").pop();

      // console.log(fullProjectLink);

      issuses.TopIssusesOfProject(fullProjectLinkofIssues,topic,ProjectName);
    }
  }
}

module.exports = {
  Top8Projectlink: Top8Projectlink,
};
