Setup
=====
Installatie
----------------------------

Kloon de repository met:

```
git clone https://twiglight@bitbucket.org/twiglight/cria-project.git ~/workspaces/flexicon
```

Na dit commando wordt u gepromped om een wachtwoord in te voeren. Hier kunt u uw eigen wachtwoord invoeren als u toegang heeft tot de repository.
```~/workspaces/flexicon``` Kan veranderd worden naar eigen inzicht.

Ga naar de gekloonde map

```
cd ~/workspaces/flexicon
```

Waar ```~/workspaces/flexicon``` kan verschillen naar wat u heeft ingevoerd als map in het git clone commando

Configuratie
----------
Standaard zal de applicatie draaien op ```poort: 3001```. Als u dit wilt aanpassen navigeer naar naar de 
config map en pas daar het ```server.js``` bestand aan, deze bevindt zich in:

```
server/config/server.js
```

De applicatie zal standaard zoeken naar een Mongodatabase op ```localhost/flexicon```. Als u deze wilt veranderen 
zult u weer naar de config map moeten navigeren en daar de ```url``` veranderen van het ```database.js``` bestand.

```
server/config/database.js
```

[Node](http://nodejs.org/) modules installeren
----------
Het flexicon project wordt geleverd zonder [node](http://nodejs.org/) modules. Voordat u de server wilt starten zult u de [node](http://nodejs.org/) modules 
installeren. Als u [node](http://nodejs.org/) al geinstalleerd is dit erg simpel:

```
npm install
```

Als u geen [node](http://nodejs.org/) heeft geinstalleerd zult u deze moeten installeren voordat u deze applicatie kunt gebruiken.

Database initialiseren
----------
Na dat u alle bovenstaande commandos hebt uitgevoerd kunt u de applicatie gebruiken. Voordat u de applicatie gaat gebruiken 
moet u echter een [MongoDB](http://www.mongodb.org/) instantie draaien. Als u [MongoDB](http://www.mongodb.org/) geinstalleerd heeft doet u dit zo:

```
mongod
```

Als u geen [MongoDB](http://www.mongodb.org/) heeft zult u deze eerst moeten installeren.

Voordat u iets kunt doem met de applicatie zult u eerst de [MongoDB](http://www.mongodb.org/) database moeten vullen. Als u dit niet doet zal de website er erg leeg uit zien. Dit doet u d.m.v deze commando's:

```
cd dump/flexicon
mongorestore --collection afbeeldingen --db flexicon afbeeldingen.bson
mongorestore --collection flexicon --db flexicon flexicon.bson
mongorestore --collection gebruikers --db flexicon gebruikers.bson
mongorestore --collection inzendingen --db flexicon inzendingen.bson
mongorestore --collection lettertypes --db flexicon lettertypes.bson
mongorestore --collection reacties --db flexicon reacties.bson
mongorestore --collection themas --db flexicon themas.bson
mongorestore --collection woordenboek --db flexicon woordenboek.bson
```


De applicatie starten
----------


Als u eenmaal een [MongoDB](http://www.mongodb.org/) instantie heeft draaien en een gevulde database hebt kunt u de applicatie starten door dit commando:

```
node flexicon.js
```

U zult nu een bericht te zien krijgen dat de applicatie draait en op welke port deze draait. 
Als u nu naar ```localhost:3001``` navigeerd (of naar een andere poort die u zelf hebt ingesteld) dan zult u op de 
hoofdpagina van de Flexicon website uitkomen.


Unit-tests
----------


De tests zijn te vinden in twee directories in de server-directory. Namelijk de e2e en de test directory. De flexicon-app kent zowel Unit tests met behulp van Mocha als
e2e-tests met behulp van protractor.

Installeer eerst mocha globaal voorhet uitvoeren van de unit-tests:

```
npm install -g mocha

```

Run vervolgens de unit tests alsvolgt:

```
mocha
```

E2E-tests
----------

Voor het runnen van de e2e-tests maakt de app gebruik van protractor (Selenium).
Installeer voor het runnen van deze tests eerst protractor globaal:

```
npm install -g protractor

```
Installeer daarna de Selenium stand-alone-server

```
webdriver-manager update

```
Start deze server daarna met:

```
webdriver-manager start

```

Run de tests met behulp van de volgende commandos (LET OP: De Flexicon server moet draaien!):

```
cd e2e
protractor conf.js

```