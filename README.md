# yourChoice &middot; frontend

## Erste Schritte

### Installation

```bash
$ git clone https://github.com/yourChoiceHO/frontend # Projekt von Github laden und lokal speichern
$ cd frontend                                        # In das heruntergeladene Verzeichnis wechseln
$ npm install                                        # Abhängigkeiten der Anwendung installieren
```

## Projekt-Umgebungen

### Entwicklungssystem starten

```bash
$ rm .env                                            # Environmentvariablen löschen
$ cp .env.development .env                           # Variablen für "development" verwenden
$ npm start                                          # Enwicklungsserver starten
```

### Produktions-Build erstellen

```bash
$ rm .env                                            # Environmentvariablen löschen
$ cp .env.production .env                           # Variablen für "production" verwenden
$ npm run build                                      # Anwendung bauen & bündeln
```

## Software

- [Node.js](https://nodejs.org/)
- [npm](https://www.npmjs.com/)
- [Git Bash](https://git-scm.com/downloads)
- [Google Chrome](https://www.google.com/chrome/browser/desktop/index.html)
  - [React Developer Tools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)
- [Visual Studio Code](https://code.visualstudio.com/)
  - [React Food Truck Plugin](https://marketplace.visualstudio.com/items?itemName=burkeholland.react-food-truck)
  - [EditorConfig Plugin](https://marketplace.visualstudio.com/items?itemName=EditorConfig.EditorConfig)
  - [Jest Plugin](https://marketplace.visualstudio.com/items?itemName=Orta.vscode-jest)
  - [Prettier Plugin](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
  - [TSLint Plugin](https://marketplace.visualstudio.com/items?itemName=eg2.tslint)

## Visual Studio Code User Settings

```json
{
  "terminal.integrated.shellArgs.windows": [
    "--command=usr/bin/bash.exe",
    "-l",
    "-i"
  ],
  "terminal.integrated.shell.windows": "C:\\Program Files\\Git\\git-cmd.exe",
  "editor.formatOnSave": true,
  "javascript.format.enable": false,
  "prettier.eslintIntegration": true
}
```
