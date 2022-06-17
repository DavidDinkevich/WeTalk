import { HubConnectionBuilder } from '@microsoft/signalr';
import { useEffect, useState } from "react";
import { handleNewMessage, refreshUIChatList } from './chat-list/ChatList';
import { refreshMessagesList } from './chat-view/ChatView';
import { getActiveUser, getContactById, updateMessages, updateUserContacts, SERVER_NAME, getServerUrl } from './DataBase';
import { hideChatView, showChatView } from './main-view/MainView';


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
            .withUrl(getServerUrl() + `/Hubs/messageHub`)
      
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
                    let sender = getContactById(msgJson.from);
                    if (sender != undefined)
                        handleNewMessage(false, sender);
                    let recipient = getContactById(msgJson.to);
                    if (recipient != undefined)
                        handleNewMessage(false, recipient);
                });

                connection.on('NewContact', contact => {
                    console.log("sdfsdfsfsdfsdf")
                     updateUserContacts();
                     hideChatView();
                });

                connection.on('ReloadMessages', contact => {
                    updateUserContacts();
                    updateMessages(contact);
                });

                connection.on('ReloadContacts', () => {
                    updateUserContacts();                    
                    hideChatView();
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