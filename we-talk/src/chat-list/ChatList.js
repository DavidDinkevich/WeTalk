import { contactList } from "../App"
import ChatInfo from "./ChatInfo";
import { useState } from "react";

function displayActiveContact(contact, setActiveContact) {
    setActiveContact(contact);
}

export let addContact;

function ChatList({ setActiveContact }) {
    let [UIChatList, setUIChatList] = useState(contactList);

    addContact = function(newContact) {
        contactList.push(newContact);
        setUIChatList(UIChatList.concat([newContact]));
    };
    console.log("We're here!!")

    UIChatList = contactList;
    let chatInfos = UIChatList.map((contact, key) => {
        console.log("Test: " + contact)
        return (
            <button id='displayActiveContact' key={key}className='button' onClick={() => displayActiveContact(contact, setActiveContact)} >
                <ChatInfo contact={contact}  />
            </button>
        );
    });
    return (
        <ul className="list-group list-group-unordered" style={{ margin: '0', padding: '0px', position: 'relative', width: '100%', height: "100%", overflow: 'scroll' }}>
            {chatInfos}
        </ul>
    );
}

export default ChatList;