import { socket } from "./socket";
import store from "./redux/store";
import { addMessage } from "./redux/messageSlice";
import { updateUserLastMessage } from "./redux/userSlice";

let initialized = false;

export const initSocketListeners = () => {
  if (initialized) return;
  initialized = true;

  socket.on("receiveMessage", (msg) => {
    const normalizedMsg = msg.message ? msg.message : msg;

    const state = store.getState();
    const selectedUser = state.user.selectedUser;
    const me = state.user.user;

    const isChatOpen =
      selectedUser &&
      normalizedMsg.senderId === selectedUser._id &&
      normalizedMsg.receiverId === me._id;

    if (isChatOpen) {
      store.dispatch(addMessage(normalizedMsg));
    } else {
      store.dispatch(updateUserLastMessage({
        userId: normalizedMsg.senderId,
        message: normalizedMsg.message,
        isUnread: true
      }));
    }
  });
};
