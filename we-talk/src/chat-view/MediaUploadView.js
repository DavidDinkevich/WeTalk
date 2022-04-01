import {hideMediaUploadView} from './ChatView'
function MediaUploadView({ sendMediaMessage, getLastMessageID}) {

    /*
        When file upload button is clicked, programmatically click
        the invisible upload file textfield
    */

    const chooseFile = function (textField) {
        const textFieldElement = document.getElementById(textField);
        textFieldElement.click();
    }

    const sendImageOnChange = function() {
        const upload_image_textfield = document.getElementById("upload_image_textfield");
        let path = upload_image_textfield.value;

        if (path.length > 0) {
            var fReader = new FileReader();
            fReader.readAsDataURL(upload_image_textfield.files[0]);
            
            fReader.onloadend = function(event){
                sendMediaMessage(); // Send new empty message
                let lastMessage = document.getElementById(getLastMessageID());
                let image = document.createElement('img');
                image.src = event.target.result;
                image.alt = "Can't display image :/";
                image.className = "img-fluid";
                lastMessage.insertBefore(image, lastMessage.children[0]);
            }
        }
    }

    const sendVideoOnChange = function() {
        const upload_video_textfield = document.getElementById("upload_video_textfield");
        let path = upload_video_textfield.value;

        if (path.length > 0) {         
            var fReader = new FileReader();
            fReader.readAsDataURL(upload_video_textfield.files[0]);
            
            fReader.onloadend = function(event){
                sendMediaMessage(); // Send new empty message
                let lastMessage = document.getElementById(getLastMessageID());
                let video = document.createElement('video');
                video.className = 'img-fluid';
                video.controls = true;
                let source = document.createElement('source');
                source.src = event.target.result;
                // source.type = 'video/mp4';
                video.appendChild(source);
                lastMessage.insertBefore(video, lastMessage.children[0]);
            }
        }
    }

    const sendAudioOnChange = function() {
        const upload_audio_textfield = document.getElementById("upload_audio_textfield");
        let path = upload_audio_textfield.value;

        if (path.length > 0) {         
            var fReader = new FileReader();
            fReader.readAsDataURL(upload_audio_textfield.files[0]);
            
            fReader.onloadend = function(event){
                sendMediaMessage(); // Send new empty message
                let lastMessage = document.getElementById(getLastMessageID());
                let audio = document.createElement('audio');
                audio.className = 'msg_audio';
                audio.controls = true;
                let source = document.createElement('source');
                source.src = event.target.result;
                audio.appendChild(source);
                lastMessage.insertBefore(audio, lastMessage.children[0]);
            }
        }
    }

    return (
        <>
            {/* Invisible text field that can upload images */}
            <input type="file" id="upload_image_textfield" multiple accept="image/*" style={{ display: "none" }}
                onChange={() => {
                    sendImageOnChange();
                    hideMediaUploadView();
                }}></input>
            {/* Invisible text field that can upload videos */}
            <input type="file" id="upload_video_textfield" multiple accept="video/*" style={{ display: "none" }}
                onChange={() => {
                    sendVideoOnChange();
                    hideMediaUploadView();
                }}></input>
            {/* Invisible text field that can upload images */}
            <input type="file" id="upload_audio_textfield" multiple accept="audio/*" style={{ display: "none" }}
                onChange={() => {
                    sendAudioOnChange();
                    hideMediaUploadView();
                }}></input>

            <div className="btn-group-vertical" id='media_upload_view' style={{ position:'absolute', zIndex:'absolute', marginBottom: '20px', bottom:'8%', visibility: 'hidden', width: '60px', height: '240px' }}>
                <button id='img_upload' type="button" className="btn btn-outline-primary"
                    style={{ borderColor: '#7C79D5', margin: '10px', borderRadius: '15px 50px 30px' }}
                    onClick={() => chooseFile('upload_image_textfield')}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#7C79D5" className="bi bi-card-image" viewBox="0 0 16 16">
                        <path d="M6.002 5.5a1.5 1.5 0 1 1-3 0 1.5 1.5 0 0 1 3 0z" />
                        <path d="M1.5 2A1.5 1.5 0 0 0 0 3.5v9A1.5 1.5 0 0 0 1.5 14h13a1.5 1.5 0 0 0 1.5-1.5v-9A1.5 1.5 0 0 0 14.5 2h-13zm13 1a.5.5 0 0 1 .5.5v6l-3.775-1.947a.5.5 0 0 0-.577.093l-3.71 3.71-2.66-1.772a.5.5 0 0 0-.63.062L1.002 12v.54A.505.505 0 0 1 1 12.5v-9a.5.5 0 0 1 .5-.5h13z" />
                    </svg>
                </button>
                <button type="button" className="btn btn-outline-primary"
                    style={{ borderColor: '#7C79D5', margin: '10px', borderRadius: '15px 50px 30px' }}
                    onClick={() => chooseFile('upload_video_textfield')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#7C79D5" className="bi bi-camera-video" viewBox="0 0 16 16">
                        <path fillRule="evenodd" d="M0 5a2 2 0 0 1 2-2h7.5a2 2 0 0 1 1.983 1.738l3.11-1.382A1 1 0 0 1 16 4.269v7.462a1 1 0 0 1-1.406.913l-3.111-1.382A2 2 0 0 1 9.5 13H2a2 2 0 0 1-2-2V5zm11.5 5.175 3.5 1.556V4.269l-3.5 1.556v4.35zM2 4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h7.5a1 1 0 0 0 1-1V5a1 1 0 0 0-1-1H2z" />
                    </svg>
                </button>
                <button type="button" className="btn btn-outline-primary"
                    style={{ borderColor: '#7C79D5', margin: '10px', borderRadius: '15px 50px 30px' }}
                    onClick={() => chooseFile('upload_audio_textfield')}
                >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="#7C79D5" className="bi bi-mic" viewBox="0 0 16 16">
                        <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                        <path d="M10 8a2 2 0 1 1-4 0V3a2 2 0 1 1 4 0v5zM8 0a3 3 0 0 0-3 3v5a3 3 0 0 0 6 0V3a3 3 0 0 0-3-3z" />
                    </svg>

                </button>

            </div>
        </>

    );
}

export default MediaUploadView;