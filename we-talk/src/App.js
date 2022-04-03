import './App.css';
import LoginView from './login-view/LoginView';
import ChatInfo from './chat-list/ChatInfo'
import MainView from './main-view/MainView';

export const contactList = [
  {
    name: 'Shachar', image: '/logo192.png', messagesList: [
      { source: 'remote', author: 'שחר מורשת', message: 'יאו אני מתה לחזור לפרוייקט בתכנות!!!!' },
      { source: 'remote', author: 'שחר מורשת', message: 'את מרגישה ככה גם?' },
    ]
  },
  { name: 'Aviya', image: 'C:\pic.jpg', messagesList: [] },
];

function App() {
  let activeContact = contactList[0];
  const chatInfos = contactList.map((chatInfo, key) => {
    return <ChatInfo {...chatInfo} key={key} />
  });

  return (
    <div style={{width:'100%', height:'100%'}}>
       <LoginView/> 
      {/* <ChatList chatInfos={chatInfos}/> */}
  {/* <MainView selfInfo={'David'} activeContact={activeContact} /> */}

    </div>
  );
}

export default App;
