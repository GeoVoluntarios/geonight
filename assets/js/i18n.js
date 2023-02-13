import i18next from 'https://cdn.jsdelivr.net/npm/i18next@22.4.9/+esm'


let config = await fetch("../../config.json");
config = await config.json();
window._CONFIG = config;

const LANGS = config.langs.map(el => el[0]);
const LANGS_STR = config.langs.map(el => el[1]);

const translateSite = async () => {
  try {
    const responsesJSON = await Promise.all(
      LANGS.map(el => fetch(`${_CONFIG.localePath}/${el}/translation.json`))
    );
    const translations = await Promise.all(responsesJSON.map(r => r.json()));

    // text;
    const i18nextOptions = {
      // debug: true,
      // lng: 'en',
      fallbackLng: 'en-US',
      //fallbackNS: 'comoon',
      resources: {}
    };

    LANGS.forEach((lang, i) => i18nextOptions.resources[lang] = {
      translation: translations[i]
    });

    // Detect language
    i18next.use(i18nextBrowserLanguageDetector).init(i18nextOptions);
    const searchRegExp = /\\*"/g;
    const replaceWith = '"';

    document.querySelectorAll("[data-i18n]").forEach(e => {
      // Replace is a hack because poedit exports HTML tags like this \\\"  
      const newVal = i18next.t(e.dataset.i18n).replace(searchRegExp, replaceWith);
      e.innerHTML = newVal ? newVal : e.innerHTML;
    });
    console.log('Translation finished');
    initPage();

    const lngStr = _CONFIG.langs.find(el => el[0] === i18next.language)[1];
    // load_games(lngStr, LANGS.indexOf(i18next.language), i18next.language)

    load_listing(lngStr, i18next.language, {
      type: "games",
      targetEl: "games",
      template: "game-template",
      fields: ['title', 'description', 'url', 'author']
    });


    load_listing(lngStr, i18next.language, {
      type: "partners",
      targetEl: "partners",
      template: "partners-template",
      fields: ['name', 'html']
    }).then(success => {
      if (success) {
        console.log("Success")
        startSponsorGrid();
      } else {
        console.error("Partner grid could not be initialized")
      }
    });


  } catch (err) {
    throw err;
  }
};

translateSite();