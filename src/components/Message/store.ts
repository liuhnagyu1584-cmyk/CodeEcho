export type MessageType = 'success' | 'error' | 'info' | 'warning';
export type MessagePosition = 'top' | 'bottom';

export interface MessageData {
  id: string;
  content: string;
  type: MessageType;
}

let messages: MessageData[] = [];
let position: MessagePosition = 'top';
const listeners = new Set<() => void>();

export const messageStore = {
  add(content: string, type: MessageType, pos: MessagePosition, duration: number) {
    const id = Math.random().toString(36).substring(2, 9);
    position = pos;
    messages = [...messages, { id, content, type }];
    this.notify();
    if (duration > 0) setTimeout(() => this.remove(id), duration);
  },
  remove(id: string) {
    messages = messages.filter((m) => m.id !== id);
    this.notify();
  },
  subscribe(l: () => void) {
    listeners.add(l);
    return () => listeners.delete(l);
  },
  getSnapshot() { return messages; },
  getPosition() { return position; },
  notify() { listeners.forEach((l) => l()); }
};