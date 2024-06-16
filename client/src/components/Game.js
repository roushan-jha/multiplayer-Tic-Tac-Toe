import React, { useState } from 'react'
import Board from './Board';
import '../styles/chat.css'
import { Window, MessageList, MessageInput } from 'stream-chat-react'

const Game = ({channel, setChannel}) => {
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
        <Window>
          <MessageList disableDateSeparator hideDeletedMessages closeReactionSelectorOnClick messageActions={["react"]} />
          <MessageInput noFiles />
        </Window>
        <button onClick={async () => {
          await channel.stopWatching();
          setChannel(null);
        }}>
          {" "}
          Leave Game
        </button>
        {result.state === "won" && <div>{result.winner} Won The Game</div>}
        {result.state === "tie" && <div>Game Tie</div>}
    </div>
  )
}

export default Game