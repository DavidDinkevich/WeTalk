import './App.css';
import {LoginView, SignupView} from './login-view/LoginView';
import MainView from './main-view/MainView';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export const contactList = [
  { name: 'Aviya', image: '/logo192.png', messagesList: [{ source: 'remote', author: 'אביה', message: 'מה קורה?', image: '', video: '', audio: '', time:'11:05' }], unread: 1 },
  {
    name: 'Shachar', image: '/logo192.png', messagesList: [
      { source: 'remote', author: 'שחר מורשת', message: ' שלום!!!!', image: '', video: '', audio: '', time:'12:30'},
      { source: 'remote', author: 'שחר מורשת', message: 'איך אתה?', image: '', video: '', audio: '', time:'12:40'},
    ] , unread: 2
  }
];

export function getContactByName(name) {
  return contactList.find((value) => value.name === name);
}

function App() {
  let [activeContact, setActiveContact] = useState(contactList[0])
  // let activeContact = contactList[0];

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
          <Route path='/sign-up' element={ <SignupView />} />
        </Routes>
      </BrowserRouter>

    </div>
  );
}

export default App;
