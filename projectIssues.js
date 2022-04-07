const request = require("request");
const cheerio = require("cheerio");
const fs = require("fs");
const path = require("path");
const PDFDocument = require('pdfkit');
// const { jsPDF } = require("jspdf");

function TopIssusesOfProject(url1, topic, ProjectName) {
  request(url1, cb);

  function cb(err, response, data) {
    if (err) {
      console.log("Error", err);
    } else {
      getAllProjectIssuses(data);
    }
  }

  function getAllProjectIssuses(html) {
    let SelectorTool = cheerio.load(html);

    let allIssuesLinks = SelectorTool(
      ".Link--primary.v-align-middle.no-underline.h4.js-navigation-open.markdown-title"
    );

    // console.log(allIssuesLinks.length);

    console.log(topic);
    console.log(ProjectName);

    let issuesObject = {};

    for (let i = 0; i < allIssuesLinks.length; i++) {
      let allIssusesRelativeLink = SelectorTool(allIssuesLinks[i]).attr("href");
      // let allIssusesName = $(allIssuesLinks[i]).text();
      // console.log(allIssusesName);

      let allIssuesFullLink = "https://github.com/" + allIssusesRelativeLink;

      // let allIssuesFullLinkInText = SelectorTool(allIssuesFullLink).text();

      issuesObject[`Issuse ${i}`] = `${allIssuesFullLink}`;

      // console.log(i + " " + allIssuesFullLink);
    }

    console.log("---------------------------------------------");

  let folderPath = path.join(__dirname,topic);

    if(!fs.existsSync(folderPath)){
      fs.mkdirSync(folderPath);
    }

  let filePath = path.join(folderPath,ProjectName + ".pdf");

  let text = JSON.stringify(issuesObject);
   
  let pdfDoc = new PDFDocument();

  pdfDoc.pipe(fs.createWriteStream(filePath));
  pdfDoc.text(text);
  pdfDoc.end();

  }
  
}

module.exports = {
  TopIssusesOfProject: TopIssusesOfProject,
};
