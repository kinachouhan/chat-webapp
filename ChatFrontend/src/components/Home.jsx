import { useSelector } from "react-redux";
import { MessageContainer } from "./MessageContainer";
import { UserInterface } from "./UserInterface";
import { useEffect } from "react";
import { socket } from "../socket";
import { initSocketListeners } from "../initSocketListeners "

export const Home = () => {
  const user = useSelector(state => state.user.user);

  useEffect(() => {
    if (!user?._id) return;


    socket.auth = { userId: user._id };
    socket.connect();

  
    initSocketListeners();

    // ❌ DO NOT disconnect here
  }, [user?._id]);

  console.log(user)

  return (
    <div className="flex">
      <UserInterface />
      <MessageContainer />
    </div>
  );
};
