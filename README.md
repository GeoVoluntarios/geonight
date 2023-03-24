# GeoNight

Website originally developed for the GeoNight organized in collaboration with the Spanish Association of Geography (AGE).

## Localization

Locations are stored in folder specified in config.json (`localePath`).

### Adding new static content

In order to add new text to the `index.html` the tag element containing the text just need to have an attribute (`data-i18n`)
making sure its unique is unique, for example:

```html
<small data-i18n="jean-piaget">
  Jean Piaget
</small>
```

Just by running `npm run update:po`, the app will keep listening any changes in the main files and updating the 
translations files as needed.

### PoEditor

We are using poeditor.com to collaborate on the translations. 

Write to rjimenez@esri.com if you need access.

**Upload translation strings**

1. Open [the project](https://poeditor.com/projects/import?id=594851) 
3. And upload `assets/locale/en-us/translation.po`

### Replace locale/<lang>/translation.png

As soon as the strings has been translated in poeditor, you have to:

1. Make sure `npm run update:i18n` is running
2. Download the translations files from [Languages](https://poeditor.com/projects/view?id=594851) (click on the language and then "Export")
3. Store the file in the language folder with the name `translation.po` (replace if needed)

> **Note**: English file do not need to be downloaded because it is the source language.

### Dynamic content

Games, media appearances, organizers and partners are loaded dynamically through JSON files store at [assets/data](/assets//data).

In order to add new partners to any specific language you have to add a new entry to the file in `assets/data`, and then
the locale files will be generated automatically.

> **Warning**: do not add entries manually in the "locale" folder. Entries will be added and removed automatically if 
you have the `npm run update:po` script running.

## Change UI language

Use "locale" codes, e.g. `?lng=es-ES`.

https://geovoluntarios.github.io/geonight/index.html?lng=es-ES
Open: [English version](https://geovoluntarios.github.io/geonight/index.html?lng=en-US) | [Spanish version]()