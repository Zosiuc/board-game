import {socket} from "./client"



export async function getStrategiesListener(): Promise<{
    id: number,
    category_id: number,
    name: string,
    icon: string,
    color: string
}[] | null> {
    return new Promise((resolve, reject) => {
        socket.emit("getStrategies");

        socket.off("strategies").on("strategies", (data: {
            err?: string;
            strategies?: { id: number, category_id: number, name: string, icon: string, color: string }[]
        }) => {
            if (data.err) {
                console.error("Fout bij het ophalen van strategies", data.err);
                return reject(null);
            }
            console.log("strategies ontvangen:", data.strategies );
            resolve(data.strategies ?? null);
        })
    })
}