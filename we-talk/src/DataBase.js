

export const users = [
    {
        username: 'Shachar',
        password: '12345678sh',
        image: '/shachar_profile.png',
        contactList: [
            {
                name: 'Aviya', image: '/aviya_profile.png', messagesList: [
                    { source: 'remote', author: 'אביה', message: 'היי שחר!', image: '', video: '', audio: '', time: '11:05' },
                    { source: 'remote', author: 'אביה', message: 'מה קורה?', image: '', video: '', audio: '', time: '11:05' }], unread: 2
            },
            {
                name: 'Shir', image: '/photo-Shir.jpg', messagesList: [
                    { source: 'remote', author: 'Shir', message: '', image: '/bobsfog.jpg', video: '', audio: '', time: '09:33' },
                ], unread: 1
            },
            {
                name: 'David', image: '/david_profile.png', messagesList: [
                    { source: 'remote', author: 'David', message: '', image: '', video: '/myVideo.mp4', audio: '', time: '12:30' },
                ], unread: 1
            },
            
            {
                name: 'Noa', image: '/photo-noa.jpg', messagesList: [
                    { source: 'remote', author: 'Noa', message: '', image: '', video: '', audio: 'myRecord.ogg', time: '10:45' },
                ], unread: 1
            },
            {
                name: 'Lior', image: '/photo-lior.webp', messagesList: [
                    { source: 'remote', author: 'Lior', message: "What's up?", image: '', video: '', audio: '', time: '11:31' },
                ], unread: 1
            }

        ]
    },
    {
        username: 'Shir',
        password: 'shir12345',
        image: '/photo-Shir.jpg',
        contactList: []
    },
    {
        username: 'Noa',
        password: 'helloNoa1',
        image: '/photo-noa.jpg',
        contactList: []
    },
    {
        username: 'Lior',
        password: 'lior101010',
        image: '/photo-lior.webp',
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

export function addNewUser({name, password, image}) {
    users.push({username: name, password, image, contactList:[]});
   
    console.log(users);
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

export function getContactList(username) {
    return users.find((value) => { return value.username === username; }).contactList;
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
