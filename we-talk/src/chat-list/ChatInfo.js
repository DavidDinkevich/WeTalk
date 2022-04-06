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
            {/* <svg xmlns="http://www.w3.org/2000/svg" width="64" height="80" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M10 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg> */}
            <img
                className="user-img"
                id="user-0"
                // src="//gravatar.com/avatar/00034587632094500000000000000000?d=retro"
                src={contactImage.length > 0 ? contactImage : '/anonymous_profile.webp'}
                alt='???'
                style={{ width: '20%', height:'100%', marginBottom:'auto', marginTop:'auto'}}
            />

            <div className="ms-2 me-center">
                <div className="fw-bold mb-1" style={{ fontSize: '18px' }}>{contact.name}</div>
                {lastMessageText}
            </div>
            <div className="" style={{minWidth:'68px', height:'100%'}}>
                <span id={contact.name + "unread messages"} className="ms-2 mb-2 badge bg-primary rounded-pill"
                    style={{textAlign:'center'}}>{contact.unread}</span>
                <div>{time}</div>
            </div>
        </li>

    );
}

export default ChatInfo;