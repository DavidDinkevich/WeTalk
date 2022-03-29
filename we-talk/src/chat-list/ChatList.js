
import ChatInfo from './ChatInfo'

function ChatList({chatInfos}) {
    return (
        
        <div style={{ width: '30%'}}>
            <ul className="list-group list-group-unordered" style={{position:'absolute', width: "25%", height:"100%", overflow:'scroll'}}>
                {/* <ChatInfo name="Aviya" message="is the best"/> */}
                {/* <ChatInfo/> */}
                {/* <ChatInfo/> */}
                {/* <ChatInfo/> */}
                {/* <ChatInfo/> */}
                {/* <ChatInfo/> */}
                {/* <ChatInfo/> */}
                {/* <ChatInfo/> */}
                {/* <ChatInfo/> */}
                {chatInfos}
                
            </ul>
        </div>);
}

export default ChatList;