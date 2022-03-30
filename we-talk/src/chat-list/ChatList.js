
import ChatInfo from './ChatInfo'

function ChatList({ chatInfos }) {
    return (
        <div>
            <ul className="list-group list-group-unordered" style={{ margin: '0px 0px 0px 0px', position: 'absolute', width: "25%", height: "100%", overflow: 'scroll' }}>
                {chatInfos}
            </ul>
        </div>);
}

export default ChatList;