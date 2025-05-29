import {socket} from "./client"


export default class SocketListeners {


    async getGame(setGameId:(id:string) => void, setGame:(
        game:{
                id: string,
            category_id: number,
            rounds: number,
            teams_count: number,
            status: string,
            lang: string,
            master_socket: string,
            created_at: string
        } | null) => void)
    {
        //breng game
        const game_id = sessionStorage.getItem("game_id");
        if (!game_id) return console.error('gameId not found');
        setGameId(game_id);

        socket.emit("loadGame", game_id)
        socket.on("game", (game) => {
            setGame(game)
        });
    }
}