import {
  parse
} from 'node-html-parser';
import * as fs from 'fs';
import * as path from 'path';
import chalk from 'chalk';
import {
  fileURLToPath
} from 'url';
import {
  i18nextToPo,
  gettextToI18next
} from 'i18next-conv';
import {
  readdir
} from 'fs/promises'
import * as playerLibrary from 'play-sound';
// var player = require('play-sound')(opts = {})

const configFile = fs.readFileSync('./config.json');
let config = JSON.parse(configFile);

const LOCALE_PATH = config.localePath;
const DEFAULT_LANGUAGE = config.defaultLanguage;
const DEFAULT_LANGUAGE_PATH = `${LOCALE_PATH}/${DEFAULT_LANGUAGE}`;
const WATCH_FILES = config.watchFiles;

function save(target) {
  return result => {
    fs.writeFileSync(target, result);
  };
}

let callback;
let player = playerLibrary.default()
const __filename = fileURLToPath(
  import.meta.url);
const __dirname = path.dirname(__filename);

try {
  if (process.argv[2] === '--update:po') {
    callback = function (filename) {
      /*
      Extract strings from index.html
      */
      const watchers = WATCH_FILES;
      let strFile = {};
      if (watchers.indexOf(filename) != -1) {
        console.log(chalk.blue(`${filename} modified`));

        switch (filename) {
          case 'index.html':
            fs.readFile('./index.html', 'utf8', (err, data) => {
              if (err) {
                console.error(err);
                return;
              }

              const root = parse(data);

              const uniqueIDs = [];
              const uniquevalues = {};

              root.querySelectorAll('[data-i18n]').forEach(e => {
                const UID = e.getAttribute('data-i18n');;
                let tmpStr = e.innerHTML;
                tmpStr = tmpStr.replace(/(\r\n|\n|\r)/gm, "");
                tmpStr = tmpStr.replace(/\s\s+/g, ' ');
                strFile[UID] = tmpStr.trim();

                const newSaved = strFile[UID];

                if (uniqueIDs.indexOf(UID) === -1) {
                  uniqueIDs.push(UID)
                  uniquevalues[UID] = newSaved;
                } else if (uniquevalues[UID] !== strFile[UID]) {
                  player.play('assets/mp3/glass-breaking.mp3', function (err) {
                    throw new Error(`Duplicate ID (${UID}) with different values: ${uniquevalues[UID]} != ${strFile[UID]}.`);
                  })
                }
              });
              /*
              Write strFile
              */
              let output = JSON.stringify(strFile, null, 2);

              fs.writeFile(`${DEFAULT_LANGUAGE_PATH}/translation.json`, output, err => {
                if (err) {
                  console.error(err);
                } else {
                  console.log(`Strings extracted to: '${DEFAULT_LANGUAGE_PATH}/translation.json'`);
                  const source = path.join(__dirname, `${DEFAULT_LANGUAGE_PATH}/translation.json`);

                  i18nextToPo('en-US', fs.readFileSync(source)).then(save(`${DEFAULT_LANGUAGE_PATH}/translation.po`));
                  console.log(`Updated PO file: '${DEFAULT_LANGUAGE_PATH}/translation.po'`)
                }
                // file written successfully
              });

            }); // end trigger for index.html
            break;


          case 'assets/data/games.json':
            /* Update games.json files */
            updateDataFile('games.json',
              ['title', 'description', 'url', 'author']);
            break;

          case 'assets/data/partners.json':
            /* Update games.json files */
            updateDataFile('partners.json',
              ['name', 'html']);
            break;
        }

      }

    };

  } else if (process.argv[2] === '--update:i18n') {
    callback = function (filename) {

      if (filename.indexOf('.po') != -1) {
        console.log(chalk.blue(`${filename} updated!`));
        const getDirectories = async source =>
          (await readdir(source, {
            withFileTypes: true
          })).filter(dirent => dirent.isDirectory()).map(dirent => dirent.name);

        // console.log("LOCALE_PATH=",LOCALE_PATH)
        getDirectories(LOCALE_PATH).then(folders => {
          folders.forEach(lang => {
            gettextToI18next(lang, fs.readFileSync(`${LOCALE_PATH}/${lang}/translation.po`))
              .then(save(`${LOCALE_PATH}/${lang}/translation.json`));
          })

          console.log("Directories=", folders);
        });
      }
    };

  }
} catch (err) {
  player.play('assets/mp3/glass-breaking.mp3', function (err) {
    throw new Error(err);
  })
}

fs.watch('.', {
  recursive: true
}, function (event, filename) {
  // console.log('event is: ' + event);
  callback(filename);
});


function updateDataFile(fileName, fields) {
  for (let i in config.langs) {
    const lngCode = config.langs[i][0];
    const lngStr = config.langs[i][1];

    let rawdata = fs.readFileSync(`./assets/data/${fileName}`);
    const entries = JSON.parse(rawdata).all;

    rawdata = fs.readFileSync(`${config.localePath}/${lngCode}/${fileName}`);
    const entryTranslations = JSON.parse(rawdata);

    const filteredEntries = entries.filter(el => el.language.indexOf(lngStr) != -1);
    // Adding new entries
    for (let g in filteredEntries) {
      let entryID = filteredEntries[g].id;
      if (!entryTranslations[entryID]) {
        console.log(chalk.green(`New entry: ${entryID} in ${lngStr}`))
        entryTranslations[entryID] = {};
        fields.forEach(f => entryTranslations[entryID][f] = '');
      }
    }

    // Removing old entries
    for (let g in entryTranslations) {
      // If the entry do not exist
      if (!filteredEntries.find(el => el.id === g)) {
        console.log(chalk.red(`Removing entry: ${g} in ${lngStr}`))
        delete entryTranslations[g];
      }
    }

    let output = JSON.stringify(entryTranslations, null, 2);

    fs.writeFile(`${config.localePath}/${lngCode}/${fileName}`, output, err => {
      if (err) {
        console.error(err);
      } else {
        console.log(`Updated: '${config.localePath}/${lngCode}/${fileName}'`);
      }
      // file written successfully
    });

  }
}