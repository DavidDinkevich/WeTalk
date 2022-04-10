import './chat-list.css'

import { getActiveUser, getContactList } from "../DataBase"
import ChatInfo from "./ChatInfo";
import { useState } from "react";
import { showChatView } from "../main-view/MainView";

export let addContact;
export let setUIChatList;
export let refreshUIChatList;

function zeroUnReadMessages(contact) {
    document.getElementById(contact.name + "unread messages").style.visibility = "hidden";
}

function ChatList({ activeContact, setActiveContact }) {
    let contactList = getContactList(getActiveUser().displayName);
    let [UIChatList, setUIChatListHandle] = useState(contactList);

    const sortContactsByTime = function() {
        UIChatList.sort((a, b) => {
            if (a.messagesList.length === 0)
                return -1;
            if (b.messagesList.length === 0)
                return 1;
            let lastMessageTimeA = a.messagesList[a.messagesList.length - 1].time;
            let lastMessageTimeB = b.messagesList[b.messagesList.length - 1].time;
            let hoursA = lastMessageTimeA.split(":")[0];
            let minutesA = lastMessageTimeA.split(":")[1];
            let hoursB = lastMessageTimeB.split(":")[0];
            let minutesB = lastMessageTimeB.split(":")[1];
            return (hoursB - hoursA) * 60 + (minutesB- minutesA);
        });
    }

    refreshUIChatList = () => {
        // sortContactsByTime();
        // Force refresh of UIChatList
        setUIChatListHandle(UIChatList.concat([]));
    }
    setUIChatList = (value) => {
        // sortContactsByTime();
        setUIChatListHandle(value); 
    }

    function displayActiveContact(newContact, activeContact, setActiveContact) {
        if (activeContact === newContact)
            return;
        setActiveContact(newContact);
    }


    addContact = function (newContact) {
        contactList.push(newContact);
        UIChatList = contactList;
        refreshUIChatList();
    };

    sortContactsByTime();

    let chatInfos = UIChatList.map((contact, key) => {
        return (
            <button id='displayActiveContact' key={key} className='button chat-info-button-container'
        
            onClick={() => {
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
        <ul className="list-group list-group-unordered chat-list">
            {chatInfos}
        </ul>
    );
}

export default ChatList;