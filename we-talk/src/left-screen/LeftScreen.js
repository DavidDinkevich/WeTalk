import ChatList from "../chat-list/ChatList";
import SelfInfo from "../self-info/SelfInfo";

function LeftScreen({ chatList, selfInfo }) {
    return (
        <div style={{ width: '25%' }}>
            <SelfInfo name={selfInfo} />
            <ChatList chatInfos={chatList} />
        </div>
    );
}

export default LeftScreen;