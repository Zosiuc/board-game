import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {socket} from "../socket/client";


interface GameContextType {

    contextGameId: string | null;
    contextTeamId: string | null;
    contextModeratorId: string | null;
    gameActive:boolean;
    msg:string

    contextModerator: {
        id: string,
        name: string,
        game_id: string,
        created_at: string
    } | null;

    contextGame: {
        id: string,
        category_id: number,
        rounds: number,
        teams_count: number,
        status: string,
        lang: string,
        master_socket: string,
        created_at: string
    } | null;

    contextGameTiles: {
        id: string,
        game_id: string,
        x: number,
        y: number,
        color: string,
        clicked: boolean,
    }[] | null;

    contextTeams: {
        id: string,
        name: string,
        strategy_id: number,
        game_id: string,
        socket_id: string,
        points: number,
        color: string,
        current_tiled: string
        created_at: string
    }[] | null;

    contextQueAntTeams: {
        id: number,
        game_id: string,
        team_id: string,
        question_id: number, moderator_id: number,
        answer: string,
        score: number,
        feedback: string,
        round_number: number,
        created_at: string,
        updated_at: string
    }[] | null;

    contextStrategies: {
        id: number,
        category_id: number,
        name: string,
        icon: string,
        color: string
    }[] | null;

    setContextGameId: (contextGameId: string | null) => void;
    setContextTeamId: (contextTeamId: string | null) => void;
    setContextModeratorId: (contextModeratorId: string | null) => void;
    setGameActive: (gameActive: boolean) => void;
    setMsg: (msg: string) => void;

    setContextModerator: (
        contextModerator: {
            id: string,
            name: string,
            game_id: string,
            created_at: string
        } | null
    ) => void;

    setContextGame: (contextGame: {
                         id: string,
                         category_id: number,
                         rounds: number,
                         teams_count: number,
                         status: string,
                         lang: string,
                         master_socket: string,
                         created_at: string
                     } | null
    ) => void;

    setContextGameTiles: (
        contextGameTiles: {
            id: string,
            game_id: string,
            x: number,
            y: number,
            color: string,
            clicked: boolean,
        }[] | null
    ) => void;


    setContextTeams: (contextTeams: (prev: any) => any[]
    ) => void;

    setContextQueAntTeams: (contextQueAntTeams: {
                                id: number,
                                game_id: string,
                                team_id: string,
                                question_id: number, moderator_id: number,
                                answer: string,
                                score: number,
                                feedback: string,
                                round_number: number,
                                created_at: string,
                                updated_at: string
                            }[] | null
    ) => void;

    setContextStrategies: (contextStrategies: {
                               id: number,
                               category_id: number,
                               name: string,
                               icon: string,
                               color: string

                           }[] | null
    ) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({children}: { children: ReactNode }) => {
    const [contextGameId, setContextGameId] = useState<string | null>(null);
    const [contextTeamId, setContextTeamId] = useState<string | null>(null);
    const [contextModeratorId, setContextModeratorId] = useState<string | null>(null);
    const [gameActive, setGameActive] = useState<boolean>(false);
    const [ msg, setMsg] = useState("");
    const [contextModerator, setContextModerator] = useState<{
        id: string,
        name: string,
        game_id: string,
        created_at: string
    } | null>(null);

    const [contextGame, setContextGame] = useState<{
        id: string,
        category_id: number,
        rounds: number,
        teams_count: number,
        status: string,
        lang: string,
        master_socket: string,
        created_at: string
    } | null
    >(null);

    const [contextGameTiles, setContextGameTiles] = useState<{
        id: string,
        game_id: string,
        x: number,
        y: number,
        color: string,
        clicked: boolean
    }[] | null>(null);
    const [contextTeams, setContextTeams] = useState<{
        id: string,
        name: string,
        strategy_id: number,
        game_id: string,
        socket_id: string,
        points: number,
        color: string,
        current_tiled: string
        created_at: string
    }[] | null>(null);
    const [contextQueAntTeams, setContextQueAntTeams] = useState<{
        id: number,
        game_id: string,
        team_id: string,
        question_id: number, moderator_id: number,
        answer: string,
        score: number,
        feedback: string,
        round_number: number,
        created_at: string,
        updated_at: string
    }[] | null>(null);
    const [contextStrategies, setContextStrategies] = useState<{
        id: number,
        category_id: number,
        name: string,
        icon: string,
        color: string
    }[] | null>(null);

    useEffect(() => {
        //breng game
        const game_id = sessionStorage.getItem("game_id");
        if (!game_id) return console.error('gameId not found');
        setContextGameId(game_id);

        socket.emit("loadGame", game_id)
        socket.on("game", (game) => {
            setContextGame(game)
            if (game.status === "active" ) setGameActive(true)
        });

        socket.emit("loadTiles", game_id)
        socket.on("gameTiles", (gameTiles) => {
            setContextGameTiles(gameTiles);
        });

        socket.emit("getSameRoomTeams", game_id);
        socket.on("sameRoomTeams", (teams) => {
            setContextTeams(teams);
        });

        socket.on('gameStarted' ,(msg) => {

            setGameActive(true);
            setMsg(msg)
        })

        return () => {
            socket.off("moderator");
            socket.off("game");
            socket.off("gameTiles");
            socket.off("getSameRoomTeams");
            socket.off('gameStarted');
        }

    }, [])

    useEffect(() => {
        const handler = setTimeout(() => {
            setMsg('');
        }, 5000); // 500ms wachten

        return () => {
            clearTimeout(handler); // Reset timer als gebruiker weer typt
        };
    }, [msg]);

    return (
        <GameContext.Provider value={{
            contextGameId,
            contextTeamId,
            contextModeratorId,
            gameActive,
            msg,
            contextModerator,
            contextGame,
            contextGameTiles,
            contextTeams,
            contextQueAntTeams,
            contextStrategies,
            setContextGameId,
            setContextTeamId,
            setContextModeratorId,
            setGameActive,
            setMsg,
            setContextModerator,
            setContextGame,
            setContextGameTiles,
            setContextTeams,
            setContextQueAntTeams,
            setContextStrategies
        }}>
            {children}
        </GameContext.Provider>
    );
};

export const useGameContext = () => {
    const context = useContext(GameContext);
    if (!context) {
        throw new Error("useGameContext must be used within a GameContext");
    }
    return context;
};