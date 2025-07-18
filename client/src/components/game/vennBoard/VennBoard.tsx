import React, {useEffect, useRef, useState} from 'react';
import './venn-board.scss';
import {socket} from "../../../socket/client";
import {useGameContext} from "../../../context/GameContext";
import {useParams} from "react-router-dom";



type GameProps = {
    isPlayer:boolean,
    currentTeam:{
        id: string,
        name: string,
        strategy_id: number,
        game_id: string,
        points: number,
        color:string,
        current_tileId: string,
        created_at: string
    }|null
}

const VennBoard: React.FC<GameProps> = ({isPlayer,currentTeam}) => {
    const [ loading, setLoading ] = useState<boolean>(false);
    const [faceRotations] = useState({
        1: { x: 0,   y: 0   },    // front
        2: { x: -90, y: 0   },    // top
        3: { x: 0,   y: -90 },    // right
        4: { x: 0,   y: 90  },    // left
        5: { x: 90,  y: 0   },    // bottom
        6: { x: 0,   y: 180 }     // back
    });
    const diceRef = useRef<HTMLDivElement>(null);
    const {teamId} = useParams();

    const {gameId, gameActive,setGameActive} = useGameContext();

    const [onClickedTiles,setOnClickedTiles] = useState<string[]>([]);
    const {gameTiles , setGameTiles} = useGameContext()

    const [possibleTilesId , setPossibleTilesId] = useState<string[]|null>(null);

    const rollDice = () => {
        const steps = Math.floor(Math.random() * 6) + 1;
        movePlayer(steps);
        // @ts-ignore
        let rotation  = faceRotations[steps];
        if (diceRef.current) {
            diceRef.current.style.transform = `rotateX(${rotation.x}deg) rotateY(${rotation.y}deg)`;
        }
    };

    const movePlayer = (steps:number) => {
        if (!onClickedTiles) return ;
        const currentTileId = localStorage.getItem("current_tile_id") ?? "T0";
        const newTilesId = [`T${parseInt(currentTileId.slice(1)) + steps}`,
            `T${parseInt(currentTileId.slice(1)) - steps}`,
            `T${parseInt(currentTileId.slice(1)) % steps}`,
            `T${parseInt(currentTileId.slice(1)) * steps /3}`]
        const pTilesId = newTilesId.filter(t=> onClickedTiles.includes(t));
        console.log(newTilesId);
        if ( pTilesId.length === 0 ) {
            return setPossibleTilesId(onClickedTiles)
        }

        return setPossibleTilesId(newTilesId);
    };

    const handleClick = (id:string) => {

        const element= document.getElementById(id);
        const span = document.createElement("span");
        span.classList.add("wait");
        span.ariaHidden = "true";
        element?.appendChild(span)

        const tile = gameTiles?.find(t => t.id === id);
        if(!tile) return alert("No tile found.");
        localStorage.setItem("current_tile_id", tile?.id);
        socket.emit("team_tile_click", gameId, teamId, tile);


    };

    useEffect(() => {
        socket.on("gameStarted", (msg) => {
            setGameActive(true);
        })
        socket.emit("loadTiles", gameId)
        socket.off("gameTiles").once("gameTiles", (gameTiles) => {
            setGameTiles(gameTiles);
            if(gameTiles) {
                const ot = gameTiles.filter((t: {
                    id: string,
                    game_id: string,
                    x: number,
                    y: number,
                    color: string,
                    clicked: boolean
                }) => !t.clicked)

                setOnClickedTiles(ot.map(((t: {
                    id: string,
                    game_id: string,
                    x: number,
                    y: number,
                    color: string,
                    clicked: boolean
                }) => t.id)));
            }
        });

        return () => {
            socket.off("gameTiles");
        }

    }, [gameId]);


    return (

        <div className="venn-wrapper">
            {!gameActive &&
            <div className="game_onActive" >
                <strong>The game will start once the moderator begins the session.<br/>
                Please wait for the moderator to start the game.</strong>
            </div>
            }
            {gameActive && gameTiles?.map((tile,index) => (
                <button
                    key={index}
                    id={tile.id}
                    className={` ${isPlayer && !tile.clicked && possibleTilesId?.includes(tile.id) ? `active-tile` : 'disable-tile'} ${currentTeam?.current_tileId === tile.id ? 'team-here' : ''} loading_tile `}
                    onClick={() => handleClick(tile.id)}
                    style={{
                        position: "absolute",
                        width: 70,
                        height: 70,
                        borderRadius: 20,
                        left: tile.x, // Tegel gecentreerd
                        top: tile.y, // Tegel gecentreerd
                        backgroundColor: tile.color
                    }}
                    disabled={!isPlayer}

                />
            ))}
            {gameActive && isPlayer&&
                <button className="move-button" onClick={rollDice}>
                    <div className="dice" ref={diceRef}>
                        <div className="face front"/>
                        <div className="face back"/>
                        <div className="face right"/>
                        <div className="face left"/>
                        <div className="face top"/>
                        <div className="face bottom"/>
                    </div>
                </button>
            }
        </div>
    );
};

export default VennBoard;
