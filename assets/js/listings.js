async function load_listing(lng, lng_code, options) {

  return new Promise(async function (resolve, reject) {
    const entryFields = options.fields;

    Promise.all([
      fetch(`assets/data/${options.type}.json`),
      fetch(`${_CONFIG.localePath}/${lng_code}/${options.type}.json`)
    ]).then(async function (responsesJSON) {

      Promise.all(responsesJSON.map(r => r.json())).then(response => {

        // let entries = await response[0];
        const tmplEl = document.getElementById(options.template);
        const template = Handlebars.compile(tmplEl.innerHTML);

        entries = response[0].all;
        shuffle(entries);
        for (i in entries) {
          // If the game has support to the given language
          let elem = entries[i];
          if (elem.language.indexOf(lng) !== -1) {
            // Translate entries
            entryFields.forEach(field => {
              if (response[1][elem.id][field]) {
                elem[field] = response[1][elem.id][field];
              } else {
                console.warn(`No translation for: ${elem.id} ${field} in ${_CONFIG.localePath}/${lng_code}/${options.type}.json`);
              }
            });

            const entriesEl = document.getElementById(options.targetEl);
            const str = template({
              elem: elem
            });
            // If element do not already exists
            if (!document.querySelector(`#${elem.id}`)) {
              entriesEl.insertAdjacentHTML('beforeend', str);
            }
          }
        };
        resolve(true);
      }).catch((err) => {
        console.error(err);
        reject(err);
      });

    }).catch((err) => {
      console.error(err);
      reject(err);
    });

  })
}


function shuffle(array) {
  var currentIndex = array.length,
    temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}