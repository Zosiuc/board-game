g**How to run ENG:**
First split the terminal or open a second terminal window.
The files are split in a client side and a server side, to run both (so you can start the application correctly):
- Type "cd server" in the first console window
- Type "cd client" in the second console window

Secondly, make sure NodeJS is installed in both folders (skip this step if it is already installed).
Enter this in both the terminal/CMD windows:
- Type "npm install" in the 'BoardGame'(Root) window
- Type "npm install" in the 'client' window 

To start and run the database, (skip this step if you already did this)

____First: (skip this step if you already did this)
Installeer MySQL Server:
Download en installeer MySQL Community Server van de officiële MySQL-website.
Volg de installatie-instructies en zorg ervoor dat je de MySQL-server start na de installatie.
Installeer MySQL Extension in your IDE (VS Code/IntelliJ ...):

 _IntelliJ: Installeer de Database Navigator Plugin (voor Community Edition):
  Open IntelliJ IDEA en ga naar File > Settings > Plugins.
  Zoek naar “Database Navigator” en installeer de plugin. Herstart IntelliJ IDEA na de installatie..
 _VS Code:
  Open your IDE en ga naar de Extensions (uitbreidingen) tab (icoon aan de linkerkant).
  Zoek naar “MySQL” en installeer de MySQL extension van Jun Han.
Maak een nieuwe MySQL-verbinding:
Klik op het database-icoon aan de linkerkant van VS Code/recht van IntelliJ.
Klik op de knop “+” om een nieuwe verbinding toe te voegen.
Voer de vereiste gegevens in, zoals hostnaam (meestal localhost), poort (standaard 3306), gebruikersnaam, wachtwoord en database naam.
Verbind met de database:
Klik op “Connect” om verbinding te maken met je MySQL-server.
Als de verbinding succesvol is, zie je je database in de lijst.

EXTRA: make .env file in your project root 'BoardGame' and type in :
DB_HOST=localhost
DB_USER=your-username
DB_PORT=3306
DB_PASSWORD=your-password
DB_NAME=thebestseller

______________________________________________________________
____Then:
- Add data source "MySQL" in your IDE here can you make username, password if you want via database modify schema.
- Type "npm run setup" in the `BoardGame` window
- Type "npm run importdata" in the `BoardGame` window

Lastly, you should start both sides (client and server) of the project:
- Type "npm run dev" in the `BoardGame` window


IMPORTANT NOTE:
Everytime your pc is restarted or if you did not correctly end running the program (ctrl + y in terminals to stop running), you will need to do the following things again to start the project:

Server:
- Split terminal/cmd or open a second window
- On one of those windows type "cd server" to select the server directory
- Type "npm start" to activate the server

Client: 
- Select the second terminal/cmd window
- On the second window type "cd client"
- Type "npm start" to run the application
-------------------------------------------------------------------------------------------------------
POTENTIAL PROBLEM:
MySql is not starting: you see the error msg in your terminal.
- If acces diende because of username, password, make sure these bose ara (root, null).
-------------------------------------------------------------------------------------------------------
IMPORTANT when pushing codes, the following file and folder must not be pushed:
- 'package-lock.json' (file in server and client)
- 'node_modules'
-------------------------------------------------------------------------------------------------------
Insert undefined values into the database, causing SQL errors:
- server/domain/repositories/QuestionRepository.js:
change line 19:
question    VARCHAR(1000) NOT NULL,

add under line 35:
question: question,
lang: lang

- server/application/use-cases/Setup/importData.js:
add under line 71 (as place holder):
icon: "client/src/assets/icon/Chance.png",
color: "#FFFFFF"
-------------------------------------------------------------------------------------------------------

DEPENDENCIES VERSIONS:
- NodeJS: v20.17.0
- npm: 10.8.2

