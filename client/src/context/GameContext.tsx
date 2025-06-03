import {createContext, ReactNode, useContext, useEffect, useState} from "react";
import {socket} from "../socket/client";


interface GameContextType {

    gameId: string;
    moderatorId: string;
    teamId: string;
    roundNumber:number;

    gameActive: boolean;
    msg: string

    game: {
        id: string,
        category_id: number,
        rounds: number,
        teams_count: number,
        status: string,
        lang: string,
        master_socket: string,
        created_at: string
    } | null;
    moderator: {
        id: string,
        name: string,
        game_id: string,
        created_at: string
    } | null;
    team: {
        id: string,
        name: string,
        strategy_id: number,
        game_id: string,
        socket_id: string,
        points: number,
        color: string,
        current_tileId: string
        created_at: string
    } | null;
    gameTiles: {
        id: string,
        game_id: string,
        x: number,
        y: number,
        color: string,
        clicked: boolean,
    }[];
    teams: {
        id: string,
        name: string,
        strategy_id: number,
        game_id: string,
        socket_id: string,
        points: number,
        color: string,
        current_tileId: string
        created_at: string
    }[];
    teamsQueAns: {
        id: number,
        game_id: string,
        team_id: string,
        question_id: number,
        moderator_id: number,
        answer: string,
        score: number,
        feedback: string,
        round_number: number,
        created_at: string,
        updated_at: string
    }|null;
    question: {
        id: number,
        category_id: number,
        strategy_id: number,
        lang: string,
        content: string
    }|null

    strategies: {
        id: number,
        category_id: number,
        name: string,
        icon: string,
        color: string
    }[];

    savedAnswers: {
        teamsQueAns_id: number,
        team_id: string,
        teamsQueAns: {
            id: number,
            game_id: string,
            team_id: string,
            question_id: number,
            moderator_id: number,
            answer: string,
            score: number,
            feedback: string,
            round_number: number,
            created_at: string,
            updated_at: string
        },
        question: {
            id: number,
            category_id: number,
            strategy_id: number,
            lang:string,
            content:string
        },
        checked: boolean
    }[];

    setGameId: (gameId: string) => void;
    setModeratorId: (moderatorId: string) => void;
    setTeamId: (teamId: string) => void;
    setRoundNumber: (roundNumber: number) => void;

    setGameActive: (gameActive: boolean) => void;
    setMsg: (msg: string) => void;

    setModerator: (
        moderator: {
            id: string,
            name: string,
            game_id: string,
            created_at: string
        }
    ) => void;

    setGame: (game: {
                  id: string,
                  category_id: number,
                  rounds: number,
                  teams_count: number,
                  status: string,
                  lang: string,
                  master_socket: string,
                  created_at: string
              }
    ) => void;

    setTeam: (team: {
                  id: string,
                  name: string,
                  strategy_id: number,
                  game_id: string,
                  socket_id: string,
                  points: number,
                  color: string,
                  current_tileId: string,
                  created_at: string
              } | null
    ) => void;

    setGameTiles: (
        contextGameTiles: {
            id: string,
            game_id: string,
            x: number,
            y: number,
            color: string,
            clicked: boolean,
        }[]
    ) => void;


    setTeams: (teams: {
                   id: string,
                   name: string,
                   strategy_id: number,
                   game_id: string,
                   socket_id: string,
                   points: number,
                   color: string,
                   current_tileId: string
                   created_at: string
               }[]
    ) => void;

    setTeamsQueAns: (teamsQueAns: {
                         id: number,
                         game_id: string,
                         team_id: string,
                         question_id: number,
                         moderator_id: number,
                         answer: string,
                         score: number,
                         feedback: string,
                         round_number: number,
                         created_at: string,
                         updated_at: string
                     }|null
    ) => void;

    setQuestion: (question: {
                      id: number,
                      category_id: number,
                      strategy_id: number,
                      lang: string,
                      content: string
                  }|null
    ) => void;
    setStrategies: (strategies: {
                        id: number,
                        category_id: number,
                        name: string,
                        icon: string,
                        color: string

                    }[]
    ) => void;
    setSavedAnswers: (savedAnswers:(savedAnswers: {
                          teamsQueAns_id: number,
                          team_id: string,
                          teamsQueAns: {
                              id: number,
                              game_id: string,
                              team_id: string,
                              question_id: number,
                              moderator_id: number,
                              answer: string,
                              score: number,
                              feedback: string,
                              round_number: number,
                              created_at: string,
                              updated_at: string
                          },
                          question: {
                              id: number,
                              category_id: number,
                              strategy_id: number,
                              lang:string,
                              content:string
                          },
                          checked: boolean
                      }[] ) => {
                          teamsQueAns_id: number,
                          team_id: string,
                          teamsQueAns: {
                              id: number,
                              game_id: string,
                              team_id: string,
                              question_id: number,
                              moderator_id: number,
                              answer: string,
                              score: number,
                              feedback: string,
                              round_number: number,
                              created_at: string,
                              updated_at: string
                          },
                          question: {id: number,
                              category_id: number,
                              strategy_id: number,
                              lang:string,
                              content:string},
                          checked: boolean
    }[]
    ) => void ;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider = ({children}: { children: ReactNode }) => {
    const [gameId, setGameId] = useState<string>("");
    const [teamId, setTeamId] = useState<string>("");
    const [moderatorId, setModeratorId] = useState<string>("");
    const [roundNumber, setRoundNumber] = useState<number>(0);

    const [gameActive, setGameActive] = useState<boolean>(false);
    const [msg, setMsg] = useState("");

    const [moderator, setModerator] = useState<{
        id: string,
        name: string,
        game_id: string,
        created_at: string
    } | null>(null);

    const [game, setGame] = useState<{
        id: string,
        category_id: number,
        rounds: number,
        teams_count: number,
        status: string,
        lang: string,
        master_socket: string,
        created_at: string
    } | null>(null);
    const [team, setTeam] = useState<{
        id: string,
        name: string,
        strategy_id: number,
        game_id: string,
        socket_id: string,
        points: number,
        color: string,
        current_tileId: string
        created_at: string
    } | null>(null);

    const [gameTiles, setGameTiles] = useState<{
        id: string,
        game_id: string,
        x: number,
        y: number,
        color: string,
        clicked: boolean
    }[]>([]);
    const [teams, setTeams] = useState<{
        id: string,
        name: string,
        strategy_id: number,
        game_id: string,
        socket_id: string,
        points: number,
        color: string,
        current_tileId: string
        created_at: string
    }[]>([]);
    const [teamsQueAns, setTeamsQueAns] = useState<{
        id: number,
        game_id: string,
        team_id: string,
        question_id: number,
        moderator_id: number,
        answer: string,
        score: number,
        feedback: string,
        round_number: number,
        created_at: string,
        updated_at: string
    }|null>(null);
    const [question, setQuestion] = useState<{
        id: number,
        category_id: number,
        strategy_id: number,
        lang:string,
        content:string
    }|null>(null);
    const [strategies, setStrategies] = useState<{
        id: number,
        category_id: number,
        name: string,
        icon: string,
        color: string
    }[]>([]);
    const [savedAnswers, setSavedAnswers] = useState<{
        teamsQueAns_id: number,
        team_id: string,
        teamsQueAns: {
            id: number,
            game_id: string,
            team_id: string,
            question_id: number,
            moderator_id: number,
            answer: string,
            score: number,
            feedback: string,
            round_number: number,
            created_at: string,
            updated_at: string
        },
        question: {
            id: number,
            category_id: number,
            strategy_id: number,
            lang:string,
            content:string
        },
        checked: boolean
    }[]>([]);

    useEffect(() => {
        //breng game
        const game_id = sessionStorage.getItem("game_id");
        if (!game_id) return console.error('gameId not found');
        setGameId(game_id);

        socket.emit("loadGame", game_id)
        socket.off("game").on("game", (game) => {
            setGame(game)
            if (game.status === "active") setGameActive(true);
            else setGameActive(false);
        });

        socket.emit("loadTiles", game_id)
        socket.off("gameTiles").on("gameTiles", (gameTiles) => {
            setGameTiles(gameTiles);
        });

        socket.emit("getSameRoomTeams", game_id);
        socket.off("sameRoomTeams").on("sameRoomTeams", (teams) => {
            setTeams(teams);
        });

        socket.on('gameStarted', (msg) => {
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
            gameId,
            teamId,
            moderatorId,
            roundNumber,
            gameActive,
            msg,
            moderator,
            game,
            team,
            gameTiles,
            teams,
            teamsQueAns,
            question,
            strategies,
            savedAnswers,
            setGameId,
            setTeamId,
            setModeratorId,
            setRoundNumber,
            setGameActive,
            setMsg,
            setModerator,
            setGame,
            setTeam,
            setGameTiles,
            setTeams,
            setTeamsQueAns,
            setQuestion,
            setStrategies,
            setSavedAnswers
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
