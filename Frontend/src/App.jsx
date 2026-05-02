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
  const providerValue = {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setCurrThreadId
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