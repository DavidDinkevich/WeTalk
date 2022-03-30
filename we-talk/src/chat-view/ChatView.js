import Message from '../message/Message';

const messagesList = [
    { source: 'remote', author: 'Shachar', message: 'I love coding!!'},
    { source: 'self', author: 'Shachar', message: 'I love coding!!'},
    // { author: 'Aviya', message: 'Me too!!!'},
    // { author: 'yo mama', message: 'sd;kfj;lkdajf;aklsdjf ;askdfj;sad f sadkjf sa;ldkjf as;lkdf j sa;dkfj s;alkdjf ;sdf sdfkj '},
    // { author: 'David', message: 'whaaat...???'},
    // { author: 'yo mama', message: 'sd;kfj;lkdajf;aklsdjf ;askdfj;sad f sadkjf sa;ldkjf as;lkdf j sa;dkfj s;alkdjf ;sdf sdfkj '},
    // { author: 'David', message: 'whaaat...???'},
    // { author: 'yo mama', message: 'sd;kfj;lkdajf;aklsdjf ;askdfj;sad f sadkjf sa;ldkjf as;lkdf j sa;dkfj s;alkdjf ;sdf sdfkj '},
    // { author: 'David', message: 'whaaat...???'},
    // { author: 'yo mama', message: 'sd;kfj;lkdajf;aklsdjf ;askdfj;sad f sadkjf sa;ldkjf as;lkdf j sa;dkfj s;alkdjf ;sdf sdfkj '},
    // { author: 'David', message: 'whaaat...???'},
    // { author: 'yo mama', message: 'sd;kfj;lkdajf;aklsdjf ;askdfj;sad f sadkjf sa;ldkjf as;lkdf j sa;dkfj s;alkdjf ;sdf sdfkj '},
    // { author: 'David', message: 'whaaat...???'},
    // { author: 'yo mama', message: 'sd;kfj;lkdajf;aklsdjf ;askdfj;sad f sadkjf sa;ldkjf as;lkdf j sa;dkfj s;alkdjf ;sdf sdfkj '},
    // { author: 'David', message: 'whaaat...???'} 
];

const UIMessageList = messagesList.map((message, key) => {
    return <Message {...message} key={key} />;
});

function ChatView() {
    return (
        <div style={{ position: 'relative', width: '100%', height: '100%', background: 'red' }}>
            <section className="chatbox" style={{ background: 'red', width: 'inherit'}}>
                <section className="chat-window" style={{ position: 'relative', height: '100%' }}>
                    {UIMessageList}
                </section> 

                <div id='footer' className="chat-input" onSubmit={() => console.log("hello")}>
                    <input type="text" autoComplete="on" placeholder="Type a message" />
                    <button onClick={() => console.log("hellooooo")}>
                        <svg style={{ width: 24, height: 24 }} viewBox="0 0 24 24">
                            <path
                                fill="rgba(0,0,0,.38)"
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