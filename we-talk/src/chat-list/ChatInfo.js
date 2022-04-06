import { getContactByName } from "../DataBase";

function ChatInfo({ contact }) {
    let messages = contact.messagesList;
    let lastMessageText = ''
    let time = ''
    let contactImage = getContactByName(contact.name).image;
    if (messages.length > 0) {
        lastMessageText = messages[messages.length - 1].message;
        time = messages[messages.length - 1].time;
    }
    return (
        <li className="list-group-item d-flex justify-content-between align-items-start" style={{ width: '100%', height:'100%', minHeight:'75px', border:'none' }}>
            <img
                className="user-img"
                id="user-0"
                // src="//gravatar.com/avatar/00034587632094500000000000000000?d=retro"
                src={contactImage.length > 0 ? contactImage : '/anonymous_profile.webp'}
                alt='???'
                style={{ height:'100%', marginBottom:'auto', marginTop:'auto'}}
            />

            <div className="ms-2 me-center">
                <div className="fw-bold mb-1" style={{ fontSize: '18px' }}>{contact.name}</div>
                {lastMessageText}
            </div>
            <div className="" style={{minWidth:'68px', height:'100%'}}>
                <span id={contact.name + "unread messages"} className="ms-2 mb-2 badge rounded-pill"
                    style={{textAlign:'center', background:'#6cc4ea'}}>{contact.unread}</span>
                <div>{time}</div>
            </div>
        </li>

    );
}

export default ChatInfo;