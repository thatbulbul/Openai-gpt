import "./Chat.css";
import { useContext } from "react";
import { MyContext } from "./MyContext.jsx";
import ReactMarkdown from "react-markdown";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github-dark.css";
import React from "react";
function Chat() {
  const { newChat, prevChats } = useContext(MyContext);
  return (
    <>
      {(prevChats.length === 0) && <h1>Start with a new Chat!</h1>}
      <div className="chats">
        {prevChats?.map((chat, idx) => (
          <div
            className={chat.role === "user" ? "userDiv" : "gptDiv"}
            key={idx}
          >
            {chat.role === "user" ? 
              <p className="userMessage">{chat.content}</p>
            : 
            <ReactMarkdown rehypePlugins={[rehypeHighlight]}>{chat.content}</ReactMarkdown>
            }
          </div>
        ))}
        {/* <div className="userDiv">
                <p className='userMessage'>User Message</p>
            </div>
            <div className="gptDiv">
                <p className="gptMessage">Gpt generated Message</p>
            </div> */}
      </div>
    </>
  );
}

export default Chat;
