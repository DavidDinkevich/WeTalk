import './App.css';
import {LoginView, SignupView} from './login-view/LoginView';
import MainView from './main-view/MainView';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {getContactByName} from './DataBase'

function App() {
  let [activeContact, setActiveContact] = useState(getContactByName('Aviya'))
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
