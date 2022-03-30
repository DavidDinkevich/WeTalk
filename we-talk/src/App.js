import './App.css';
import LoginView from './login-view/LoginView';
import ChatInfo from './chat-list/ChatInfo'
import MainView from './main-view/MainView';

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
      {/* <ChatList chatInfos={chatInfos}/> */}
      <MainView chatList={chatInfos} selfInfo='David' />
    </div>
  );
}

export default App;
