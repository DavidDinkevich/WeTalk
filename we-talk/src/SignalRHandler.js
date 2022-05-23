import { HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect, useState } from "react";
import { handleNewMessage } from './chat-list/ChatList';
import { getActiveUser, getContactById, updateUserContacts } from './DataBase';


export let sendMessageSignalR;
export let addContactSignalR;
export let joinSignalRGroup;

function SignalRHandler() {
    // Connection handle
    const [ connection, setConnection ] = useState(null);
    sendMessageSignalR = msgText => {
        console.log("Sending: " + msgText)
        connection.invoke("SendMessage", msgText);
    }

    addContactSignalR = contact => {
        connection.invoke("AddContact", getActiveUser().id, contact);
    }

    joinSignalRGroup = () => {
        connection.invoke("JoinClientGroup", getActiveUser().id);
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
                    console.log("Got message: " + message)
                    updateUserContacts();                    
                    let msgJson = JSON.parse(message);
                    let sender = getContactById(msgJson.from);
                    if (sender != undefined)
                        handleNewMessage(false, sender);
                    let recipient = getContactById(msgJson.to);
                    if (recipient != undefined)
                        handleNewMessage(false, recipient);
                });

                connection.on('NewContact', contact => {
                    console.log("new contact " + contact)
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