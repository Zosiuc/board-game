import "./App.scss"

import Home from "./screens/home/Home";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {GameProvider} from "./context/GameContext";
import CreateGame from "./screens/moderator/CreateGame/CreateGame";
import Setting from "./screens/setting/Setting";
import JoinGame from "./screens/team/JoinGame/JoinGame";
import LoadGame from "./screens/moderator/LoadGame/LoadGame";
import TeamPanel from "./screens/team/TeamPanel/TeamPanel";
import ModeratorPanel from "./screens/moderator/ModeratorPanel/ModeratorPanel";
import ModeratorResult from "./screens/results/ModeratorResult/ModeratorResult";
import TeamResult from "./screens/results/TeamResults/TeamResult";
import Fout from "./screens/fout/FoutPage";


function App() {
    return (
        <GameProvider>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Home/>}/>
                    <Route path="/create-game" element={<CreateGame/>}/>
                    <Route path="/join-game" element={<JoinGame/>}/>
                    <Route path="/setting" element={<Setting/>}/>
                    <Route path="/load-game" element={<LoadGame/>}/>
                    <Route path="/game/:teamId" element={<TeamPanel/>}/>
                    <Route path="/moderator/:gameId" element={<ModeratorPanel/>}/>
                    <Route path="/moderator/:roomId/result" element={<ModeratorResult/>}/>
                    <Route path="/game/:roomId/result" element={<TeamResult/>}/>
                    <Route path="*" element={<Fout/>}/>
                </Routes>
            </BrowserRouter>
        </GameProvider>
    );
}

export default App;

