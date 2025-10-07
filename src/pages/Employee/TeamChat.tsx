// import { useState } from "react";
// import { Send, Users, Plus } from "lucide-react";

// const dummyChats = [
//   { id: 1, user: "Bhuvan P", message: "Hey team! Any update on the project?", time: "09:15 AM" },
//   { id: 2, user: "You", message: "Working on the API integration. Will update soon.", time: "09:17 AM" },
//   { id: 3, user: "Sandeep K", message: "Frontend build is almost ready.", time: "09:19 AM" },
// ];

// export default function TeamChat() {
//   const [messages, setMessages] = useState(dummyChats);
//   const [newMessage, setNewMessage] = useState("");
//   const [activeChat, setActiveChat] = useState("General");

//   const handleSend = () => {
//     if (!newMessage.trim()) return;
//     setMessages([
//       ...messages,
//       { id: Date.now(), user: "You", message: newMessage, time: "Now" },
//     ]);
//     setNewMessage("");
//   };

//   const handleNewChat = () => {
//     const chatName = prompt("Enter the name of the new chat:");
//     if (chatName && chatName.trim() !== "") {
//       setActiveChat(chatName);
//       setMessages([]); // Clear messages for new chat
//     }
//   };

//   return (
//     <div className="flex h-full">
//       {/* Sidebar - Team Members & New Chat Option */}
//       <div className="w-64 border-r border-gray-300 p-4 hidden md:flex flex-col">
//         <h2 className="font-bold text-lg flex items-center gap-2 mb-2">
//           <Users className="h-5 w-5" /> Team Members
//         </h2>

//         <ul className="mt-2 space-y-2 flex-1">
//           <li className="text-sm font-medium">Bhuvan P (Manager)</li>
//           <li className="text-sm">Sandeep K</li>
//           <li className="text-sm">Michael Brown</li>
//           <li className="text-sm">You</li>
//         </ul>

//         {/* New Chat Button */}
//         <button
//           onClick={handleNewChat}
//           className="bg-violet-600 hover:bg-violet-700 text-white px-3 py-2 rounded-lg flex items-center gap-2"
//         >
//           <Plus className="h-4 w-4" /> Start New Chat
//         </button>
//       </div>

//       {/* Main Chat Area */}
//       <div className="flex flex-col flex-1">
//         {/* Chat Header */}
//         <div className="p-4 border-b border-gray-300 flex items-center justify-between">
//           <h1 className="text-lg font-bold">{activeChat} Chat</h1>
//         </div>

//         {/* Messages */}
//         <div className="flex-1 p-4 overflow-y-auto space-y-3">
//           {messages.length === 0 ? (
//             <p className="text-gray-500 text-center mt-10">No messages yet. Start chatting!</p>
//           ) : (
//             messages.map((msg) => (
//               <div
//                 key={msg.id}
//                 className={`flex flex-col ${msg.user === "You" ? "items-end" : "items-start"}`}
//               >
//                 <div
//                   className={`p-2 rounded-lg max-w-md ${
//                     msg.user === "You" ? "bg-violet-600 text-white" : "bg-gray-200 text-gray-800"
//                   }`}
//                 >
//                   <p className="text-sm font-medium">{msg.user}</p>
//                   <p>{msg.message}</p>
//                 </div>
//                 <span className="text-xs text-gray-500 mt-1">{msg.time}</span>
//               </div>
//             ))
//           )}
//         </div>

//         {/* Input */}
//         <div className="p-3 border-t border-gray-300 flex items-center gap-2">
//           <input
//             type="text"
//             placeholder="Type your message..."
//             className="flex-1 border border-gray-300 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring focus:ring-violet-300"
//             value={newMessage}
//             onChange={(e) => setNewMessage(e.target.value)}
//             onKeyDown={(e) => e.key === "Enter" && handleSend()}
//           />
//           <button
//             onClick={handleSend}
//             className="bg-violet-600 hover:bg-violet-700 text-white p-2 rounded-lg"
//           >
//             <Send className="h-5 w-5" />
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }
