import './App.css';
import LoginView from './login-view/LoginView';
import ChatInfo from './chat-list/ChatInfo'
import ChatList from './chat-list/ChatList'


function App() {
  const chats = [ 
    {name: 'Aviya', message: 'Is the best!'},
    {name: 'Shachar', message: 'Is the best!'},
  ];
  
  const chatInfos = chats.map((chatInfo, key) => {
    return <ChatInfo {...chatInfo} key={key}/>
  });
  
  return (
    <div>
      {/* <LoginView/> */}
      <ChatList chatInfos={chatInfos}/>
    </div>
  );
}

export default App;
