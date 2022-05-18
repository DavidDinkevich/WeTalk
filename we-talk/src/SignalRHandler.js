import { HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect, useState } from "react";
import { handleNewMessage, refreshUIChatList } from './chat-list/ChatList';
import { refreshMessagesList } from './chat-view/ChatView';
import { getContactById, getContactByName, getContacts, updateMessages, updateUserContacts } from './DataBase';
import {showChatView} from '../src/main-view/MainView'


export let sendMessageSignalR;
export let addContactSignalR;

function SignalRHandler() {
    // Connection handle
    const [ connection, setConnection ] = useState(null);
    sendMessageSignalR = msgText => {
        connection.invoke("SendMessage", msgText);
    }

    addContactSignalR = contact => {
        connection.invoke("AddContact", contact);
    }

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
                    updateUserContacts();                    
                    let msgJson = JSON.parse(message);
                    let contact = getContactById(msgJson.to);
                    if (contact != undefined) {
                        handleNewMessage(false, contact);
                    }
                });

                connection.on('NewContact', contact => {
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