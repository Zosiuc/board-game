import { socket } from './client';



export async function addModeratorListener(name: string, game_id: string): Promise<string | null> {
    return new Promise((resolve, reject) => {

        socket.emit("addModerator", name, game_id);

        socket.once("moderatorAdded", (moderatorId: string | null) => {
            if (!moderatorId) {
                console.error("Moderator is not added");
                return reject(null);
            }
            //console.log("addModeratorListener: ",moderatorId )
            resolve(moderatorId);
        });
    });
}


export async function getModeratorListener(moderator_id: string): Promise< {id:string,name:string,game_id:string,created_at:string}| null> {
    return new Promise((resolve, reject) => {
        try {
            socket.emit("getModerator", moderator_id);
            console.log(moderator_id);

            socket.off("moderator").once("moderator", (moderator:{ id: string, name: string, game_id: string, created_at: string } | null) => {
                if (!moderator) {
                    console.error(`Moderator not found`);
                    return reject(null);
                }
                resolve(moderator ?? null);
            });
        }catch (err) {
            console.error(`getModeratorListener Error: ${err}`);
            return reject("Moderator not found");
        }
    });
}

export async function getGameModeratorListener(game_id: string): Promise< {id:string,name:string,game_id:string,created_at:string}| null> {
    return new Promise((resolve, reject) => {
        try {
            socket.emit("getModeratorByGameId", game_id);
            console.log(game_id);

            socket.off("moderatorByGameId").once("moderatorByGameId", (moderator:{ id: string, name: string, game_id: string, created_at: string } | null) => {
                if (!moderator) {
                    console.error(`Game moderator not found`);
                    return reject(null);
                }
                resolve(moderator ?? null);
            });
        }catch (err) {
            console.error(`getModeratorListener Error: ${err}`);
            return reject("Game moderator not found");
        }
    });
}


