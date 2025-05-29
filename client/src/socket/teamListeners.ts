import {socket} from "./client"





export async function addTeamListener(teamId: string, teamName: string, strategyName: string, game_id: string): Promise<{
    id: string,
    name: string,
    strategy_id: number,
    game_id: string,
    socket_id: string,
    points:number,
    color: string,
    current_tileId:string,
    created_at: string
}> {

    return new Promise((resolve, reject) => {
        try {
            socket.emit("joinTeam", teamId, teamName, strategyName, game_id);

            socket.off("teamAdded").on("teamAdded", (team: {
                id: string,
                name: string,
                strategy_id: number,
                game_id: string,
                socket_id: string,
                points:number,
                color: string,
                current_tileId:string
                created_at: string
            } | null) => {
                if (!team) {
                    console.log("Team is not added");
                    return reject(null);
                }
                console.log("Team ontvangen:", team);
                resolve(team);
            })
        } catch (err) {
            console.error(`addTeamEvent Error`, err);
            return reject(err);
        }

    })

}

export async function getRoomTeamsListener(game_id: string): Promise<{
    id: string,
    name: string,
    strategy_id: number,
    game_id: string,
    socket_id: string,
    points:number,
    color: string,
    current_tileId:string
    created_at: string
}[]|[]> {
    return new Promise((resolve, reject) => {
        try {
            socket.emit("getSameRoomTeams", game_id);

            socket.off("sameRoomTeams").once("sameRoomTeams", (teams?:{
                id: string,
                name: string,
                strategy_id: number,
                game_id: string,
                socket_id: string,
                points:number,
                color: string,
                current_tileId:string
                created_at: string
            }[]|null) => {
                if (!teams) {
                    console.log("Teams Is Not Found");
                    return null;
                }
                console.log("Teams Received:", teams);
                resolve(teams);
            });
        } catch (err) {
            console.error(`addTeamEvent Error`, err);
            return reject(null);
        }

    })
}

export async function getTeamListener(teamId: string): Promise<{   id: string,
    name: string,
    strategy_id: number,
    game_id: string,
    socket_id: string,
    points:number,
    color: string,
    current_tileId:string
    created_at: string}|null> {
    return new Promise((resolve,reject)=>{
        socket.emit("getTeam",teamId);

        socket.off("team").on("team",(data:{err?:string,team?:{   id: string,
                name: string,
                strategy_id: number,
                game_id: string,
                socket_id: string,
                points:number,
                color: string,
                current_tileId:string
                created_at: string}})=>{
            if (data.err) {
                console.error(`Error in socket events: ${data.err}`)
                return reject(data.err)
            }
            console.log("Team Received:",data.team);
            return resolve(data.team ?? null);
        });
    });
}
