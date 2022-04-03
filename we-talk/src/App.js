import './App.css';
import LoginView from './login-view/LoginView';
import ChatInfo from './chat-list/ChatInfo'
import MainView from './main-view/MainView';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'


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
    <div style={{ width: '100%', height: '100%' }}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={
            <LoginView />

          }></Route>
          <Route path='/chat' element={
            <MainView selfInfo={'David'} activeContact={activeContact} setActiveContact={setActiveContact}></MainView>
          }></Route>
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
