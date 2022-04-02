/* eslint-disable no-fallthrough */
import { Modal } from "react-bootstrap"
import { useState } from 'react';
import { attachAudio } from "../message/Message";

// STOPWATCH
var stoptime = true;
let hr = 0;
let min = 0;
let sec = 0;

/*
    RECORDING MECHANICS
*/
const createRecorder = () =>
    new Promise(async resolve => {
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const mediaRecorder = new MediaRecorder(stream);
        const audioChunks = [];

        mediaRecorder.addEventListener("dataavailable", event => {
            audioChunks.push(event.data);
        });

        const start = () => mediaRecorder.start();

        const stop = () =>
            new Promise(resolve => {
                mediaRecorder.addEventListener("stop", () => {
                    const audioBlob = new Blob(audioChunks);
                    const audioUrl = URL.createObjectURL(audioBlob);
                    const audio = new Audio(audioUrl);
                    
                    
                    const play = () => audio.play();
                    const getURL = () => { return audioUrl; }
                    resolve({ audioBlob, audioUrl, getURL });
                });

                mediaRecorder.stop();
            });

        resolve({ start, stop });
    });

var recorder; // Global recorder object

function RecordAudioModal({isOpen, closeModal, sendMessage, getLastMessageID }) {
    let [recordingState, setRecordingState] = useState('none');
    let [timerText, setTimerText] = useState();

    function startRecording() {
        setRecordingState('recording');

        (async () => {
            recorder = await createRecorder();
            recorder.start();
        })();
    
        if (stoptime === true) {
            stoptime = false;
            timerCycle();
        }
    }
    function timerCycle() {
        if (stoptime === false) {
            sec = parseInt(sec);
            min = parseInt(min);
            hr = parseInt(hr);

            sec = sec + 1;

            if (sec === 60) {
                min = min + 1;
                sec = 0;
            }
            if (min === 60) {
                hr = hr + 1;
                min = 0;
                sec = 0;
            }

            if (sec < 10 || sec === 0)
                sec = '0' + sec;
            if (min < 10 || min === 0)
                min = '0' + min;
            if (hr < 10 || hr === 0)
                hr = '0' + hr;

            let text = hr + ':' + min + ':' + sec;
            setTimerText(text);
            let timerTextEl = document.getElementById('timer_text');
            timerTextEl.innerHTML = text;

            setTimeout(timerCycle, 1000);
        }
    }

    const pauseRecording = function () {
        setRecordingState('paused');
        stoptime = true;

        (async () => {
            const audio = await recorder.stop();
            sendMessage();
            attachAudio('self', audio.getURL(), getLastMessageID())
            // audio.play();
        })();
    }

    function resetTimer() {
        let timerTextEl = document.getElementById('timer_text');
        sec = min = hr = 0;
        setTimerText('00:00:00');
        timerTextEl.innerHTML = '00:00:00';
    }

    const toggleRecord = function () {
        toggleAnimation();

        switch (recordingState) {
            case 'none':
                let timerText = document.getElementById('timer_text');
                timerText.style.visibility = 'visible';
            case 'paused':
                startRecording();
                break;
            default:
                pauseRecording();

        }
    }

    const toggleAnimation = function () {
        let circleRipple = document.getElementById('circle_ripple');
        let circleRipple2 = document.getElementById('circle_ripple-2');
        if (circleRipple.style.visibility === 'hidden') {
            circleRipple.style.visibility = 'visible';
            circleRipple2.style.visibility = 'visible';
        }
        else {
            circleRipple.style.visibility = 'hidden';
            circleRipple2.style.visibility = 'hidden';
        }
    }

    return (
        <Modal id='record_audio_modal' className="modal fade" aria-hidden="true" show={isOpen} style={{position:'absolute'}}>
            <Modal.Header>
                <Modal.Title>Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4" style={{ width: '100%', minHeight: '15vh', height: '15vh', paddingLeft: '40%' }}>
                            <button style={{ height: '70%', padding: '0px', margin: '15px', background: 'inherit', border: 'none' }}
                                onClick={toggleRecord}>
                                <div className="box">
                                    <div id={"circle_ripple"} className="circle_ripple" style={{ visibility: 'hidden' }}></div>
                                    <div id={"circle_ripple-2"} className="circle_ripple-2" style={{ visibility: 'hidden' }}></div>
                                    <div className="circle">
                                        <div className="circle-2">
                                            <RecordButtonImage state={recordingState} />
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <p id={'timer_text'} style={{ textAlign: 'center', visibility: 'hidden' }}></p>
                </div>


            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={closeModal}>Cancel</button>
                <button type="button" className="btn btn-success">Send</button>
            </Modal.Footer>
        </Modal>

    );
}

function RecordButtonImage({ state }) {
    console.log('sdfsdfsdf');
    if (state === 'paused') {
        return (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#7ef996" className="bi bi-play" viewBox="-5 -4 24 24">
                    <path d="M10.804 8 5 4.633v6.734L10.804 8zm.792-.696a.802.802 0 0 1 0 1.392l-6.363 3.692C4.713 12.69 4 12.345 4 11.692V4.308c0-.653.713-.998 1.233-.696l6.363 3.692z" />
                </svg>
            </>
        );
    }
    else if (state === 'recording') {
        return (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#7ef996" className="bi bi-pause" viewBox="-4 -4 24 24">
                    <path d="M6 3.5a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5zm4 0a.5.5 0 0 1 .5.5v8a.5.5 0 0 1-1 0V4a.5.5 0 0 1 .5-.5z" />
                </svg>
            </>
        );
    } else {
        return (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" fill="#7ef996" className="bi bi-mic-fill" viewBox="-4 -4 24 24">
                    <path d="M5 3a3 3 0 0 1 6 0v5a3 3 0 0 1-6 0V3z" />
                    <path d="M3.5 6.5A.5.5 0 0 1 4 7v1a4 4 0 0 0 8 0V7a.5.5 0 0 1 1 0v1a5 5 0 0 1-4.5 4.975V15h3a.5.5 0 0 1 0 1h-7a.5.5 0 0 1 0-1h3v-2.025A5 5 0 0 1 3 8V7a.5.5 0 0 1 .5-.5z" />
                </svg>
                <i className="fa fa-microphone"></i>
            </>
        );

    }
}

export default RecordAudioModal;