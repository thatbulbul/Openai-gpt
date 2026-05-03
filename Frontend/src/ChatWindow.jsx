import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { useContext, useState } from "react";
import { MyContext } from "./MyContext.jsx";
import { Bars } from "react-loader-spinner";

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    setPrevChats,
    setNewChat,
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);

  const getReply = async () => {
    if (!prompt.trim()) return;

    const userMessage = prompt; // store before clearing
    setLoading(true);

    try {
      console.log("Sending:", userMessage, currThreadId);

      const response = await fetch("http://localhost:8080/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: userMessage,
          threadId: currThreadId,
        }),
      });

      const data = await response.json();
      console.log("Response:", data);

      // ✅ update chat history
      setPrevChats((prev) => [
        ...prev,
        { role: "user", content: userMessage },
        { role: "assistant", content: data.reply },
      ]);

      setReply(data.reply);
      setPrompt(""); // clear input AFTER use
    } catch (err) {
      console.error("Error:", err);
    } finally {
      setLoading(false); // always stop loader
    }
  };

  // Send message on Enter
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
          <span>
            <i className="fa-regular fa-user"></i>
          </span>
        </div>
      </div>

      {/* Loader */}
      {loading && <Bars color="#f5f2f2" />}

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
          OwnGPT can make mistakes and would not agree. So Always verify important information.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;