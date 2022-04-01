

export const attachImage = function(source, img, messageID) {
    let lastMessage = document.getElementById(messageID);
    let image = document.createElement('img');
    image.src = img;
    image.alt = "Can't display image :/";
    image.className = "img-fluid";
    lastMessage.insertBefore(image, lastMessage.children[0]);
}

export const attachVideo = function(source, video, messageID) {
    let lastMessage = document.getElementById(messageID);
    let videoEl = document.createElement('video');
    videoEl.className = 'img-fluid';
    videoEl.controls = true;
    let sourceEl = document.createElement('source');
    sourceEl.src = video;
    // sourceEl.type = 'video/mp4';
    videoEl.appendChild(sourceEl);
    lastMessage.insertBefore(videoEl, lastMessage.children[0]);
}

export const attachAudio = function(source, audio, messageID) {
    let lastMessage = document.getElementById(messageID);
    let audioEl = document.createElement('audio');
    audioEl.className = 'msg_audio';
    audioEl.controls = true;
    let sourceEl = document.createElement('source');
    sourceEl.src = audio;
    audioEl.appendChild(sourceEl);
    lastMessage.insertBefore(audioEl, lastMessage.children[0]);
}

function Message({ source, author, message, messageID }) {
    // const messageSide = source === 'self' ? 'msg-self' : 'msg-remote';
    if (source === 'remote') {
        return (
            <article className="msg-container msg-remote">
                <div className="msg-box">
                    <img
                        className="user-img"
                        id="user-0"
                        src="//gravatar.com/avatar/00034587632094500000000000000000?d=retro"
                        alt='???'
                    />
                    <div id={messageID} className="flr">
                        <div className="messages">
                            <p className="msg" id="msg-0">
                                {message}
                            </p>
                        </div>
                        <span className="timestamp">
                            <span className="username">{author}</span>•
                            <span className="posttime">Now</span>
                        </span>

                    </div>
                </div>
            </article>
        );
    } else {
        return (
            <article className="msg-container msg-self">
                <div className="msg-box">
                    <div id={messageID} className="flr">
                        <div className="messages">
                            {/* <img src='/logo192.png' ></img> */}
                            <p className="msg" id="msg-1">
                                {message}
                            </p>

                        </div>
                        <span className="timestamp">
                            <span className="username">{author}</span>•
                            <span className="posttime">Now</span>
                        </span>
                    </div>
                    <img
                        className="user-img"
                        id="user-0"
                        src="//gravatar.com/avatar/56234674574535734573000000000001?d=retro"
                        alt='???'
                    />
                </div>
            </article>
        );
    }
}

export default Message;

