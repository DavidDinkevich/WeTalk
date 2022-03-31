import { useState } from 'react';
import Message from '../message/Message';
import ReactDOM from "react-dom";
import App from '../App'


const messagesList = [
    { source: 'remote', author: 'שחר מורשת', message: 'יאו אני מתה לחזור לפרוייקט בתכנות!!!!' },
    { source: 'remote', author: 'שחר מורשת', message: 'את גם מרגישה ככה?' },
];


// const UIMessageList = messagesList.map((message, key) => {
//     return <Message {...message} key={key} />;
// });

function ChatView() {
    const [UIMessageList, setUIMessagesList] = useState(messagesList);

    const uilist = messagesList.map((message, key) => {
        return <Message {...message} key={key} />;
    });

    const sendMessage = function () {
        let messageField = document.getElementById('message_box');
        let text = messageField.value;
        messageField.value = '';

        if (text.trim().length !== 0) {
            messagesList.push({ source: 'self', author: 'אביה אלגברלי', message: text });
            setUIMessagesList(messagesList);
            const rootElement = document.getElementById("root");
            ReactDOM.render(<App />, rootElement);
        }
    }

    /*
        When image upload button is clicked, programmatically click
        the invisible upload image textfield
    */
    const uploadImage = function () {
        const upload_image_button = document.getElementById("upload_image_textfield");
        if (upload_image_button) {
            upload_image_button.click();
        }
    }

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', background: '#7C79D5' }}>
            <section className="chatbox" style={{ width: 'inherit' }}>
                <section className="chat-window" style={{ position: 'relative', height: '100%' }}>
                    {uilist}
                </section>

                <div id='footer' className="chat-input" style={{ background: '#7C79D5' }} onKeyDown={(e) => {
                    if (!e) e = window.event;
                    var keyCode = e.code || e.key;
                    if (keyCode === 'Enter')
                        sendMessage();
                }}>
                    {/* Invisible text field that can upload images */}
                    <input type="file" id="upload_image_textfield" multiple accept="image/*" style={{ display: "none" }}></input>
                    
                    <button id='upload_image_button'
                        className='button'
                        style={{ float: 'left', border: 'none', background: '#7C79D5' }}
                        onClick={uploadImage} >
                        {/* <span> */}
                        <div style={{ background: '#7C79D5' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ color: '#9D9CE2', float: 'center', marginLeft: '4px', width: '50px', height: '50px' }} fill="currentColor" class="bi bi-paperclip" viewBox="0 0 24 24">
                                <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                            </svg>
                        </div>
                        {/* </span> */}
                    </button>

                    <input type="text" id='message_box' autoComplete="on" placeholder="Type a message" />

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