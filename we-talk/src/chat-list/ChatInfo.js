import { getContactByName } from "../DataBase";
import './chat-info.css'

function ChatInfo({ contact }) {
    const maxMessageLength = 25;

    let messages = contact.messagesList;
    let lastMessageText = ''
    let time = ''
    let contactImage = getContactByName(contact.name).image;
    if (messages.length > 0) {
        time = messages[messages.length - 1].time;
        lastMessageText = messages[messages.length - 1].message;
        if (lastMessageText.length > maxMessageLength)
            lastMessageText = lastMessageText.substring(0, maxMessageLength - 3) + '...';
    }
    return (
        <li className="list-group-item d-flex justify-content-between align-items-start chat-info-li">
            <img
                className="user-img chat-info-img"
                id="user-0"
                // src="//gravatar.com/avatar/00034587632094500000000000000000?d=retro"
                src={contactImage.length > 0 ? contactImage : '/anonymous_profile.webp'}
                alt='???'
                style={{ height:'100%', marginBottom:'auto', marginTop:'auto'}}
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

export default ChatInfo;