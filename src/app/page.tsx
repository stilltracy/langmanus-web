"use client";

import { useCallback } from "react";
import { AppHeader } from "./_components/AppHeader";
import { InputBox } from "./_components/InputBox";
import { MessageHistoryView } from "./_components/MessageHistoryView";

export default function HomePage() {
  const handleSendMessage = useCallback((message: string) => {
    console.info(message);
  }, []);
  return (
    <main className="min-h-screen min-w-[784px]">
      <header className="fixed left-0 right-0 top-0 flex h-16 w-full items-center px-4">
        <AppHeader />
      </header>
      <main className="mt-16 px-4">
        <MessageHistoryView />
      </main>
      <footer className="fixed bottom-4 flex w-[784px] flex-col overflow-hidden rounded-[24px] border bg-white">
        <InputBox onSend={handleSendMessage} />
      </footer>
    </main>
  );
}
