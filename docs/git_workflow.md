# Feature-Branch-Workflow in Git

## Aktuellen Entwicklungsstand herunterladen  
```
# Auf Branch wechseln
git checkout develop
# Änderungen vom Remote-Repository herunterladen
git fetch origin
# Lokale Branch auf letzte Änderungen der Branch zurücksetzen
git reset --hard origin/develop
```

## Feature-Branch erstellen und auswählen
```
# Branch erstellen und aktivieren
git checkout -b feature/<feature-name>
```

## Arbeiten in der Branch vornehmen und committen
```
# Vorgenommene Änderungen auflisten
git status
# Änderungen für Commit vormerken
git add <file-names>
# Commit mit vorgemerkten Änderungen anlegen
git commit -m "<commit-message>"
```

## Branch auf den Remote-Server übertragen
```
# Brnach übertragen und mit Remote verknüpfen
git push -u origin feature/<feature-name>
```

## Merge Request erstellen

Nach Fertigstellung des Features kann ein Merge-Request im GitHub-Repository erstellt werden. Des Weiteren können hier die Entwickler über das Feature diskutieren bis es schlussendlich reviewt und abgenommen wurde. Anschließend wird es in die develop-Branch germerged und somit freigegeben und übernommen.