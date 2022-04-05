// import {chats} from  "../App";
import ChatInfo from "../chat-list/ChatInfo";
import { contactList } from "../App";
import { addContact } from "../chat-list/ChatList";
import Message from "../message/Message";
import { Modal } from "react-bootstrap";
import { useState } from "react";

function SelfInfo({ name, refreshChatUIList }) {

    let [isOpen, setIsOpen] = useState(false);

    function addNewContact() {
        let input = document.getElementById('inputBox');
        if (input.value !== ''){
            let newContact = { name: input.value, image: '', messagesList: [] , time:''};
            addContact(newContact);
            setIsOpen(false);
        }
    }

    function CloseAddingWindow(){
        setIsOpen(false);
    }

    return (
        <div className="list-group-item col-xl-13 d-flex justify-content-between align-items-start" >
            <svg xmlns="http://www.w3.org/2000/svg" width="64" height="40" fill="currentColor" className="bi bi-person-circle" viewBox="0 0 16 16">
                <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                <path fillRule="evenodd" d="M0 8a8 8 0 1 1 16 0A8 8 0 0 1 0 8zm8-7a7 7 0 0 0-5.468 11.37C3.242 11.226 4.805 10 8 10s4.757 1.225 5.468 2.37A7 7 0 0 0 8 1z" />
            </svg>

            <div className="fw-bold" style={{ fontSize: '25px', paddingBottom: '6px', paddingRight: '0px' }}>{name}</div>

            <button className='button' onClick={() => {
                let input = prompt('search your contact:');
            }
            } style={{ border: 'none', background: 'white', paddingLeft: '40%' }} >

                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={17}
                    height={17}
                    fill="currentColor"
                    className="bi bi-search"
                    viewBox="0 0 16 16"
                >
                    <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z" />
                </svg>
            </button>

            <button className='button' onClick={() => {
                setIsOpen(true);
            }
            } style={{ border: 'none', background: 'white' }} >
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16" >
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                    </svg>
                </span>
            </button>

            <Modal id='add_contact' className="modal fade" aria-hidden="true" show={isOpen} style={{ position: 'absolute' }}>
                <Modal.Header>
                    <Modal.Title>Please enter the name of the contact:</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <div className="input-group flex-nowrap">
                        <span className="input-group-text" id="addon-wrapping"></span>
                        <input type="text" id="inputBox" className="form-control" placeholder="Name" aria-label="Please enter the name of the contact:" aria-describedby="addon-wrapping" required></input>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Modal.Title>
                        <button type="button" id='add_contact' className="btn btn-success" onClick={addNewContact}>Send</button>
                        <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={CloseAddingWindow}>Cancel</button>
                    </Modal.Title>
                </Modal.Footer>

            </Modal>
        </div>
    );
}



export default SelfInfo;