// debugger
async function load_games(lng, lngIndex, lng_code) {
  const gameFields = ['title', 'description', 'url', 'author'];
  // debugger
  const responsesJSON = await Promise.all([
    fetch(`assets/data/games.json`),
    fetch(`${_CONFIG.localePath}/${lng_code}/games.json`)
  ]);
  var fetchedFiles = await Promise.all(responsesJSON.map(r => r.json()));

  let games = fetchedFiles[0].games;
  shuffle(games);

  for (i in games) {
    // If the game has support to the given language
    let elem = games[i];
    // debugger
    if (elem.language.indexOf(lng) !== -1) {
      // Translate games
      gameFields.forEach(field => {
        if (fetchedFiles[1][elem.id][field]) {
          elem[field] = fetchedFiles[1][elem.id][field];
        } else {
          console.warn(`No translation for: ${elem.id} ${field} in ${_CONFIG.localePath}/${lng_code}/games.json`);
        }
      });

      const tmplEl = document.getElementById('game-template');
      const template = Handlebars.compile(tmplEl.innerHTML);
      const gamesEl = document.getElementById('games');
      const str = template({
        elem: elem
      });
      gamesEl.insertAdjacentHTML('beforeend', str);
    }
  };


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
}