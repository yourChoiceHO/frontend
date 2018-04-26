# Feature-Branch-Workflow in Git

## Aktuellen Entwicklungsstand herunterladen  
```
git checkout develop # Auf Branch wechseln
git fetch origin # Änderungen vom Remote-Repository herunterladen
git reset --hard origin/develop # Lokale Branch auf letzte Änderungen der Branch zurücksetzen
```

## Feature-Branch erstellen und auswählen
```
git checkout -b feature/<feature-name> # Branch erstellen und aktivieren
```

## Arbeiten in der Branch vornehmen und committen
```
git status # Vorgenommene Änderungen auflisten
git add <file-names> # Änderungen für Commit vormerken
git commit -m "<commit-message>" # Commit mit vorgemerkten Änderungen anlegen
```

## Branch auf den Remote-Server übertragen
```
git push -u origin feature/<feature-name> # Brnach übertragen und mit Remote verknüpfen
```
