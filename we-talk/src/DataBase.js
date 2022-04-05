

export const users = [
    {
        username: 'David',
        contactList: [
            { 
                name: 'Aviya', image: '/logo192.png', messagesList: [{ source: 'remote', author: 'אביה', message: 'מה קורה?', image: '', video: '', audio: '', time: '11:05' }], unread: 1 },
            {
                name: 'Shachar', image: '/logo192.png', messagesList: [
                    { source: 'remote', author: 'שחר מורשת', message: ' שלום!!!!', image: '', video: '', audio: '', time: '12:30' },
                    { source: 'remote', author: 'שחר מורשת', message: 'איך אתה?', image: '', video: '', audio: '', time: '12:40' },
                ], unread: 2
            }
        ]
    }
]

let activeUser = users[0];

export function getActiveUser() {
    return activeUser;
}

export function getContactByName(contactName) {
    // return getContactList(activeUser).find((value) => value.name === contactName);
    return activeUser.contactList.find((value) => {return value.name === contactName; })
}

export function getContactList(username) {
    return users.find((value) => {return value.username === username; }).contactList;
}

export const emptyMessageJSON = function () {
    return { source: '', author: '', message: '', image: '', video: '', audio: '' };
}

export function createMessageID(name, messageNumber) {
    // console.log('creating message ID from: ' + messageNumber);
    return `${name}-${messageNumber}`;
}

export function getAccountNameFromMsgID(messageID) {
    return messageID.split('-')[0];
}

export function getMessageIndexFromMsgID(messageID) {
    return messageID.split('-')[1];
}
