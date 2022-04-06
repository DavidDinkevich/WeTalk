
import LeftScreen from '../left-screen/LeftScreen.js';
import ChatView from '../chat-view/ChatView.js';
import React, { useState } from "react";
import Logo from '../logo/Logo.js';

export let showChatView;

function MainView({ selfInfo, activeContact, setActiveContact }) {

    const [chatViewHidden, setChatViewHidden] = useState(true);
    showChatView = () => setChatViewHidden(false);

    return (
        <div className='row g-0' style={{ maxHeight: '90vh', height: '90vh', width: '90vw', minWidth: '700px', background: '#f0f3f9', opacity:'0.8', 
                                            borderRadius: '15px'}}>
            <div className='col-lg-4' style={{width: '26%', minWidth:'300px', padding: '0px', background:'white', borderBottomLeftRadius: '15px', borderTopLeftRadius: '15px' }}>
                <LeftScreen selfInfo={selfInfo} activeContact={activeContact} setActiveContact={setActiveContact} />
            </div>

            <div className='col' style={{ minWidth: '400px', maxHeight: 'inherit' , textAlign: 'center'}}>
                {!chatViewHidden ? <ChatView activeContact={activeContact} /> : <Logo />}
            </div>

        </div>
    );
}

export default MainView;
