const axios = require('axios');
const cheerio = require('cheerio');
var fs = require('fs');

let getTestCaseFromProblemHtml = (dir, html) => {
  fs.copyFileSync(`./template.cpp`, `${dir}/sol.cpp`);
  data = [];
  const $ = cheerio.load(html);

  $('div.output').each((i, elem) => {
    str = $(elem).text().substring('Output'.length);
    data[i] = {
      ...data[i],
      correct_answers: [str.substring(0, str.length - 1)],
    };
  });
  $('div.input').each((i, elem) => {
    data[i] = {
      ...data[i],
      test: $(elem).text().substring('Input'.length),
    };
  });
  fs.writeFile(`${dir}/sol.cpp:tests`, JSON.stringify(data), function (err) {
    if (err) {
      console.log(err);
    }
    console.log(
      `Problem ${dir.substring(dir.lastIndexOf('/') + 1)} was saved!`
    );
  });
};

function getTestCaseFromProblemUrl(url) {
  var dir = `./Problemset/${url.substring(url.lastIndexOf('/') + 1)}`;

  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }

  axios
    .get(url)
    .then((response) => {
      getTestCaseFromProblemHtml(dir, response.data);
    })
    .catch((err) => console.log(err));
}

let getTotalProblemsFromContestHtml = (html) => {
  data = [];
  const $ = cheerio.load(html);
  $('tr td.id a').each((i, elem) => {
    problem_url = 'https://codeforces.com/' + $(elem).attr('href');
    getTestCaseFromProblemUrl(problem_url);
  });
};

axios.get(process.env.CF_CONTEST).then((response) => {
  getTotalProblemsFromContestHtml(response.data);
});
