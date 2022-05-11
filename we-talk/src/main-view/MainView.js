import './main-view.css';

import LeftScreen from '../left-screen/LeftScreen.js';
import ChatView from '../chat-view/ChatView.js';
import React, { useState } from "react";
import Logo from '../logo/Logo.js';

export let showChatView;

function MainView({ selfInfo, activeContact, setActiveContact }) {

    const [chatViewHidden, setChatViewHidden] = useState(true);
    showChatView = () => setChatViewHidden(false);

    return (
        <div className='row g-0 main-view-container'>
            <div className='col-lg-4 left-side'>
                <LeftScreen selfInfo={selfInfo} setActiveContact={setActiveContact} />
            </div>

            <div className='col right-side'>
                {!chatViewHidden ? <ChatView activeContact={activeContact} /> : <Logo />}
            </div>

        </div>
    );
}

export default MainView;
