import { useSelector } from "react-redux";
import { MessageContainer } from "./MessageContainer";
import { UserInterface } from "./UserInterface";
import { useEffect, useState } from "react";
import { socket } from "../socket";
import { initSocketListeners } from "../initSocketListeners .js";

export const Home = () => {
  const user = useSelector(state => state.user.user);
  const [mobileChatOpen, setMobileChatOpen] = useState(false); // Mobile toggle

  useEffect(() => {
    if (!user?._id) return;
    socket.auth = { userId: user._id };
    socket.connect();
    initSocketListeners();
  }, [user?._id]);

  return (
    <div className="flex w-full h-screen">
      {/* User list */}
      {(!mobileChatOpen || window.innerWidth >= 768) && (
        <UserInterface setMobileChatOpen={setMobileChatOpen} />
      )}

      {/* Chat messages */}
      {(mobileChatOpen || window.innerWidth >= 768) && (
        <MessageContainer setMobileChatOpen={setMobileChatOpen} />
      )}
    </div>
  );
};
