
import './message.css'
import { getActiveUser, getContactByName } from '../DataBase'
import { getAccountNameFromMsgID, getMessageIndexFromMsgID } from '../DataBase';

function Message({ source, author, message, time, messageID }) {
    // const messageSide = source === 'self' ? 'msg-self' : 'msg-remote';
    let senderImage = getActiveUser().image;
    let recipientName = getAccountNameFromMsgID(messageID);
    let recipientImage = getContactByName(recipientName).image;

    if (source === 'remote') {
        return (
            <article className="msg-container msg-remote">
                <div className="msg-box">
                    {/* <img
                        className="user-img"
                        id="user-0"
                        // src="//gravatar.com/avatar/00034587632094500000000000000000?d=retro"
                        src={recipientImage}
                        alt='???'
                    /> */}
                    <div className="thumb chat-info-image" style={{backgroundImage: `url(${recipientImage})`}} />


                    <div id={messageID} className="flr">
                        <RenderMessageContent messageID={messageID} />
                        {/* <div className="messages">
                            <p className="msg" id="msg-0" >
                                {message}
                            </p>
                        </div> */}
                        <span className="timestamp">
                            <span className="posttime">{time}</span> •
                            <span className="displayName">{' ' + author}</span>
                        </span>

                    </div>
                </div>
            </article>
        );
    } else {
        return (
            <article className="msg-container msg-self">
                <div className="msg-box">
                    <div id={messageID} className="flr">
                        <RenderMessageContent messageID={messageID} />

                        <span className="timestamp">
                            <span className="displayName">{author}</span> •
                            <span className="posttime"> {' ' + time}</span>
                        </span>
                    </div>
                    <img
                        className="user-img"
                        id="user-0"
                        // src="//gravatar.com/avatar/56234674574535734573000000000001?d=retro"
                        src={senderImage}
                        alt='???'
                    />
                </div>
            </article>
        );
    }
}

function RenderMessageContent({ messageID }) {
    let accountName = getAccountNameFromMsgID(messageID);
    let messageNumber = getMessageIndexFromMsgID(messageID);
    let text = getContactByName(accountName).messagesList[messageNumber].message;
    let imgPath = getContactByName(accountName).messagesList[messageNumber].image
    let videoPath = getContactByName(accountName).messagesList[messageNumber].video
    let audioPath = getContactByName(accountName).messagesList[messageNumber].audio

    if (text.length > 0) {
        return (
            <div className="messages">
                {/* <img src='/logo192.png' ></img> */}
                <p className="msg" id="msg-1">
                    {text}
                </p>
            </div>
        );
    }
    if (imgPath.length > 0) {
        return (
            <img className='img-fluid' src={imgPath} alt='' />
        );
    }
    if (videoPath.length > 0) {
        return (
            <video className='img-fluid' controls={true}>
                <source src={videoPath} />
            </video>
        );
    }
    if (audioPath.length > 0) {
        return (
            <audio controls={true} className='msg_audio'>
                <source src={audioPath} />
            </audio>
        );
    }
    return <></>
}


export default Message;

