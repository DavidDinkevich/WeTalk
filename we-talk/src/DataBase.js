


export const login = async function(username, password) {
    await fetch("https://localhost:7013/api/Users/contacts")
        .then(response => response.json())
        .then(data => console.log(data));
}





export const users = [
    {
        username: 'Shachar100',
        displayName: 'Shachar',
        password: '12345678sh',
        image: '/shachar_profile.png',
        contactList: [
            {
                name: 'Aviya', image: '/aviya_profile.png', messagesList: [
                    { source: 'remote', author: 'Aviya', message: 'היי שחר!', image: '', video: '', audio: '', time: '11:05:23' },
                    { source: 'remote', author: 'Aviya', message: 'מה קורה?', image: '', video: '', audio: '', time: '11:05:31' }], unread: 2
            },
            {
                name: 'Shir', image: '/photo-Shir.jpg', messagesList: [
                    { source: 'remote', author: 'Shir', message: '', image: '/bobsfog.jpg', video: '', audio: '', time: '09:33:55' },
                ], unread: 1
            },
            {
                name: 'David', image: '/david_profile.png', messagesList: [
                    { source: 'remote', author: 'David', message: '', image: '', video: '/myVideo.mp4', audio: '', time: '12:30:24' },
                ], unread: 1
            },
            
            {
                name: 'Noa', image: '/photo-noa.jpg', messagesList: [
                    { source: 'remote', author: 'Noa', message: '', image: '', video: '', audio: 'myRecord.ogg', time: '10:45:54' },
                ], unread: 1
            },
            {
                name: 'Lior', image: '/photo-lior.webp', messagesList: [
                    { source: 'remote', author: 'Lior', message: "What's up?", image: '', video: '', audio: '', time: '11:31:59' },
                ], unread: 1
            }

        ]
    },
    {
        username: 'ShirCohen3',
        displayName: 'Shir',
        password: 'shir12345',
        image: '/photo-Shir.jpg',
        contactList: []
    },
    {
        username: 'NoaAdler10',
        displayName: 'Noa',
        password: 'helloNoa1',
        image: '/photo-noa.jpg',
        contactList: []
    },
    {
        username: 'LiorBracha1998',
        displayName: 'Lior',
        password: 'lior101010',
        image: '/photo-lior.webp',
        contactList: []
    },
    {
        username: 'KerenPeles20',
        displayName: 'Keren',
        password: 'keren9090',
        image: '/photo-keren.webp',
        contactList: []
    },
    {
        username: 'NoamTur1',
        displayName: 'Noam',
        password: 'noam54321',
        image: '/photo-noam.jpg',
        contactList: []
    },
    {
        username: 'JoshFienstein7',
        displayName: 'Josh',
        password: '123123jjj',
        image: '/photo-josh.webp',
        contactList: []
    }
]

let activeUser = users[0];

export function getActiveUser() {
    return activeUser;
}

export function setActiveUser(name) {
    let index = users.findIndex((user) => {return user.username === name});
    activeUser = users[index];
}

export function addNewUser({username, displayName, password, image}) {
    users.push({username: username, displayName: displayName, password, image, contactList:[]});
}

export function getUserByName(name) {
    return users.find((element) => {
        return element.username === name
    });
}

export function getContactByName(contactName) {
    // return getContactList(activeUser).find((value) => value.name === contactName);
    return activeUser.contactList.find((value) => { return value.name === contactName; })
}

export function getContactList(displayName) {
    return users.find((value) => { return value.displayName === displayName; }).contactList;
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
