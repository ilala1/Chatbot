import React, { useState } from 'react'
import { connect } from 'react-redux';
import uuid from 'react-uuid';

import { sendMessage, userMessage } from '../../actions/jarvis'
import script from '../../lib/script';

import bot from '../../images/bot.png';
import user from '../../images/user.png';


const Chat = ({ chat, userMessage, sendMessage }) => {
    // HANDLE USERS MESSAGE
    const [message, setMessage] = useState("");

    
    const handleClick = async (e) => {
        const code = e.keyCode || e.which;
        if (code === 13) {
            console.log(message)
            userMessage(message)
            sendMessage(message, script)
            setMessage("")
        }
    }
    return (
        <div className='chatBoxContainer'>
            <h1 className="title">Welcome to chatbot</h1>
            <div className="historyContainer">
                <div className="chatBubble">
                    <img className="botIcon" src={bot} alt="bot icon" />
                    <div className='bot'>Hi, I'm bot!</div>

                </div>
                {chat.length === 0 ? "" : chat.map((msg) =>
                    <div key={uuid()} className="chatBubble">
                        {msg.type === 'bot'
                            ?
                            <img className="botIcon" src={bot} alt="bot icon" />
                            :
                            msg.type === 'user'
                                ?
                                <img className="userIcon" src={user} alt="user icon" />
                                :
                                <img className="botIcon" src={bot} alt="bot icon" />
                        }
                        <div className={msg.type}>{msg.message}</div>
                    </div>
                )}
                <input id="chatBox"
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyPress={handleClick}
                    value={message}>
                </input>

            </div>
        </div>
    )
};
const mapStateToProps = state => ({
    chat: state.jarvis.messages
})

export default connect(mapStateToProps, { userMessage, sendMessage })(Chat);