import { createRoot } from "react-dom/client";
import MessageContainer from "./MessageContainer";
import { messageStore } from "./store";
import type { MessageType, MessagePosition } from "./store";

let isMounted = false;

const message = {
  show(
    content: string,
    type: MessageType = "info",
    pos: MessagePosition = "top",
    duration = 3000,
  ) {
    if (typeof window === "undefined") return;

    messageStore.add(content, type, pos, duration);

    if (!isMounted) {
      const div = document.createElement("div");
      div.id = "message-root";
      document.body.appendChild(div);
      createRoot(div).render(<MessageContainer />);
      isMounted = true;
    }
  },

  success: (msg: string, pos?: MessagePosition) =>
    message.show(msg, "success", pos),
  error: (msg: string, pos?: MessagePosition) =>
    message.show(msg, "error", pos),
  info: (msg: string, pos?: MessagePosition) => message.show(msg, "info", pos),
  warning: (msg: string, pos?: MessagePosition) =>
    message.show(msg, "warning", pos),
};

export default message;
