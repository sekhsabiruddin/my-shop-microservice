// "use client";
// import { useState } from "react";
// import { User, Smile, Paperclip, Send } from "lucide-react";

// export default function Inbox() {
//   const [activeChat, setActiveChat] = useState("John Doe");
//   const [message, setMessage] = useState("");
//   const [chatHistory, setChatHistory] = useState({
//     "John Doe": [{ sender: "user", text: "Hi John!" }],
//     "Alice Smith": [],
//     "David Brown": [],
//     "Sophia Lee": [],
//   });

//   const users = [
//     {
//       name: "John Doe",
//       status: "online",
//       img: "https://randomuser.me/api/portraits/men/32.jpg",
//     },
//     { name: "Alice Smith", status: "offline", img: null },
//     {
//       name: "David Brown",
//       status: "online",
//       img: "https://randomuser.me/api/portraits/men/44.jpg",
//     },
//     { name: "Sophia Lee", status: "online", img: null },
//   ];

//   const handleSend = () => {
//     if (!message.trim()) return;

//     setChatHistory((prev) => ({
//       ...prev,
//       [activeChat]: [
//         ...(prev[activeChat] || []),
//         { sender: "admin", text: message },
//       ],
//     }));
//     setMessage("");
//   };

//   return (
//     <div className="flex h-screen bg-gray-900 text-white">
//       {/* Sidebar */}
//       <div className="w-1/4 bg-gray-800 border-r border-gray-700 overflow-y-auto">
//         <h2 className="text-xl font-bold p-4 border-b border-gray-700">
//           Inbox
//         </h2>
//         <ul>
//           {users.map((user, index) => (
//             <li
//               key={index}
//               onClick={() => setActiveChat(user.name)}
//               className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-700 transition ${
//                 activeChat === user.name ? "bg-purple-600" : ""
//               }`}
//             >
//               {/* Avatar */}
//               {user.img ? (
//                 <img
//                   src={user.img}
//                   alt={user.name}
//                   className="w-10 h-10 rounded-full object-cover mr-3"
//                 />
//               ) : (
//                 <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mr-3">
//                   <User size={20} className="text-gray-300" />
//                 </div>
//               )}

//               {/* Name + Status */}
//               <div className="flex-1">
//                 <p className="text-sm font-medium">{user.name}</p>
//                 <p className="text-xs text-gray-400">
//                   {user.status === "online" ? "Online" : "Offline"}
//                 </p>
//               </div>

//               {/* Status Dot */}
//               <span
//                 className={`w-3 h-3 rounded-full ${
//                   user.status === "online" ? "bg-green-500" : "bg-gray-500"
//                 }`}
//               ></span>
//             </li>
//           ))}
//         </ul>
//       </div>

//       {/* Chat Section */}
//       <div className="flex-1 flex flex-col">
//         {/* Header */}
//         <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
//           <h2 className="text-lg font-semibold">{activeChat}</h2>
//           <span className="text-sm text-green-400">Chatting</span>
//         </div>

//         {/* Chat History */}
//         <div className="flex-1 p-6 space-y-4 overflow-y-auto">
//           {chatHistory[activeChat]?.map((msg, i) => (
//             <div
//               key={i}
//               className={`max-w-xs p-3 rounded-xl ${
//                 msg.sender === "admin" ? "bg-purple-600 ml-auto" : "bg-gray-700"
//               }`}
//             >
//               {msg.text}
//             </div>
//           ))}
//         </div>

//         {/* Input */}
//         <div className="p-4 bg-gray-800 border-t border-gray-700 flex items-center gap-3">
//           <Smile size={22} className="text-gray-400 hover:text-white" />
//           <Paperclip size={22} className="text-gray-400 hover:text-white" />
//           <input
//             type="text"
//             placeholder="Type a message..."
//             value={message}
//             onChange={(e) => setMessage(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//             className="flex-1 p-3 rounded-xl bg-gray-700 text-white focus:outline-none"
//           />
//           <button
//             onClick={handleSend}
//             className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl flex items-center gap-2"
//           >
//             <Send size={20} /> Send
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }

"use client";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { User, Smile, Paperclip, Send } from "lucide-react";

// ✅ Configure axios once
const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:8080/api",
  withCredentials: true,
});

export default function Inbox() {
  const [activeChat, setActiveChat] = useState({
    roomId: "64fae3f9c9b7e81234567890",
    name: "John Doe",
    userId: "64f9d1f1c4b1a2345678efgh",
  });
  const [message, setMessage] = useState("");

  const queryClient = useQueryClient();

  // Fetch messages from API
  const { data: messages = [], isLoading } = useQuery({
    queryKey: ["messages", activeChat.roomId],
    queryFn: async () => {
      const { data } = await api.get(
        `/chat/room/${activeChat.roomId}/messages`
      );
      return data;
    },
    enabled: !!activeChat.roomId,
  });

  // Send new message
  const { mutate: sendMessage } = useMutation({
    mutationFn: async () => {
      const { data } = await api.post(
        `/chat/room/${activeChat.roomId}/message`,
        {
          senderUserId: activeChat.userId,
          content: message,
        }
      );
      return data;
    },
    onSuccess: () => {
      setMessage(""); // clear input
      queryClient.invalidateQueries({
        queryKey: ["messages", activeChat.roomId],
      });
    },
  });

  const users = [
    {
      name: "John Doe",
      status: "online",
      img: "https://randomuser.me/api/portraits/men/32.jpg",
    },
    { name: "Alice Smith", status: "offline", img: null },
    {
      name: "David Brown",
      status: "online",
      img: "https://randomuser.me/api/portraits/men/44.jpg",
    },
    { name: "Sophia Lee", status: "online", img: null },
  ];

  return (
    <div className="flex h-screen bg-gray-900 text-white">
      {/* Sidebar */}
      <div className="w-1/4 bg-gray-800 border-r border-gray-700 overflow-y-auto">
        <h2 className="text-xl font-bold p-4 border-b border-gray-700">
          Inbox
        </h2>
        <ul>
          {users.map((user, index) => (
            <li
              key={index}
              onClick={() =>
                setActiveChat((prev) => ({
                  ...prev,
                  name: user.name,
                  // TODO: fetch real roomId for each user from backend
                  roomId: "64fae3f9c9b7e81234567890",
                }))
              }
              className={`flex items-center px-4 py-3 cursor-pointer hover:bg-gray-700 transition ${
                activeChat.name === user.name ? "bg-purple-600" : ""
              }`}
            >
              {user.img ? (
                <img
                  src={user.img}
                  alt={user.name}
                  className="w-10 h-10 rounded-full object-cover mr-3"
                />
              ) : (
                <div className="w-10 h-10 bg-gray-600 rounded-full flex items-center justify-center mr-3">
                  <User size={20} className="text-gray-300" />
                </div>
              )}
              <div className="flex-1">
                <p className="text-sm font-medium">{user.name}</p>
                <p className="text-xs text-gray-400">
                  {user.status === "online" ? "Online" : "Offline"}
                </p>
              </div>
              <span
                className={`w-3 h-3 rounded-full ${
                  user.status === "online" ? "bg-green-500" : "bg-gray-500"
                }`}
              ></span>
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Section */}
      <div className="flex-1 flex flex-col">
        <div className="p-4 bg-gray-800 border-b border-gray-700 flex justify-between items-center">
          <h2 className="text-lg font-semibold">{activeChat.name}</h2>
          <span className="text-sm text-green-400">Chatting</span>
        </div>

        <div className="flex-1 p-6 space-y-4 overflow-y-auto">
          {isLoading ? (
            <p>Loading messages...</p>
          ) : (
            messages.map((msg: any, i: number) => (
              <div
                key={i}
                className={`max-w-xs p-3 rounded-xl ${
                  msg.senderAdmin ? "bg-purple-600 ml-auto" : "bg-gray-700"
                }`}
              >
                {msg.content}
              </div>
            ))
          )}
        </div>

        <div className="p-4 bg-gray-800 border-t border-gray-700 flex items-center gap-3">
          <Smile size={22} className="text-gray-400 hover:text-white" />
          <Paperclip size={22} className="text-gray-400 hover:text-white" />
          <input
            type="text"
            placeholder="Type a message..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 p-3 rounded-xl bg-gray-700 text-white focus:outline-none"
          />
          <button
            onClick={() => sendMessage()}
            className="bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded-xl flex items-center gap-2"
          >
            <Send size={20} /> Send
          </button>
        </div>
      </div>
    </div>
  );
}
