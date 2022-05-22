import { addContact } from "../chat-list/ChatList";
import { Modal } from "react-bootstrap";
import { useEffect, useState } from "react";
import { getActiveUser, postContactToServer, updateUserContacts, updateUserInfo } from "../DataBase";
import './self-info.css';

export let refreshSelfInfo;

function SelfInfo() {
    let [isOpen, setIsOpen] = useState(false);
    let [renderState, _refreshSelfInfo] = useState()
    refreshSelfInfo = () => _refreshSelfInfo(renderState + 1);

    useEffect(updateUserInfo, [1]);


    function addNewContact() {
        let contactID = document.getElementById('contactIdBox').value;
        let contactName = document.getElementById('contactNameBox').value;
        let ip = document.getElementById('ipBox').value;
        let port = document.getElementById('portBox').value;
        if (contactID !== '' && ip != '' && port != '') {
            if (postContactToServer({Id: contactID, Name: contactName, Server: `${ip}:${port}`})) {
                updateUserContacts();
                setIsOpen(false);
            } else {
                document.getElementById('messageContactNotRegistered').style.color = 'red';
                document.getElementById('messageContactNotRegistered').style.paddingLeft = "2%"
                document.getElementById('messageContactNotRegistered').innerHTML 
                                = "Contact is not registered or already exists";
            }

            // let contactInDataBase = getUserByName(input);
            // if (contactInDataBase != null && (getContactByName(input) == null) && (getContactByName(contactInDataBase.displayName) === undefined)) {
            //     let newContact = { name: contactInDataBase.displayName, image: contactInDataBase.image, messagesList: [], time: '' };
            //     addContact(newContact);
            //     setIsOpen(false);
            // } else {
            //     document.getElementById('messageContactNotRegistered').style.color = 'red';
            //     document.getElementById('messageContactNotRegistered').style.paddingLeft = "2%"
            //     document.getElementById('messageContactNotRegistered').innerHTML = "Contact is not registered or already exists";
            // }
        }
    }

    function closeAddingWindow() {
        setIsOpen(false);
    }

    let backImage = getActiveUser().image.length > 0 ? `url(${getActiveUser().image})` : 'url(anonymous_profile.webp)';

    return (
        <div className="list-group-item col-xl-13 d-flex justify-content-between align-items-start">
            <div className="thumb" style={{backgroundImage: backImage}}></div>

            <div id="selfInfo name" className="fw-bold self-info-name" >{getActiveUser().name}</div>

            <button className='button adding-contact-button' onClick={() => {
                setIsOpen(true);
            }
            }>
                <span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="25" height="25" fill="currentColor" className="bi bi-person-plus" viewBox="0 0 16 16" style={{ marginTop: "55%" }}>
                        <path d="M6 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm2-3a2 2 0 1 1-4 0 2 2 0 0 1 4 0zm4 8c0 1-1 1-1 1H1s-1 0-1-1 1-4 6-4 6 3 6 4zm-1-.004c-.001-.246-.154-.986-.832-1.664C9.516 10.68 8.289 10 6 10c-2.29 0-3.516.68-4.168 1.332-.678.678-.83 1.418-.832 1.664h10z" />
                        <path fillRule="evenodd" d="M13.5 5a.5.5 0 0 1 .5.5V7h1.5a.5.5 0 0 1 0 1H14v1.5a.5.5 0 0 1-1 0V8h-1.5a.5.5 0 0 1 0-1H13V5.5a.5.5 0 0 1 .5-.5z" />
                    </svg>
                </span>
            </button>

            <Modal id='add_contact' className="modal fade modal-add-contact" aria-hidden="true" show={isOpen}>
                <Modal.Header>
                    <Modal.Title>Enter a contact:</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="input-group flex-nowrap">
                        <div className="col">
                            <div className="col">
                                <input type="text" id="contactIdBox" className="form-control inner-add-contact-form" placeholder="Contact ID" required></input>
                                <input type="text" id="contactNameBox" className="form-control inner-add-contact-form" placeholder="Contact Name" required></input>
                                <input type="text" id="ipBox" className="form-control inner-add-contact-form" placeholder="IP" minLength="7" maxLength="15" size="15"></input>
                                <input type="number" id="portBox" className="form-control inner-add-contact-form" placeholder="Port" required></input>
                            </div>
                            <div className="col message-not-registered">
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