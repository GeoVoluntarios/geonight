# GeoNight

Website originally developed for the GeoNight organized in collaboration with the Spanish Association of Geography (AGE).

# Localization

Locations are stored in folder specified in config.json (`localePath`).

## Static content

In order to add new text to the `index.html` the tag element containing the text just need to have an attribute (`data-i18n`)
making sure its unique is unique, for example:

```html
<small data-i18n="jean-piaget">
  Jean Piaget
</small>
```

## Dynamic content

Games, media appearances, organizers and partners are loaded dynamically through JSON files store at [assets/data](/assets//data).

In order to add new partners to any specific language you have to add a new entry to the file in `assets/data`, and then
the locale files will be generated automatically.

> **Warning**: do not add entries manually in the "locale" folder. Entries will be added and removed automatically if 
you have the `npm run update:po` script running.


## Generate translation files

Just by running `npm run update:po`, the app will keep listening any changes in the main files and updating the 
translations files as needed.

## Update

1. 
2. Go to https://poeditor.com/projects/import?id=594851
3. And upload locale/en-us/translation.po
4. Add the translations
5. Download each language (except english)
6. Move to the right folder
7. Convert po files to i18n: `npm run i18n`

## Change UI language

Use "locale" codes, e.g. `?lng=es-ES`.

https://geovoluntarios.github.io/geonight/index.html?lng=es-ES
Open: [English version](https://geovoluntarios.github.io/geonight/index.html?lng=en-US) | [Spanish version]()