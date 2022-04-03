import {contactList} from "../App"
import ChatInfo from "./ChatInfo";
import { useState } from "react";

function displayActiveContact (contact, setActiveContact) {
    setActiveContact(contact);
}

function ChatList({ setActiveContact }) {
    let chatInfos = contactList.map((contact,key)=> {
        return (
            <button id='displayActiveContact' className='button' onClick={() => displayActiveContact(contact, setActiveContact)} >
                <ChatInfo contact={contact} key={key} />
            </button>
        );
    });
    return (
        <ul className="list-group list-group-unordered" style={{ margin: '0', padding:'0px', position: 'relative', width:'100%', height: "100%", overflow: 'scroll' }}>
            {chatInfos}
        </ul>
    );
}

export default ChatList;