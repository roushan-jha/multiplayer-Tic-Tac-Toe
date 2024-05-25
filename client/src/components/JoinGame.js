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
      alert("User not found!");
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
          <h4>Create Game</h4>
          <input placeholder='Username of opponent...' onChange={(e) => setOpponentUsername(e.target.value)} />
          <button onClick={createChannel}>Start Game</button>
        </div>
      )
    }
    </>
  )
}

export default JoinGame;