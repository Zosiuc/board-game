import {socket} from "./client"


export async function addGameListener(game_id: string,category_name:string,game_rounds:number,total_teams:number,lang:string): Promise< string| null> {
    return new Promise((resolve, reject) => {
        console.log(game_id,category_name,game_rounds,total_teams)
        socket.emit("createGame", game_id,category_name,game_rounds,total_teams,lang);

        // Voorkom dat meerdere event listeners ontstaan
        socket.once("game_id", ( game_id:string| null) => {
            if (!game_id) {
                console.error("Game is not added");
                return reject(null);
            }
            resolve(game_id);
        });
    });
}

export async function getGameListener(game_id: string): Promise<{
            id: string,
            category_id: number,
            rounds: number,
            teams_count: number,
            status: string,
            lang:string,
            master_socket:string,
            created_at: string
        }|null> {
    return new Promise((resolve, reject) => {
        try {
            socket.emit("loadGame", game_id);

            // Voorkom dat meerdere event listeners ontstaan
            socket.off("game").once("game", (
                game: {
                    id: string,
                    category_id: number,
                    rounds: number,
                    teams_count: number,
                    status: string,
                    lang: string,
                    master_socket: string,
                    created_at: string
                } | null) => {
                if (!game) {
                    console.error("Game Is Not Found");
                    return reject(null);
                }
                console.log("Game listener:", game);
                resolve(game);
            });
        } catch (err) {
            console.log("Error:", err);
            return reject(null);
        }
    });
}

export async function getGameTilesListener(game_id: string): Promise<{
    id: string,
    game_id: string,
    x: number,
    y: number,
    color: string,
    clicked:boolean,
}[]|null> {
    return new Promise((resolve, reject) => {
        try {
            socket.emit("loadTiles", game_id);
            socket.off("gameTiles").once("gameTiles", (
                gameTiles:{
                    id: string,
                    game_id: string,
                    x: number,
                    y: number,
                    color: string,
                    clicked:boolean, }[] |null) => {
                if (!gameTiles) {
                    console.error("Game Tiles Is Not Found");
                    return reject(null);
                }
                console.log("Game listener:", gameTiles);
                resolve(gameTiles);
            });
        }catch (err){
            console.log("Error:", err);
            return reject(null);
        }
    });
}