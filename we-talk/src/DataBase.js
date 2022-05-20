import { refreshUIChatList } from "./chat-list/ChatList";
import { refreshMessagesList } from "./chat-view/ChatView";
import { addContactSignalR, sendMessageSignalR } from "./SignalRHandler";
import { searchBox } from "./left-screen/chat-search/ChatSearch";
import { refreshSelfInfo } from "./self-info/SelfInfo";


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

export const login = async function(username, password, onSuccess, onFail) {
    const response = await fetch("https://localhost:7013/api/login",
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({username, password})
        })
    if (!response.ok) {
        onFail();
    } else {
        context.token = await response.text();
        onSuccess();
    }
}

export const updateUserInfo = async function() {
    await fetch("https://localhost:7013/api/Users/info", {
        headers: {
            'Authorization': `Bearer ${context.token}`
        }
    })
        .then(response => response.json())
        .then(data => {
            context.currentUser = Object.assign(context.currentUser, data);
            console.log(context.currentUser)
            refreshSelfInfo();
        });
}

export const updateUserContacts = async function() {
    await fetch("https://localhost:7013/api/Users/contacts", {
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
            console.log(context.currentUser.contacts)
            refreshUIChatList();
        });
}

export const updateMessages = async function(contactID) {
    await fetch(`https://localhost:7013/api/Users/contacts/${contactID}/messages`, {
                headers: {
                    'Authorization': `Bearer ${context.token}`
                }
            })
            .then(response => response.json())
            .then(data => {
                context.messages = data;
                refreshMessagesList();
            }
    );
}


export const postContactToServer = async function({id, name, server}) {
    await fetch('https://localhost:7013/api/Users/contacts', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.token}`
        },
        body: JSON.stringify({id, name, server})
    }).then(() => {
    addContactSignalR(JSON.stringify({id, name, server}));
});
    return true;
}

export const postMessageToServer = async function({content, from, to}) {
    await fetch('https://localhost:7013/api/Users/contacts/'+to+'/messages', {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${context.token}`
        },
        body: JSON.stringify({content, from, to})
    }).then(() => {
        sendMessageSignalR(JSON.stringify({content, from, to}));
    });
    return true;
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
    // let index = users.findIndex((user) => {return user.username === name});
    // activeUser = users[index];
}
//---------------------------------

export function addNewUser({username, displayName, password, image}) {
    // users.push({username: username, displayName: displayName, password, image, contacts:[]});
}

export function getUserByName(name) {
    // return users.find((element) => {
        // return element.username === name
    // });
}

export function getContactByName(contactName) {
    // return getContactList(activeUser).find((value) => value.name === contactName);
    return context.currentUser.contacts.find((value) => { return value.name === contactName; })
}

export function getContactById(id) {
    return context.currentUser.contacts.find((value) => { return value.id === id; })
}


export function getContactList(displayName) {
    // return users.find((value) => { return value.displayName === displayName; }).contacts;
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

