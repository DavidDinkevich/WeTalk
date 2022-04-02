import {contactList} from "../App"
import ChatInfo from "./ChatInfo";

function ChatList({ activeContact }) {
    let chatInfos = contactList.map((contact,key)=> {
        return <ChatInfo contact={contact} key={key} />
    });
    return (
        <ul className="list-group list-group-unordered" style={{ margin: '0', padding:'0px', position: 'relative', width:'100%', height: "100%", overflow: 'scroll' }}>
            {chatInfos}
        </ul>
    );
}

export default ChatList;