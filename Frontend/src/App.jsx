import { useState } from 'react'
import './App.css'
import Sidebar from "./Sidebar.jsx";
import ChatWindow from './ChatWindow.jsx';
import { MyContext } from "./MyContext.jsx";
import {v1 as uuidv1} from "uuid";


function App() {
  const[prompt, setPrompt]=useState("");
  const[reply,setReply]=useState(null);
  const [currThreadId, setCurrThreadId]=useState(uuidv1());
  const [prevChats, setPrevChats] = useState([]);//store all chats 
  const[newChat,setNewChat]=useState(true);
  const[allThreads,setAllThreads]=useState([]);//stores the threads in an array
  const providerValue = {
  prompt, setPrompt,
    reply, setReply,
    currThreadId, setCurrThreadId,
    newChat, setNewChat,
    prevChats, setPrevChats,
    allThreads,setAllThreads
  };

  return (
    <div className='app'>
      <MyContext.Provider value={providerValue}>
        <Sidebar />
        <ChatWindow />
      </MyContext.Provider>
    </div>
  )
}

export default App;