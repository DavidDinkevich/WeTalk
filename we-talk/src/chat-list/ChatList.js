import { getContactList } from "../DataBase"
import ChatInfo from "./ChatInfo";
import { useState } from "react";
import { showChatView } from "../main-view/MainView";

export let addContact;
export let refreshUIChatList;

function zeroUnReadMessages(contact) {
    document.getElementById(contact.name + "unread messages").style.visibility = "hidden"
}

function ChatList({ activeContact, setActiveContact }) {
    let contactList = getContactList(activeContact.name);
    let [UIChatList, setUIChatList] = useState(contactList);

    refreshUIChatList = () => {
        // Force refresh of UIChatList
        setUIChatList(UIChatList.concat([]));
    }

    function displayActiveContact(newContact, activeContact, setActiveContact) {
        if (activeContact === newContact)
            return;
        setActiveContact(newContact);
    }


    addContact = function (newContact) {
        contactList.push(newContact);
        setUIChatList(UIChatList.concat([newContact]));
    };

    UIChatList = contactList;
    let chatInfos = UIChatList.map((contact, key) => {
        return (
            <button id='displayActiveContact' key={key} className='button' onClick={() => {
                displayActiveContact(contact, activeContact, setActiveContact);
                zeroUnReadMessages(contact);
                showChatView();
            }
            } >
                <ChatInfo contact={contact} />
            </button>
        );
    });
    return (
        <ul className="list-group list-group-unordered" style={{ margin: '0', padding: '0px', position: 'relative', width: '100%', height: "100%", overflowY: 'scroll',maxHeight:'80vh' }}>
            {chatInfos}
        </ul>
    );
}

export default ChatList;