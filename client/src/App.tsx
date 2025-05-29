import "./App.scss"

import Home from "./screens/home/Home.tsx";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {GameProvider} from "./context/GameContext.tsx";
import CreateGame from "./screens/moderator/CreateGame/CreateGame.tsx";
import Setting from "./screens/setting/Setting.tsx";
import JoinGame from "./screens/team/JoinGame/JoinGame.tsx";
import LoadGame from "./screens/moderator/LoadGame/LoadGame.tsx";
import TeamPanel from "./screens/team/TeamPanel/TeamPanel.tsx";
import ModeratorPanel from "./screens/moderator/ModeratorPanel/ModeratorPanel.tsx";
import ModeratorResult from "./screens/results/ModeratorResult/ModeratorResult.tsx";
import TeamResult from "./screens/results/TeamResults/TeamResult.tsx";
import Fout from "./screens/fout/FoutPage.tsx";


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

