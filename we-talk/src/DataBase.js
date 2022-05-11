import { refreshUIChatList } from "./chat-list/ChatList";
import { refreshMessagesList } from "./chat-view/ChatView";

let doQuery = true;

export const runQuery = function(query) {
    if (doQuery) {
        query();
        doQuery = false;
        console.log("false");
    } else
        doQuery = true;
        console.log("true");
}

export const login = async function(username, password) {
    // await fetch("https://localhost:7013/api/Users/contacts")
    //     .then(response => response.json())
    //     .then(data => console.log(data));
}

export const updateUserContacts = async function() {
    await fetch("https://localhost:7013/api/Users/contacts")
        .then(response => response.json())
        .then(data => {
            // contactList = data;
            context.currentUser.contacts = data;
            console.log(JSON.stringify(data));
            // runQuery( refreshUIChatList);
            refreshUIChatList();

            // setUIChatListHandle(contactList.concat([]));    
        });
}

export const updateMessages = async function(contactID) {
    console.log("Fetching, woof woof");
    await fetch(`https://localhost:7013/api/Chats/contacts/${contactID}/messages`)
            .then(response => response.json())
            .then(data => {
                context.messages = data;
                refreshMessagesList();
                console.log(context.messages);
            }
    );
}


const context = {
    currentUser: {
        id: '',
        name: '',
        password: '',
        image: '',
        contacts: []
    },
    messages: []
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

//---------------------------------

export function setActiveUser(name) {
    // let index = users.findIndex((user) => {return user.username === name});
    // activeUser = users[index];
}

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
