
function Message({ source, author, message, imgPath, messageID }) {
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
                    <div className="flr">
                        <div className="messages">
                            <p className="msg" id="msg-0">
                                {message}
                            </p>
                        </div>
                        <span className="timestamp" style={{ height: '100%' }}>
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

                    <div className="flr">
                    <img src="#" id={messageID} className="img-fluid" alt=""></img>
                        <div className="messages">

                            <InnerMessageContent text={message} imagePath={imgPath} />

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

function InnerMessageContent({ text, imagePath }) {
    return (
        <>
            <img src={ imagePath } alt={''} />
            {/* <br></br> */}
            <p className="msg" id="msg-1">
                {text}
            </p>
        </>

    );
}


