const axios = require('axios');
const cheerio = require('cheerio');
var fs = require('fs');

let contest = process.env.CF_CONTEST.substring(
  process.env.CF_CONTEST.lastIndexOf('/') + 1
);
console.log('######################################');
console.log(`\nContest: Codeforces-${contest}`);
console.log('\nPlease wait for Codeforces Server Response...');

if (!fs.existsSync('./Problemset')) {
  fs.mkdirSync('./Problemset');
}

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
    console.log(`Problem ${dir.substring(dir.lastIndexOf('/') + 1)} saved!`);
  });
};

function getTestCaseFromProblemUrl(url) {
  if (!fs.existsSync(`./Problemset/${contest}`)) {
    fs.mkdirSync(`./Problemset/${contest}`);
  }

  var dir = `./Problemset/${contest}/${url.substring(
    url.lastIndexOf('/') + 1
  )}`;

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

axios
  .get(process.env.CF_CONTEST)
  .then((response) => {
    getTotalProblemsFromContestHtml(response.data);
    console.log('\nAll the Problems are fetched successfully\n');
  })
  .catch((error) => {
    console.log('Server is not Available right now');
  });
