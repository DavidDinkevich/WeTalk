// import {chats} from  "../App";
import { addContact } from "../chat-list/ChatList";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { getActiveUser, getContactByName } from "../DataBase";
import { getUserByName } from "../DataBase";

function SelfInfo() {

    let [isOpen, setIsOpen] = useState(false);

    function addNewContact() {
        let input = document.getElementById('inputBox');
        input = input.value;
        if (input !== '') {
            let contactInDataBase = getUserByName(input);
            if (contactInDataBase != null && (getContactByName(input) == null)) {
                let newContact = { name: contactInDataBase.username, image: contactInDataBase.image, messagesList: [], time: '' };
                addContact(newContact);
                setIsOpen(false);
            } else {
                document.getElementById('messageContactNotRegistered').style.color = 'red';
                document.getElementById('messageContactNotRegistered').style.paddingLeft = "2%"
                document.getElementById('messageContactNotRegistered').innerHTML = "Contact is not registered or already exists";
            }
        }
    }

    function closeAddingWindow() {
        setIsOpen(false);
    }

    return (
        <div className="list-group-item col-xl-13 d-flex justify-content-between align-items-start">
            <img
                className="user-img"
                id="user-0"
                src={getActiveUser().image}
                alt='???'
                style={{ height: "95%", width: "18%", marginTop: "1%", marginBottom: "0" }}
            />

            <div id="selfInfo name" className="fw-bold" style={{ fontSize: '25px', paddingBottom: '6px', paddingRight: '0px', textAlign: "center", marginTop: "3%" }}>{getActiveUser().username}</div>

            <button className='button' onClick={() => {
                setIsOpen(true);
            }
            } style={{ border: 'none', background: 'white' }} >
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16" style={{ marginTop: "55%" }}>
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                    </svg>
                </span>
            </button>

            <Modal id='add_contact' className="modal fade" aria-hidden="true" show={isOpen} style={{ position: 'absolute' }}>
                <Modal.Header>
                    <Modal.Title>Enter a contact:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input-group flex-nowrap">
                        <div className="col">
                            <div className="col">
                                <input type="text" id="inputBox" className="form-control" placeholder="Name"
                                    onKeyUp={(e) => {
                                        if (!e) e = window.event;
                                        var keyCode = e.code || e.key;
                                        if (keyCode === 'Enter') {
                                            addNewContact();
                                        }
                                    }} required></input>
                            </div>
                            <div className="col" style={{ paddingTop: '10px' }}>
                                <span id='messageContactNotRegistered'></span>
                            </div>
                        </div>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <button type="button" className="btn btn-danger" data-bs-dismiss="modal" onClick={closeAddingWindow}>Cancel</button>
                    <button type="button" id='add_contact' className="btn btn-success" onClick={addNewContact}>Add</button>
                </Modal.Footer>

            </Modal>
        </div>
    );
}



export default SelfInfo;