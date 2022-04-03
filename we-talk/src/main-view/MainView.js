
import LeftScreen from '../left-screen/LeftScreen.js';
import ChatView from '../chat-view/ChatView.js'

function MainView({ selfInfo, activeContact, setActiveContact}) {
    return (
        <div className='row g-0' style={{ maxHeight: '90vh', height: '90vh', width: '90vw', minWidth: '300px', background:'#F4F3FF'}}>
            <div className='col-lg-4' style={{ background: 'rgb(240, 240, 240)', width: '26%', padding:'0px' }}>
                <LeftScreen selfInfo={selfInfo} activeContact={activeContact} setActiveContact={setActiveContact}/>
            </div>
            <div className='col' style={{maxHeight:'inherit'}}>
                <ChatView activeContact={activeContact}/>
            </div>

        </div>
    );
}

export default MainView;
