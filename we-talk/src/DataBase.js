import { refreshUIChatList } from "./chat-list/ChatList";
import { refreshMessagesList } from "./chat-view/ChatView";
import { addContactSignalR, sendMessageSignalR } from "./SignalRHandler";
import { searchBox } from "./left-screen/chat-search/ChatSearch";
import { refreshSelfInfo } from "./self-info/SelfInfo";
import { useNavigate } from "react-router-dom";

export const SERVER_NAME = "127.0.0.1:7013"

const context = {
    currentUser: {
        id: '',
        name: '',
        password: '',
        image: '',
        contacts: []
    },
    messages: [],
    token: ''
}

export function getServerUrl() {
    return `https://${SERVER_NAME}`
}

export function formatTime(csTime) {
    // return csTime.substring(11, 16);
    return csTime;
}

export function formatTimeWithSeconds(csTime) {
    return csTime.substring(11, 19);
}


export let updateUserInfo;
export let updateUserContacts;
export let updateMessages;
export let postContactToServer;
export let postMessageToServer;

export function DataBase() {
    const navigate = useNavigate();

    updateUserInfo = async function () {
        await fetch(getServerUrl() + "/api/Users/info", {
            headers: {
                'Authorization': `Bearer ${context.token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                context.currentUser = Object.assign(context.currentUser, data);
                refreshSelfInfo();
            })
            .catch(err => {
                alert("Session has expired");
                navigate("/");
            });
    }
    
    updateUserContacts = async function () {
        await fetch(getServerUrl() + "/api/contacts", {
            headers: {
                'Authorization': `Bearer ${context.token}`
            }
        })
            .then(response => response.json())
            .then(data => {
                // context.currentUser.contacts = data;
                context.currentUser.contacts = data.filter((value) => {
                    return value.name.toLowerCase().includes(searchBox.current.value.toLowerCase());
                })
                refreshUIChatList();
            })
            .catch(err => {
                alert("Session has expired");
                navigate("/");
            });

    }
    
    updateMessages = async function (contactID) {
        await fetch(getServerUrl() + `/api/contacts/${contactID}/messages`, {
            headers: {
                'Authorization': `Bearer ${context.token}`
            }
        })
        .then(response => response.json())
        .then(data => {
            context.messages = data;
            refreshMessagesList();
        })
        .catch(err => {
            alert("Session has expired");
            navigate("/");
        });
    }
    
    postContactToServer = async function ({ id, name, server }) {
        const json = JSON.stringify({ id, name, server });
        const response = await fetch(getServerUrl() + '/api/contacts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: json
        });
        if (response.ok)
            addContactSignalR(json);
        else
            alert("Server is invalid or contact couldn't be found")

        return true;
    }
    
    postMessageToServer = async function ({ content, from, to }) {
        await fetch(getServerUrl() + '/api/contacts/' + to + '/messages', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${context.token}`
            },
            body: JSON.stringify({ content, from, to })
        }).then(() => {
            sendMessageSignalR(JSON.stringify({ content, from, to }));
        })
        .catch(err => {
            alert("Session has expired");
            navigate("/");
        });

        return true;
    }

    return <></>
}

export default DataBase;

export const login = async function (username, password, onSuccess, onFail) {
    const response = await fetch(getServerUrl() + "/api/login",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password })
        })
    if (!response.ok) {
        onFail();
    } else {
        context.token = await response.text();
        onSuccess();
    }
}

export const signup = async function (username, password, displayName, onSuccess, onFail) {
    console.log(JSON.stringify(
        {
            id: username, password, name: displayName,
            server: SERVER_NAME
        }))
    const response = await fetch(getServerUrl() + "/api/signup",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(
                {
                    Id: username, Password: password, Name: displayName,
                    Server: SERVER_NAME
                })
        })
    if (!response.ok) {
        onFail();
    } else {
        context.token = await response.text();
        onSuccess();
    }
}


export function getContacts() {
    return context.currentUser.contacts;
}

export function getActiveUser() {
    return context.currentUser;
}

export function getMessages() {
    return context.messages;
}

export function getMessageByID(messageID) {
    return context.messages.find((msg) => msg.id === messageID);
}


export function setActiveUser(name) {
    context.currentUser.id = name;
}
//---------------------------------


export function getContactByName(contactName) {
    // return getContactList(activeUser).find((value) => value.name === contactName);
    return context.currentUser.contacts.find((value) => { return value.name === contactName; })
}

export function getContactById(id) {
    return context.currentUser.contacts.find((value) => { return value.id === id; })
}


export const emptyMessageJSON = function () {
    return { source: '', author: '', message: '', image: '', video: '', audio: '' };
}

export function createMessageID(name, messageNumber) {
    return `${name}-${messageNumber}`;
}

export function getAccountNameFromMsgID(messageID) {
    return messageID.split('-')[0];
}

export function getMessageIndexFromMsgID(messageID) {
    return messageID.split('-')[1];
}

