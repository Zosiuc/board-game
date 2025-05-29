
const { Server } = require("socket.io");
const registerGameEvents  = require("./events/gameEvents.js");
const registerQuestionEvents  =require("./events/questionEvents.js");
const registerTeamEvents  =require("./events/teamEvents.js");
const registerCategoryEvents  =require("./events/categoryEvents.js");
const registerModeratorEvents  =require("./events/moderatorEvents.js");
const registerTeamQueAnsEvents  =require("./events/teamQueAnsEvents.js");
const registerStrategyEvents =require("./events/strategieEvents");
const registerTilesEvents = require("./events/tileEvents.js");

module.exports = {

    initializeSocket:function (server){
        const io = new Server(server, {
            cors: {
                origin: "*",
                methods: ["GET", "POST"],
            },
        });

        io.on("connection", (socket) => {
            try {
                console.log(`Nieuw verbinding: ${socket.id}`);

                // Events registreren
                registerGameEvents(io, socket).catch(err => console.error(err.message));
                registerQuestionEvents(io, socket);
                registerTeamEvents(io, socket);
                registerCategoryEvents(io, socket);
                registerStrategyEvents(io, socket);
                registerModeratorEvents(io, socket);
                registerTeamQueAnsEvents(io, socket);
                registerTilesEvents(io, socket);

                socket.on("disconnect", () => {
                    console.log(`Socket ${socket.id} is disconnected`);
                });
            }catch(err) {
                console.error(`Error Socket Connection : ${socket.id}\n${err.message} `);
            }
        });

        return io;
    }

};



