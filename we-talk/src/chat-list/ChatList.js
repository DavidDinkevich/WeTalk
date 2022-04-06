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
    let contactList = getContactList(getActiveUser().username);
    let [UIChatList, setUIChatListHandle] = useState(contactList);

    refreshUIChatList = () => {
        // Force refresh of UIChatList
        setUIChatListHandle(UIChatList.concat([]));
        console.log(UIChatList);
    }
    setUIChatList = (value) => {
        console.log('setting')
        setUIChatListHandle(value); 
    }

    function displayActiveContact(newContact, activeContact, setActiveContact) {
        if (activeContact === newContact)
            return;
        setActiveContact(newContact);
    }


    addContact = function (newContact) {
        contactList.push(newContact);
        setUIChatListHandle(UIChatList.concat([newContact]))
        console.log(newContact);
        // refreshUIChatList();
    };

    let chatInfos = UIChatList.map((contact, key) => {
        return (
            <button id='displayActiveContact' key={key} className='button' 
            style={{padding:'0px', margin:'0px', borderTop:'none', borderRight:'none', borderLeft:'none', borderColor:'#e8e6e1', borderBottomWidth:'thin'}}
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
        <ul className="list-group list-group-unordered" 
        style={{ margin: '0', padding: '0px', margin:'0px', position: 'relative', width: '100%', height: "100%", overflowY: 'scroll',maxHeight:'80vh', background:'inherit' }}>
            {chatInfos}
        </ul>
    );
}

export default ChatList;