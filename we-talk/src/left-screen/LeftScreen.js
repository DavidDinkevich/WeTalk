import './left-screen.css'

import ChatList from "../chat-list/ChatList";
import SelfInfo from "../self-info/SelfInfo";
import ChatSearch from "./chat-search/ChatSearch";


function LeftScreen({ selfInfo, setActiveContact}) {
    return (
        <div className='left-screen'>
            <SelfInfo name={selfInfo} />
            <ChatSearch />
            <ChatList setActiveContact={setActiveContact} />
        </div>
    );
}

export default LeftScreen;