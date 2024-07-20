import React, { useState } from 'react';
import { useChatContext, Channel } from 'stream-chat-react';
import Game from './Game';

const JoinGame = () => {

  const [opponentUsername, setOpponentUsername] = useState("");
  const {client} = useChatContext();
  const [channel, setChannel] = useState(null);

  const createChannel = async () => {
    const response = await client.queryUsers({name: { $eq: opponentUsername }});
    if(response.users.length === 0) {
      alert("No User Found 🙅‍♂️");
      return;
    }
    const newChannel = await client.channel("messaging", {
      members: [client.userID, response.users[0].id],
    });
    await newChannel.watch();
    setChannel(newChannel);
  }

  return (
    <>
    {
      channel ? (
        <Channel channel={channel} >
          <Game channel={channel} />
        </Channel>
      ) : (
        <div className='joinGame' >
          <div>Create Game</div>
          <div className='joinGame-content'>
            <input placeholder='Username of opponent...' onChange={(e) => setOpponentUsername(e.target.value)} />
            <button onClick={createChannel}>Start Game</button>
          </div>
        </div>
      )
    }
    </>
  )
}

export default JoinGame;