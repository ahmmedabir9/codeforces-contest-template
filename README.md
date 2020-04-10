## Codeforces Contest Setup with CPPFastOlympicCoding Package in Sublime Text

You can save your time during contest time. You don't have to write the testcases again and again. This setup will download all of your testcases from the contest and run your solution with those tescases.

# Setup/Installation

Open your Terminal/Command in the directory for the project and run these commands.

```bash
git clone "https://github.com/ahmmedabir9/codeforces-contest-template.git"
cd codeforces-contest-template
npm install #install the dependencies from package.json
```

# Usage

```bash
export CF_CONTEST=https://codeforces.com/contest/1330
node contest.js
# will visit all the problems of the contest
# download their testcases
# create multiple directories A B C D E inside the Problemset directory depending on the number of problems in contest
# each directory created will have
#    sol.cpp of default template
#    sol.cpp:tests which will contain the testcases and correct answers
```

# Sublime Text Setup

1. Install Sublime Text
2. Install Package `CPPFastOlympicCoding` from package installer or manually
3. Open the Codeforces Directory with Sublime Text
4. Press `Ctrl+Alt+B`
5. The test name will be `green` if the test is passed othewise it will be `grey`
6. You can also run over multiple test cases and save them.
