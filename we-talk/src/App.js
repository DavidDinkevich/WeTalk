import './App.css';
import {LoginView, SignupView} from './login-view/LoginView';
import MainView from './main-view/MainView';
import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import {getContactByName} from './DataBase'
import SignalRHandler from './SignalRHandler';
import DataBase from './DataBase';

export let activeContact;

function App() {
  let [_activeContact, setActiveContact] = useState(getContactByName('Aviya'))
  activeContact = _activeContact;

  return (
    <div style={{ width: '100%', height: '100%' }}>
      <SignalRHandler activeContact={activeContact}/>
      <BrowserRouter>
        <DataBase />
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
