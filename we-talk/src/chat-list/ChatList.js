import './chat-list.css'

import { getActiveUser, updateMessages, updateUserContacts } from "../DataBase"
import ChatInfo from "./ChatInfo";
import {  useEffect, useState } from "react";
import { showChatView } from "../main-view/MainView";

export let addContact;
export let setUIChatList;
export let refreshUIChatList;

function zeroUnReadMessages(contact) {
    document.getElementById(contact.name + "unread messages").style.visibility = "hidden";
}

function ChatList({ setActiveContact }) {
    useEffect(updateUserContacts, [1]);

    let contactList = getActiveUser().contacts;
    let [UIChatList, setUIChatListHandle] = useState(contactList);
    UIChatList = contactList;

    const sortContactsByTime = function() {
        console.log(UIChatList)
        UIChatList.sort((a, b) => {
            if (a.lastMessage == null)
                return -1;
            if (b.lastMessage == null)
                return 1;
            let lastMessageTimeA = a.lastMessage.time;
            let lastMessageTimeB = b.lastMessage.time;
            let hoursA = lastMessageTimeA.split(":")[0];
            let minutesA = lastMessageTimeA.split(":")[1];
            let secondsA = lastMessageTimeA.split(":")[2];
            let hoursB = lastMessageTimeB.split(":")[0];
            let minutesB = lastMessageTimeB.split(":")[1];
            let secondsB = lastMessageTimeB.split(":")[2];

            return (hoursB - hoursA) * 60 * 60 + (minutesB - minutesA) * 60 + (secondsB - secondsA);
        });
    }

    refreshUIChatList = () => {
        // sortContactsByTime();
        // Force refresh of UIChatList
        //--------------------------------------------
        if (UIChatList.length > 0) {
            for (var i in UIChatList) {
                if (UIChatList[i].lastMessage != null && UIChatList[i].lastMessage.length > 0) {
                    displayActiveContact(UIChatList[i]);
                    break;
                }
            }
        }
        sortContactsByTime();

        setUIChatListHandle(UIChatList.concat([]));
    }
    setUIChatList = (value) => {
        // sortContactsByTime();
        setUIChatListHandle(value); 
    }

    function displayActiveContact(newContact) {
        for (let i in getActiveUser().contacts) {
            let name = getActiveUser().contacts[i].name;
            let oldContactButton = document.getElementById(`contact_button_${name}`);
            if (oldContactButton != null)
                oldContactButton.style.background = 'white';
        }
        let newContactButton = document.getElementById(`contact_button_${newContact.name}`);
        if (newContactButton != null)
            newContactButton.style.background = '#DDDDDD';      
        zeroUnReadMessages(newContact);
    }


    addContact = function (newContact) {
        contactList.push(newContact);
        UIChatList = contactList;
        refreshUIChatList();
    };

    sortContactsByTime();


    let chatInfos = UIChatList.map((contact, key) => {
        return (
            <button id={`contact_button_${contact.name}`} key={key} className='button chat-info-button-container'
        
            onClick={() => {
                
                setActiveContact(contact);
                displayActiveContact(contact);
                updateUserContacts();
                updateMessages(contact.id)
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