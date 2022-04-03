import './App.css';
import LoginView from './login-view/LoginView';
import ChatInfo from './chat-list/ChatInfo'
import MainView from './main-view/MainView';
import { useState } from 'react';

export const contactList = [
  { name: 'Aviya', image: 'C:\pic.jpg', messagesList: [{ source: 'remote', author: 'אביה', message: 'מה קורה?' }] },
  {
    name: 'Shachar', image: '/logo192.png', messagesList: [
      { source: 'remote', author: 'שחר מורשת', message: ' שלום!!!!' },
      { source: 'remote', author: 'שחר מורשת', message: 'איך אתה?' },
    ]
  },
  
];

function App() {
  let [activeContact, setActiveContact] = useState(contactList[0])
  // let activeContact = contactList[0];
  const chatInfos = contactList.map((chatInfo, key) => {
    return <ChatInfo {...chatInfo} key={key} />
  });

  return (
    <div style={{width:'100%', height:'100%'}}>
       <LoginView/> 
      {/* <ChatList chatInfos={chatInfos}/> */}
<<<<<<< HEAD
  {/* <MainView selfInfo={'David'} activeContact={activeContact} /> */}
=======
      <MainView selfInfo={'David'} activeContact={activeContact} setActiveContact={setActiveContact} />
>>>>>>> 8ad66b3809342db59617bf51cd9b7812ed84dd8e

    </div>
  );
}

export default App;
