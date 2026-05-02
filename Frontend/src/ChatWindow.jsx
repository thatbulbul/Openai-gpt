import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { useContext } from "react";
import { MyContext } from "./MyContext.jsx";

function ChatWindow() {
  const { prompt, setPrompt, reply, setReply, currThreadId } = useContext(MyContext);

  const getReply = async () => {
    if (!prompt.trim()) return; 

    try {
      console.log("Sending:", prompt, currThreadId);

      const response = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: prompt,
          threadId: currThreadId
        })
      });

      const data = await response.json();
      console.log("Response:", data);

      setReply(data.reply);   
      setPrompt("");          

    } catch (err) {
      console.error("Error:", err);
    }
  };

 
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      getReply();
    }
  };

  return (
    <div className="chatWindow">
      
      {/* Navbar */}
      <div className="navbar">
        <span>
          OwnGPT <i className="fa-solid fa-chevron-down"></i>
        </span>
        <div className="userIconDiv">
          <span><i className="fa-regular fa-user"></i></span>
        </div>
      </div>

      {/* Chat Messages */}
      <Chat />

      {/* Input Section */}
      <div className="chatInput">
        <div className="inputBox">
          <input
            placeholder="Ask Anything, Anytime"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={handleKeyDown}
          />

          <div id="submit" onClick={getReply}>
            <i className="fa-regular fa-paper-plane"></i>
          </div>
        </div>

        <p className="info">
          OwnGPT can make mistake but would not agree. So Check important info.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;