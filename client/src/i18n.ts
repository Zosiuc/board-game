import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";

const resources = {
    en: {
        translation: {
            theBestseller:"The Bestseller",
            welcome: "Welcome",
            home: "Home",
            createGame: "Create Game",
            joinGame: "Join Game",
            loadGame: "Load Game",
            settings: "Settings",
            roomCode: "Room Code",
            moderatorName: "Moderator Name",
            totalTeams: "Total Teams",
            rounds: "Rounds",
            selectQuestionCategory: "Select Questions Category",
            yourTeamId: "Your Team ID:",
            teamName: "Team Name",
            chooseStrategy: "Choose Your Strategy",
            enterName: "Enter Your Name",
            teams: "Teams",
            general: "General",
        },
    },
    nl: {
        translation: {
            theBestseller:"De Bestseller",
            welcome: "Welkom",
            home: "Home",
            createGame: "Spel Maken",
            joinGame: "Spel Joinen",
            loadGame: "Spel Laden",
            settings: "Instellingen",
            roomCode: "Kamercode",
            moderatorName: "Moderatornaam",
            totalTeams: "Aantal teams",
            rounds: "Rondes",
            selectQuestionCategory: "Selecteer een vragencategorie",
            yourTeamId: "Jouw team-ID:",
            teamName: "Teamnaam",
            chooseStrategy: "Kies je strategie",
            enterName: "Voer je naam in",
            teams: "Teams",
            general: "Algemeen",
        },
    },
    da: {
        translation: {
            theBestseller:"Bedstsælgeren",
            welcome: "Velkommen",
            home: "Hjem",
            createGame: "Opret Spil",
            joinGame: "Deltag i Spil",
            loadGame: "Indlæs spil",
            settings: "Indstillinger",
            roomCode: "Rumkode",
            moderatorName: "Moderaturnavn",
            totalTeams: "Antal hold",
            rounds: "Runder",
            selectQuestionCategory: "Vælg Spørgsmålskategori",
            yourTeamId: "Dit hold-ID:",
            teamName: "Holdnavn",
            chooseStrategy: "Vælg din strategi",
            enterName: "Indtast dit navn",
            teams: "Hold",
            general: "Generelt",
        },
    },
};

i18n
    .use(LanguageDetector)
    .use(initReactI18next)
    .init({
        resources,
        fallbackLng: "en",
        interpolation: {
            escapeValue: false,
        },
    });

export default i18n;
