import { useState, useEffect } from 'react';
import './chat-view.css'
import Message from '../message/Message';
import MediaUploadView from './MediaUploadView';
import RecordAudioModal from './RecordAudioModal';
import { refreshUIChatList } from '../chat-list/ChatList';
import { createMessageID, emptyMessageJSON, getActiveUser } from '../DataBase'


export const hideMediaUploadView = function () {
    let mediaUploadView = document.getElementById('media_upload_view');
    mediaUploadView.style.visibility = 'hidden';
}

function ChatView({ activeContact }) {
    useEffect(() => {
            // Scroll to bottom
            scrollDown();
        
    });

    const [recordAudioModalIsOpen, setRecordAudioModalIsOpen] = useState(false);
    let [UIMessageList, setUIMessagesList] = useState(activeContact.messagesList);
    // Ensure that UIMessageLest is = to activeContact.messagesList on EVERY rerender
    UIMessageList = activeContact.messagesList;

    const uiList = UIMessageList.map((message, key) => {
        return <Message {...message} messageID={createMessageID(activeContact.name, key)} key={key} />;
    });

    const sendMessage = function ({ message = '', image = '', video = '', audio = '' }) {
        // Get date for message
        // console.log(String(new Date()).split(" "))
        let date = String(new Date()).split(" ")[4]
        // date = date.substring(0, date.lastIndexOf(":"));

        let activeUserName = getActiveUser().displayName;

        let newMessage = Object.assign(
            emptyMessageJSON(),
            { source: 'self', author: activeUserName, time: date },
            { message, image, video, audio }
        );

        activeContact.messagesList.push(newMessage);
        setUIMessagesList(UIMessageList.concat([newMessage]));
        refreshUIChatList();
    }

    const sendMessageFromInputBox = function () {
        let messageField = document.getElementById('message_box');
        let text = messageField.value;
        if (text.length > 0) {
            messageField.value = ''; // Clear box
            sendMessage({ message: text });
        }
    }

    const getLastMessageID = function () {
        return createMessageID(activeContact.name, UIMessageList.length - 1);
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

    // const showRecordAudioModal = function() {
    // let recordAudioModal = document.getElementById('record_audio_modal');
    // recordAudioModal.show = true;
    // }

    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', background: '#6cc4ea',  borderBottomRightRadius: '15px',borderTopRightRadius: '15px'}}>
            <section className="chatbox" style={{ width: 'inherit', borderBottomRightRadius: '15px', borderTopRightRadius: '15px'}}>
                <section id="chat-window" className="chat-window" style={{ position: 'relative', height: '100%' }}
                    onClick={hideMediaUploadView}>
                    {uiList}
                </section>

                <MediaUploadView sendMediaMessage={({ image, video, audio }) => {
                    sendMessage({ image, video, audio }); // empty
                }} />

                <div id='footer' className="chat-input" style={{ background: '#6cc4ea',  borderBottomRightRadius: '15px', border: 'none'}} onKeyDown={(e) => {
                    if (!e) e = window.event;
                    var keyCode = e.code || e.key;
                    if (keyCode === 'Enter') {
                        sendMessageFromInputBox();
                    }
                }}>

                    <button id='upload_media_button'
                        className='button'
                        style={{ float: 'left', border: 'none', background: '#6cc4ea' }}
                        onClick={toggleMediaUploadView} >
                        {/* <span> */}
                        <div style={{ background: '#6cc4ea' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" style={{ color: 'FFFFFF', float: 'center', marginLeft: '4px', width: '50px', height: '50px' }} fill="currentColor" className="bi bi-paperclip" viewBox="0 0 24 24">
                                <path d="M4.5 3a2.5 2.5 0 0 1 5 0v9a1.5 1.5 0 0 1-3 0V5a.5.5 0 0 1 1 0v7a.5.5 0 0 0 1 0V3a1.5 1.5 0 1 0-3 0v9a2.5 2.5 0 0 0 5 0V5a.5.5 0 0 1 1 0v7a3.5 3.5 0 1 1-7 0V3z" />
                            </svg>
                        </div>
                        {/* </span> */}
                    </button>

                    <RecordAudioModal
                        isOpen={recordAudioModalIsOpen}
                        closeModal={() => setRecordAudioModalIsOpen(false)}
                        sendAudio={({ audio }) => sendMessage({ audio: audio })}
                        getLastMessageID={getLastMessageID}
                    />

                    <button id='record_modal_button'
                        className='button'
                        // data-bs-toggle="modal" data-bs-target="#record_audio_modal"
                        style={{ float: 'left', border: 'none', background: '#6cc4ea' }}
                        onClick={() => setRecordAudioModalIsOpen(true)}
                    >
                        <div style={{ background: '#6cc4ea' }}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="42" height="44" fill="#FFFFFF" className="bi bi-mic-fill" viewBox="-1 -1 24 24">
                                <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
                                <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                            </svg>
                        </div>
                    </button>


                    {/* <span style={{padding:'10px'}}> */}
                    <input type="text" id='message_box' autoComplete="off" placeholder="Type a message"
                        style={{ marginTop: '4px', marginBottom: '5px' }} />
                    {/* </span> */}

                    <button onClick={sendMessageFromInputBox} style={{borderTopRightRadius: '15px'}}>
                        <svg style={{ width: 24, height: 24}} viewBox="0 0 24 24">
                            <path
                                fill="#6cc4ea"
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

