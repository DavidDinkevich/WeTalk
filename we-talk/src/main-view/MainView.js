
import LeftScreen from '../left-screen/LeftScreen.js';
import ChatView from '../chat-view/ChatView.js';
import React, { useState } from "react";
import Logo from '../logo/Logo.js';

export let showChatView;

function MainView({ selfInfo, activeContact, setActiveContact }) {

    const [chatViewHidden, setChatViewHidden] = useState(true);
    showChatView = () => setChatViewHidden(false);

    return (
        <div className='row g-0' style={{ maxHeight: '90vh', height: '90vh', width: '90vw', minWidth: '300px', background: '#f0f3f9' }}>
            <div className='col-lg-4' style={{width: '26%', padding: '0px', background:'white' }}>
                <LeftScreen selfInfo={selfInfo} activeContact={activeContact} setActiveContact={setActiveContact} />
            </div>

            <div className='col' style={{ maxHeight: 'inherit' , textAlign: 'center'}}>
                {!chatViewHidden ? <ChatView activeContact={activeContact} /> : <Logo />}
            </div>

        </div>
    );
}

export default MainView;
