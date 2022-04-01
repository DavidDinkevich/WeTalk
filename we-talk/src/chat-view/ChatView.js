import { useState } from 'react';

import Message from '../message/Message';
import MediaUploadView from './MediaUploadView';


const messagesList = [
    { source: 'remote', author: 'שחר מורשת', message: 'יאו אני מתה לחזור לפרוייקט בתכנות!!!!' },
    { source: 'remote', author: 'שחר מורשת', message: 'את גם מרגישה ככה?' },
];

function createMessageID(messageNumber) {
    // console.log('creating message ID from: ' + messageNumber);
    return `${'אביה אלגברלי'} - ${messageNumber}`;
}

export const hideMediaUploadView = function() {
    let mediaUploadView = document.getElementById('media_upload_view');
    mediaUploadView.style.visibility = 'hidden';
}

// const UIMessageList = messagesList.map((message, key) => {
//     return <Message {...message} key={key} />;
// });

function ChatView() {
    const [UIMessageList, setUIMessagesList] = useState(messagesList);

    const uilist = UIMessageList.map((message, key) => {
        return <Message {...message} messageID={createMessageID(key)} key={key} />;
    });

    const sendMessage = function ({ message, imgPath }) {
        let newMessage = Object.assign({ source: 'self', author: 'אביה אלגברלי' }, { message, imgPath });

        // console.log('got: ' + JSON.stringify(message) + ' and sent: ' + JSON.stringify(newMessage) );

        setUIMessagesList(UIMessageList.concat([newMessage]));


    }

    const toggleMediaUploadView = function () {
        let mediaUploadView = document.getElementById('media_upload_view');
        if (mediaUploadView.style.visibility === 'hidden')
            mediaUploadView.style.visibility = 'visible';
        else {
            mediaUploadView.style.visibility = 'hidden';
        }
    }

    function scrollDown() {
        // Scroll to bottom
        var objDiv = document.getElementById("chat-window");
        objDiv.scrollTop = objDiv.scrollHeight;

    }

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', background: '#7C79D5' }}>
            <section className="chatbox" style={{ width: 'inherit' }}>
                <section id="chat-window" className="chat-window" style={{ position: 'relative', height: '100%' }}
                        onClick={hideMediaUploadView}>
                    {uilist}
                </section>

                <MediaUploadView sendMediaMessage={() => {
                    sendMessage({ message: '' }); // empty
                }} getLastMessageID={() => {
                    return createMessageID(UIMessageList.length);
                }} />

                <div id='footer' className="chat-input" style={{ background: '#7C79D5' }} onKeyDown={(e) => {
                    if (!e) e = window.event;
                    var keyCode = e.code || e.key;
                    if (keyCode === 'Enter') {
                        let messageField = document.getElementById('message_box');
                        let text = messageField.value;
                        messageField.value = '';
                        sendMessage({ message: text });
                        // Scroll to bottom
                        scrollDown();

                    }
                }}>

                    <button id='upload_image_button'
                        className='button'
                        style={{ float: 'left', border: 'none', background: '#7C79D5' }}
                        onClick={toggleMediaUploadView} >
                        {/* <span> */}
                        <div style={{ background: '#7C79D5' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ color: '#9D9CE2', float: 'center', marginLeft: '4px', width: '50px', height: '50px' }} fill="currentColor" className="bi bi-paperclip" viewBox="0 0 24 24">
                                <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                            </svg>
                        </div>
                        {/* </span> */}
                    </button>

                    <input type="text" id='message_box' autoComplete="off" placeholder="Type a message" />

                    <button onClick={sendMessage}>
                        <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                            <path
                                fill="#7C79D5"
                                d="M17,12L12,17V14H8V10H12V7L17,12M21,16.5C21,16.88 20.79,17.21 20.47,17.38L12.57,21.82C12.41,21.94 12.21,22 12,22C11.79,22 11.59,21.94 11.43,21.82L3.53,17.38C3.21,17.21 3,16.88 3,16.5V7.5C3,7.12 3.21,6.79 3.53,6.62L11.43,2.18C11.59,2.06 11.79,2 12,2C12.21,2 12.41,2.06 12.57,2.18L20.47,6.62C20.79,6.79 21,7.12 21,7.5V16.5M12,4.15L5,8.09V15.91L12,19.85L19,15.91V8.09L12,4.15Z"
                            />
                        </svg>
                    </button>
                </div>
            </section>
        </div>

    );
}

export default ChatView;

