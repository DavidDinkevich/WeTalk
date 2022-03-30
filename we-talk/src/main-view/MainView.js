
import LeftScreen from '../left-screen/LeftScreen.js';
import ChatView from '../chat-view/ChatView.js'

function MainView({ chatList, selfInfo }) {
    return (
        <div className='row' style={{ height: '100vh', minWidth: '300px', background: "green" }}>
            <div className='col-lg-4' style={{ background: 'blue', width: '26%' }}>
                <LeftScreen chatList={chatList} selfInfo={selfInfo} />
            </div>
            <div className='col' style={{ width: '80vw' }}>
                <ChatView />
            </div>

        </div>
    );
}

export default MainView;
