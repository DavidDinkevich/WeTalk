import ChatList from "../chat-list/ChatList";
import SelfInfo from "../self-info/SelfInfo";


function LeftScreen({ selfInfo, activeContact}) {
    return (
        <div style={{ position:'relative', width:'100%', margin:'0', padding:'0'}}>
            <SelfInfo name={selfInfo} />
            <ChatList activeContact={activeContact} />
        </div>
    );
}

export default LeftScreen;