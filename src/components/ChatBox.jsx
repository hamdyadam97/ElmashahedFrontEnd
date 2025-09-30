import { useEffect, useState } from "react";
import { db } from "../firebase"; // ملف إعدادات firebase
import {
  collection,
  addDoc,
  serverTimestamp,
  query,
  orderBy,
  onSnapshot,
} from "firebase/firestore";

const ChatBox = ({ senderId, receiverId }) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  const chatId = [senderId, receiverId].sort().join("_"); // unique id for both users
  const messagesRef = collection(db, "chats", chatId, "messages");
console.log(receiverId,'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss')
console.log(senderId,'sssssssssssssssssssssssssssssssssssssssssssssssssssssssssssssss')
  useEffect(() => {
    const q = query(messagesRef, orderBy("timestamp", "asc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const msgs = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setMessages(msgs);
    });

    return () => unsubscribe();
  }, []);

  const sendMessage = async () => {
    if (!message.trim()) return;

    await addDoc(messagesRef, {
      text: message,
      senderId: senderId,
      receiverId: receiverId,
      timestamp: serverTimestamp(),
    });

    setMessage("");
  };

  return (
    <div className="border rounded p-4 max-w-md mx-auto bg-white">
      <div className="h-64 overflow-y-auto mb-4 border p-2">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`mb-2 ${
              msg.senderId === senderId ? "text-right" : "text-left"
            }`}
          >
            <div
              className={`inline-block px-3 py-2 rounded-lg ${
                msg.senderId === senderId
                  ? "bg-blue-100 text-blue-800"
                  : "bg-gray-100 text-gray-800"
              }`}
            >
              {msg.text}
            </div>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="flex-1 border p-2 rounded-l"
          placeholder="اكتب رسالتك..."
        />
        <button
          onClick={sendMessage}
          className="bg-blue-600 text-white px-4 rounded-r"
        >
          إرسال
        </button>
      </div>
    </div>
  );
};

export default ChatBox;
