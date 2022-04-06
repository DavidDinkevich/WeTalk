import './record-audio-modal.css'

import { Modal } from "react-bootstrap"
import { useState } from 'react';
import './record-button.css'

// STOPWATCH
var stoptime = true;
let hr = 0;
let min = 0;
let sec = -1;

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
                    resolve({ audioBlob, audioUrl });
                });

                if (mediaRecorder !== undefined && mediaRecorder.state !== 'inactive')
                    mediaRecorder.stop();

                stream.getTracks().forEach((t) => t.stop());
            });

        resolve({ start, stop });
    });

var recorder; // Global recorder object
let audio;

function RecordAudioModal({ isOpen, closeModal, sendAudio, getLastMessageID }) {
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
            let timerTextEl = document.getElementById('timer_text');
            if (timerTextEl !== null) {
                setTimerText(text);
                timerTextEl.innerHTML = text;

                setTimeout(timerCycle, 1000);
            }
        }
    }

    const pauseRecording = function () {
        setRecordingState('none');
        stoptime = true;

        (async () => {
            if (recorder !== undefined && recorder !== null && recorder.state !== 'inactive')
                audio = await recorder.stop();
        })();
    }

    function resetTimer() {
        let timerTextEl = document.getElementById('timer_text');
        min = hr = 0;
        sec = -1;
        setTimerText('00:00:00');
        timerTextEl.innerHTML = '00:00:00';
    }

    const toggleRecord = function () {
        toggleAnimation();

        let timerText = document.getElementById('timer_text');
        let sendButton = document.getElementById('send_recording_button');
        switch (recordingState) {
            case 'none':
                timerText.style.visibility = 'visible';
                sendButton.disabled = true;
                resetTimer();
                startRecording();
                break;
            case 'recording':
                sendButton.disabled = false;
                pauseRecording();
                break;
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

    const handleCloseModal = function () {
        pauseRecording();
        closeModal();
        resetTimer();
        recorder = null;
    }

    const sendRecording = function () {
        if (sec + min + hr !== -1) {
            sendAudio({audio: audio.audioUrl})

            handleCloseModal();
        }
    }


    return (
        <Modal id='record_audio_modal' className="modal fade record-audio-modal-window" aria-hidden="true" show={isOpen}>
            <Modal.Header>
                <Modal.Title>Record</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="container">
                    <div className="row">
                        <div className="col-md-4 col-md-offset-4" style={{ width: '100%', minHeight: '15vh', height: '15vh', paddingLeft: '40%' }}>
                            <button class='record-audio-modal-container'
                                onClick={toggleRecord}>
                                <div className="box">
                                    <div id={"circle_ripple"} className="circle_ripple record-audio-modal-circle"></div>
                                    <div id={"circle_ripple-2"} className="circle_ripple-2 record-audio-modal-circle"></div>
                                    <div className="circle">
                                        <div className="circle-2">
                                            <RecordButtonImage state={recordingState} />
                                        </div>
                                    </div>
                                </div>
                            </button>
                        </div>
                    </div>
                    <p id={'timer_text'} class='record-audio-modal-timer'></p>
                </div>


            </Modal.Body>
            <Modal.Footer>
                <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={handleCloseModal}>Cancel</button>
                <button type="button" id='send_recording_button' className="btn btn-success" onClick={sendRecording}>Send</button>
            </Modal.Footer>
        </Modal>

    );
}

function RecordButtonImage({ state }) {
    if (state === 'recording') {
        return (
            <>
                <svg xmlns="http://www.w3.org/2000/svg" width="25" height="50" fill="#7ef996" className="bi bi-square-fill" viewBox="-4 -8 24 30">
                    <path d="M0 2a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2z" />
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
