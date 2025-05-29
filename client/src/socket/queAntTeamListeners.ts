import {socket} from "./client"


export async function getQueAntTeamsListener(gameId:string):Promise<{
    id:number,game_id:string,team_id:string,question_id:number,moderator_id:number,answer:string,score:number,feedback:string,round_number:number, created_at:string,updated_at:string}[] | null> {
    return new Promise((resolve, reject) => {

        socket.once("QueAntTeams", (data:{err?:string,QueAntTeams?:{id:number,game_id:string,team_id:string,question_id:number,moderator_id:number,answer:string,score:number,feedback:string,round_number:number, created_at:string,updated_at:string}[] | null}) => {
            if (data.err) {
                console.error(`Could not QueAnt Teams find: ${data.err}`);
                return reject(null);
            }
            console.log("QueAntTeams ontvangen:", data.QueAntTeams);
            resolve(data.QueAntTeams ?? null);
        });
    });
}