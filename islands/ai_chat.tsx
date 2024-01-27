// import { useSignal } from "@preact/signals";
// import myLlama from "../components/my_ollama.ts"

// interface Message {
//     sender: 'user' | 'ai';
//     text: string;
//     time: Date;
// }

// export default function ChatScreen() {
//     const messages = useSignal<Message[]>([]);
//     const processing = useSignal(false);

//     const handleSendMessage = (event)  => {
//         event.preventDefault();

//         if (processing.value) {
//             return;
//         }

//         // get input value #message-input
//         const messageInput = document.getElementById('message-input') as HTMLInputElement;
//         const messageText = messageInput.value;

//         console.log('Sending message to AI...');
//         console.log(messageText);

//         messages.value = [...messages.value, { sender: 'user', text: messageText, time: new Date() }];

//         processing.value = true;
//         try {
//             myLlama.generateMsg(messageText).then((response) => {
//                 console.log(response);
//                 messages.value = [...messages.value, { sender: 'ai', text: response, time: new Date() } as Message];
//                 processing.value = false;
//             });
            
//         } catch (error) {
//             console.error(error);
//             processing.value = false;
//         }
//     };

//     return (
//         <div className="flex flex-col items-center h-screen p-4">
//             <div className="w-full max-w-md">
//                 <div className="flex items-center bg-white border-2 border-blue-500 p-2 rounded-lg">
//                     <input
//                         id="message-input"
//                         type="text"
//                         className="flex-grow text-black outline-none"
//                         placeholder="Type your message here..."
//                         maxLength={25}
//                     />
//                     <button
//                         className="ml-2 bg-blue-500 hover:bg-blue-600 text-white rounded-full px-4 py-2 transition duration-200 ease-in-out transform hover:scale-105"
//                         onClick={handleSendMessage}
//                     >
//                         Send
//                     </button>
//                 </div>
//             </div>
//             <div className="w-full max-w-md mt-4 overflow-auto" style={{ height: '90vh' }}>
//                 {messages.value.map((message, index) => (
//                     <div key={index} className={`mb-4 ${message.sender === 'user' ? 'text-right' : ''}`}>
//                         <div className={`inline-block px-4 py-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300 text-black'}`}>
//                             {message.text}
//                         </div>
//                         <div className="text-white text-xs mt-1">
//                             {new Date(message.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
//                         </div>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// };