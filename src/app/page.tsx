"use client";

import { nanoid } from "nanoid";
import { useCallback } from "react";

import { addMessage, useStore } from "~/core/store";

import { AppHeader } from "./_components/AppHeader";
import { InputBox } from "./_components/InputBox";
import { MessageHistoryView } from "./_components/MessageHistoryView";

export default function HomePage() {
  const messages = useStore((state) => state.messages);
  const responding = useStore((state) => state.responding);
  const handleSendMessage = useCallback((message: string) => {
    addMessage({
      id: nanoid(),
      role: "user",
      type: "text",
      content: { text: message },
    });
  }, []);
  return (
    <main className="min-h-screen min-w-[784px]">
      <header className="fixed left-0 right-0 top-0 flex h-16 w-full items-center px-4">
        <AppHeader />
      </header>
      <main className="mb-48 mt-16 px-4">
        <MessageHistoryView messages={messages} loading={responding} />
      </main>
      <footer className="fixed bottom-4 flex w-[784px] flex-col overflow-hidden rounded-[24px] border bg-white shadow">
        <InputBox onSend={handleSendMessage} />
      </footer>
    </main>
  );
}
