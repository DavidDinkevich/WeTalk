function ChatInfo({ contact }) {
    let messages = contact.messagesList;
    let lastMessage = ''
    if (messages.length > 0) {
        lastMessage = messages[messages.length - 1].message;
    }
    return (
        <li className="list-group-item d-flex justify-content-between align-items-start" style={{ width: '100%', borderRight: 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="80" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M10 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>

            <div className="ms-2 me-center">
                <div className="fw-bold" style={{ fontSize: '25px', paddingBottom: '6px' }}>{contact.name}</div>
                {lastMessage}
            </div>
            <div>
                <span id={contact.name+"unread messages"} className="ms-5 badge bg-primary rounded-pill">{contact.unread}</span>
                <div className="" style={{ paddingTop: '20px' }}>{messages[messages.length-1].time}</div>
            </div>
        </li>

    );
}

export default ChatInfo;