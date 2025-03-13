import { create } from "zustand";

import { type Message } from "../messaging";

export const useStore = create<{
  messages: Message[];
}>(() => ({
  messages: [],
}));

export function addMessage(message: Message) {
  useStore.setState((state) => ({ messages: [...state.messages, message] }));
}

export function updateMessage(message: Partial<Message>) {
  useStore.setState((state) => ({
    messages: state.messages.map((m) =>
      m.id === message.id ? { ...m, ...message } : m,
    ),
  }));
}

export function updateSSEMessage(id: string, text: string) {
  const message = useStore.getState().messages.find((m) => m.id === id);
  if (!message) {
    return;
  }
  updateMessage({ id, content: { text: message.content.text + text } });
}

export function clearMessages() {
  useStore.setState({ messages: [] });
}
