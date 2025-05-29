import {socket} from "./client"



export async function getCategoriesListener(): Promise<{ id: number, name: string }[] | null> {
    return new Promise((resolve, reject) => {
        socket.emit("getCategories");

        socket.off("getCategoriesResponse").once("getCategoriesResponse", (data: {
            error?: string;
            categories?: { id: number, name: string }[]
        }) => {
            if (data.error) {
                console.error("Fout bij het ophalen van categories", data.error);
                return reject(null);
            }
            console.log("categories ontvangen:", data.categories);
            resolve(data.categories ?? null);
        });
    });
}