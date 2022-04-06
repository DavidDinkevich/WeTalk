
import LeftScreen from '../left-screen/LeftScreen.js';
import React, { useState } from "react";
import Logo from '../logo/Logo.js';
import RightView from './RightView.js';
import SelfInfo from '../self-info/SelfInfo.js';
import ChatSearch from '../left-screen/chat-search/ChatSearch.js';
import ChatList from '../chat-list/ChatList.js';
import ChatTitle from '../chat-view/ChatTitle.js';
import ChatView from '../chat-view/ChatView.js';

export let showChatView;

function MainView({ selfInfo, activeContact, setActiveContact }) {

    const [chatViewHidden, setChatViewHidden] = useState(true);
    showChatView = () => setChatViewHidden(false);

    return (
        <div className='col' style={{
            maxHeight: '90vh', height: '90vh', width: '90vw', minWidth: '700px', background: '#f0f3f9', opacity: '0.8',
            borderRadius: '15px'
        }}>


            <div className="row g-0" style={{ background: 'white', border: 'blue', borderWidth: '2px' }}>
                <div className='col-lg-4' style={{ width: '26%', minWidth: '300px', padding: '0px', background: 'white', borderTopLeftRadius: '15px', borderBottom: 'none' }}>
                    <SelfInfo name={selfInfo} />
                </div>
                <div className="col" style={{}}>
                    <ChatTitle activeContact={activeContact} />
                </div>

            </div>
            <div className="row g-0" style={{ background: 'white', border: 'blue', borderWidth: '2px'}}>


                <div className='col-lg-4' style={{ width: '26%', minWidth: '300px', padding: '0px', background: 'white', borderBottomLeftRadius: '15px', borderTopLeftRadius: '15px' }}>
                    {/* <LeftScreen selfInfo={selfInfo} activeContact={activeContact} setActiveContact={setActiveContact} /> */}
                    <div style={{ position: 'relative', width: '100%', margin: '0', padding: '0', background: 'white', borderTopLeftRadius: 'inherit' }}>
                        <ChatSearch />
                        <ChatList activeContact={activeContact} setActiveContact={setActiveContact} />
                    </div>

                </div>

                <div className='col' style={{ minWidth: '400px', maxHeight: 'inherit', textAlign: 'center' }}>
                    {!chatViewHidden ? <ChatView activeContact={activeContact} /> : <Logo />}
                </div>
            </div>
        </div>
    );
}

export default MainView;
