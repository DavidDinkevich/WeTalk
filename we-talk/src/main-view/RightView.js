import ChatTitle from "../chat-view/ChatTitle";
import ChatView from "../chat-view/ChatView";

function RightView({ activeContact }) {

    return (
        <>
            <div className='col g-0' style={{width:'100%'}}>
                <div className='row g-0' style={{width: '100%'}}>
                    <ChatTitle activeContact={activeContact} />
                </div>
                <div className='row g-0'>
                    <ChatView activeContact={activeContact} />
                </div>
            </div>
        </>
    );
}

export default RightView;