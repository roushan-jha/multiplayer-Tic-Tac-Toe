import React, { useState } from 'react'
import Board from './Board';

const Game = ({channel}) => {
    const [palyersJoined, setPlayersJoined] = useState(channel.state.watcher_count === 2);
    const [result, setResult] = useState({winner: "none", state: "none"});
    channel.on("user.watching.start", (e) => {
        setPlayersJoined(e.watcher_count === 2);
    })

    if(!palyersJoined) {
        return <div>Waiting for opponent to join...</div>
    }
  return (
    <div className='gameContainer' >
        <Board result={result} setResult={setResult} />
        {/* CHAT SECTION */}
        {/* LEAVE GAME BUTTON */}
    </div>
  )
}

export default Game