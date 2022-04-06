// import {chats} from  "../App";
import { addContact } from "../chat-list/ChatList";
import { Modal } from "react-bootstrap";
import { useState } from "react";
import { getActiveUser, getContactByName } from "../DataBase";
import { getUserByName } from "../DataBase";

function ChatTitle({ activeContact }) {

    return (
        <div className="list-group-item col-xl-13 d-flex justify-content-between align-items-start">
            <img
                className="user-img"
                id="user-0"
                src={activeContact.image}
                alt='???'
                style={{ marginTop: "0", marginBottom: "0" }}
            />
            <div id="selfInfo name" className="fw-bold" style={{ fontSize: '25px', paddingBottom: '7px', textAlign: "center", marginTop: "1%", border:'thin' }}>{activeContact.name}</div>
        </div>
    );
}



export default ChatTitle;