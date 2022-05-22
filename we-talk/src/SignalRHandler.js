import { HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect, useState } from "react";
import { handleNewMessage } from './chat-list/ChatList';
import { getActiveUser, getContactById, updateUserContacts } from './DataBase';


export let sendMessageSignalR;
export let addContactSignalR;
export let joinGroup;

function SignalRHandler() {
    // Connection handle
    const [ connection, setConnection ] = useState(null);
    sendMessageSignalR = msgText => {
        connection.invoke("SendMessage", msgText);
    }

    addContactSignalR = contact => {
        console.log("Sending: " + contact)
        connection.invoke("AddContact", getActiveUser().id, contact);
    }

    joinGroup = () => {
        console.log("Joining group: " + getActiveUser().id);
        connection.invoke("JoinClientGroup", getActiveUser().id);
        console.log("Joined group: " + getActiveUser().id);
    };

    useEffect(() => {
        const newConnection = new HubConnectionBuilder()
            .withUrl('https://localhost:7013/Hubs/messageHub')
      
            .withAutomaticReconnect()
            .build();
            
    
        setConnection(newConnection);
    }, []);


    useEffect(() => {
        if (connection) {
            connection.start().then(result => {

                connection.on('ReceivedMessage', message => {
                    console.log("SignalR here " + message)
                    updateUserContacts();                    
                    let msgJson = JSON.parse(message);
                    let sender = getContactById(msgJson.From);
                    if (sender != undefined)
                        handleNewMessage(false, sender);
                    let recipient = getContactById(msgJson.To);
                    if (recipient != undefined)
                        handleNewMessage(false, recipient);
                });

                connection.on('NewContact', contact => {
                    console.log(getActiveUser().id + " got new contact")
                     updateUserContacts();
                });

            })
            .catch(e => console.log('Connection failed :( ', e));
        }
    }, [connection]);


    return (
        <></>
    );

}

export default SignalRHandler;