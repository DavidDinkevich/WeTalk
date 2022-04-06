import ChatList from "../chat-list/ChatList";
import SelfInfo from "../self-info/SelfInfo";
import ChatSearch from "./chat-search/ChatSearch";


function LeftScreen({ selfInfo, activeContact, setActiveContact}) {
    return (
        <div style={{ position:'relative', width:'100%', margin:'0', padding:'0', background:'white'}}>
            <SelfInfo name={selfInfo} />
            <ChatSearch />
            <ChatList activeContact={activeContact} setActiveContact={setActiveContact} />
        </div>
    );
}

export default LeftScreen;