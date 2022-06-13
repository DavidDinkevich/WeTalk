
import './message.css'
import { formatTime, getActiveUser } from '../DataBase'
import { getMessageByID } from '../DataBase';

function Message({ source, id, sender, time }) {
    // const messageSide = source === 'self' ? 'msg-self' : 'msg-remote';
    let senderImage = getActiveUser().image.length > 0 ? getActiveUser().image : 'anonymous_profile.webp';
    let recipientImage = 'anonymous_profile.webp';

    if (source === 'remote') {
        return (
            <article className="msg-container msg-remote">
                <div className="msg-box">
                    <div className="thumb chat-info-image" style={{backgroundImage: `url(${recipientImage})`}} />

                    <div id={id} className="flr">
                        <RenderMessageContent messageID={id} />
                        {/* <div className="messages">
                            <p className="msg" id="msg-0" >
                                {message}
                            </p>
                        </div> */}
                        <span className="timestamp">
                            <span className="posttime">{formatTime(time)}</span> •
                            <span className="displayName">{' ' + sender}</span>
                        </span>

                    </div>
                </div>
            </article>
        );
    } else {
        return (
            <article className="msg-container msg-self">
                <div className="msg-box">
                    <div id={id} className="flr">
                        <RenderMessageContent messageID={id} />

                        <span className="timestamp">
                            <span className="displayName">{sender}</span> •
                            <span className="posttime"> {' ' + formatTime(time)}</span>
                        </span>
                    </div>
                    <div className="thumb chat-info-image" style={{backgroundImage: `url(${senderImage})`}} />
                </div>
            </article>
        );
    }
}

function RenderMessageContent({ messageID }) {
    // let accountName = getAccountNameFromMsgID(messageID);
    // let messageNumber = getMessageIndexFromMsgID(messageID);
    // let text = getContactByName(accountName).messagesList[messageNumber].message;
    let text = getMessageByID(messageID).content;
    // let imgPath = getContactByName(accountName).messagesList[messageNumber].image
    // let videoPath = getContactByName(accountName).messagesList[messageNumber].video
    // let audioPath = getContactByName(accountName).messagesList[messageNumber].audio
    let imgPath = '';
    let videoPath = '';
    let audioPath = '';

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

