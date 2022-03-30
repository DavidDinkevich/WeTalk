
function ChatList({ chatInfos }) {
    return (
        <ul className="list-group list-group-unordered" style={{ margin: '0', padding:'0px', position: 'relative', width:'100%', height: "100%", overflow: 'scroll' }}>
            {chatInfos}
        </ul>
    );
}

export default ChatList;