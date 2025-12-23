import { useDispatch, useSelector } from "react-redux";
import { Message } from "./Message";
import { IoSend } from "react-icons/io5";
import { useEffect, useRef, useState } from "react";
import { socket } from "../socket";
import { addMessage, clearMessages } from "../redux/messageSlice";
import { updateUserLastMessage, clearUnread } from "../redux/userSlice";

export const MessageContainer = ({ setMobileChatOpen }) => {
    const dispatch = useDispatch();

    const [text, setText] = useState("");
    const messageEndRef = useRef(null);

    const messages = useSelector(state => state.message.messages);
    const selectedUser = useSelector(state => state.user.selectedUser);
    const me = useSelector(state => state.user.user);


    const selectedUserRef = useRef(null);
    const meRef = useRef(null);


    useEffect(() => {
        selectedUserRef.current = selectedUser;
        meRef.current = me;
    }, [selectedUser, me]);


    useEffect(() => {
        if (!selectedUser?._id) return;

        dispatch(clearMessages());

        const fetchMessages = async () => {
            const res = await fetch(
                `http://localhost:5000/api/v1/message/getmessage/${selectedUser._id}`,
                { credentials: "include" }
            );
            const data = await res.json();

            if (data.success) {
                data.responseData.messages.forEach(msg => {
                    dispatch(addMessage(msg));
                });
            }

            dispatch(clearUnread(selectedUser._id));
        };

        fetchMessages();
    }, [selectedUser?._id, dispatch]);


    useEffect(() => {
        messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
    }, [messages]);


    useEffect(() => {
        const handleReceiveMessage = (msg) => {
            const currentChat = selectedUserRef.current;
            const currentUser = meRef.current;

            if (!currentUser) return;

            const isChatOpen =
                currentChat &&
                msg.senderId === currentChat._id &&
                msg.receiverId === currentUser._id;

            if (isChatOpen) {
                dispatch(addMessage(msg));
                dispatch(clearUnread(currentChat._id));
            }

            else {
                dispatch(updateUserLastMessage({
                    userId: msg.senderId,
                    message: msg.message,
                    isUnread: true
                }));
            }
        };

        socket.on("receiveMessage", handleReceiveMessage);
        return () => socket.off("receiveMessage", handleReceiveMessage);
    }, [dispatch]);


    const sendMessage = async () => {
        if (!text.trim() || !selectedUser?._id) return;

        const res = await fetch(
            `http://localhost:5000/api/v1/message/sendmessage/${selectedUser._id}`,
            {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({ message: text })
            }
        );

        const data = await res.json();

        if (data.success) {
            socket.emit("sendMessage", {
                receiverId: selectedUser._id,
                message: data.responseData
            });

            dispatch(addMessage(data.responseData));
            setText("");
        }
    };

    return (
        <div className="bg-[#2a2b2e] text-white w-full h-screen flex flex-col">


            {selectedUser ? (
                <>
                   
                    <div className="p-4 flex gap-3 items-center">
                        {window.innerWidth < 768 && (
                            <button
                                onClick={() => setMobileChatOpen(false)}
                                className="p-2 m-2  rounded"
                            >
                                ← 
                            </button>
                        )}
                        <img className="w-[50px] h-[50px]" src={selectedUser.avatar} />
                        <div>
                            <h1>{selectedUser.fullName}</h1>
                            <h1>@{selectedUser.userName}</h1>
                        </div>
                    </div>

                    <div className="border-b border-gray-600" />

                    <div className="flex-1 overflow-y-auto p-3">
                        {messages.map(msg => (
                            <Message
                                key={msg._id}
                                text={msg.message}
                                own={msg.senderId === me._id}
                            />
                        ))}
                        <div ref={messageEndRef} />
                    </div>

                    <div className="border-t border-gray-600 p-3 flex gap-2">
                        <input
                            value={text}
                            onKeyDown={e => {
                                if (e.key === "Enter") {
                                    e.preventDefault();
                                    sendMessage();
                                }
                            }}
                            onChange={e => setText(e.target.value)}
                            className="flex-1 bg-[#2a2b2e] border border-gray-700 p-2"
                            placeholder="Type..."
                        />
                        <button
                            onClick={sendMessage}
                            className="bg-blue-500 px-4 text-xl"
                        >
                            <IoSend />
                        </button>
                    </div>
                </>
            ) : (
                <div className="flex items-center justify-center h-full text-gray-400">
                    Select a chat
                </div>
            )}
        </div>
    );
};
