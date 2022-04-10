import { getContactByName } from "../DataBase";
import './chat-info.css'

function ChatInfo({ contact }) {
    const maxMessageLength = 25;

    let messages = contact.messagesList;
    let lastMessageText = ''
    let time = ''
    let contactImage = getContactByName(contact.name).image;
    if (messages.length > 0) {
        let lastMessage = messages[messages.length - 1];
        time = lastMessage.time;
        if (lastMessage.message.length > 0) {
            lastMessageText = messages[messages.length - 1].message;
            if (lastMessageText.length > maxMessageLength)
                lastMessageText = lastMessageText.substring(0, maxMessageLength - 3) + '...';
        }
        else if (lastMessage.image.length > 0)
            lastMessageText = <LastMediaMessageIcon mediaType='Photo' />
        else if (lastMessage.video.length > 0)
            lastMessageText = <LastMediaMessageIcon mediaType='Video' />;
        else if (lastMessage.audio.length > 0)
            lastMessageText = <LastMediaMessageIcon mediaType='Audio' />;
    }

    return (
        <li className="list-group-item d-flex justify-content-between align-items-start chat-info-li">
            <img
                className="user-img chat-info-img"
                id="user-0"
                // src="//gravatar.com/avatar/00034587632094500000000000000000?d=retro"
                src={contactImage.length > 0 ? contactImage : '/anonymous_profile.webp'}
                alt='???'
                style={{ height: '100%', marginBottom: 'auto', marginTop: 'auto' ,clipPath:"circle()" }}
            />

            <div className="ms-2 me-center ">
                <div className="fw-bold mb-1 chat-info-text">{contact.name}</div>
                {lastMessageText}
            </div>
            <div className="chat-info-container">
                <span id={contact.name + "unread messages"} className="ms-2 mb-2 badge rounded-pill chat-info-unread">
                    {contact.unread}</span>
                <div>{time}</div>
            </div>
        </li>

    );
}

function LastMediaMessageIcon({ mediaType }) {
    let icon;
    if (mediaType === 'Photo')
        icon =
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-fill" viewBox="0 2 16 16">
                <path d="M10.5 8.5a2.5 2.5 0 1 1-5 0 2.5 2.5 0 0 1 5 0z" />
                <path d="M2 4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-1.172a2 2 0 0 1-1.414-.586l-.828-.828A2 2 0 0 0 9.172 2H6.828a2 2 0 0 0-1.414.586l-.828.828A2 2 0 0 1 3.172 4H2zm.5 2a.5.5 0 1 1 0-1 .5.5 0 0 1 0 1zm9 2.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" />
            </svg>
    else if (mediaType === 'Video')
        icon =
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-camera-video-fill" viewBox="0 2 16 16">
                <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5z" />
            </svg>
    else if (mediaType === 'Audio')
        icon =
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-mic-fill" viewBox="0 0 16 16">
                <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
            </svg>

    return (
        <div className='row gx-2'>
            <div className='col mt'>
                {icon}
            </div>
            <div className='col mt'>
                {mediaType}
            </div>
        </div>
    );
}

export default ChatInfo;