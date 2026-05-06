import { useSyncExternalStore } from "react";
import { messageStore } from "./store";
import styles from "./index.module.less";

const MessageContainer = () => {
  const list = useSyncExternalStore(
    messageStore.subscribe,
    messageStore.getSnapshot,
  );
  const pos = messageStore.getPosition();

  return (
    <div className={`${styles.container} ${styles[pos]}`}>
      {list.map((msg) => (
        <div key={msg.id} className={`${styles.item} ${styles[msg.type]}`}>
          {msg.content}
        </div>
      ))}
    </div>
  );
};

export default MessageContainer;
