"use client";

import { nanoid } from "nanoid";
import { useCallback } from "react";

import { sendMessage, useStore } from "~/core/store";

import { AppHeader } from "./_components/AppHeader";
import { InputBox } from "./_components/InputBox";
import { MessageHistoryView } from "./_components/MessageHistoryView";
import { cn } from "~/core/utils";

export default function HomePage() {
  const messages = useStore((state) => state.messages);
  const responding = useStore((state) => state.responding);
  const handleSendMessage = useCallback(async (content: string) => {
    await sendMessage({
      id: nanoid(),
      role: "user",
      type: "text",
      content,
    });
  }, []);
  return (
    <div className="flex w-full flex-col items-center justify-center">
      <div className="min-w-page flex min-h-screen flex-col items-center">
        <header className="fixed left-0 right-0 top-0 flex h-16 w-full items-center px-4">
          <AppHeader />
        </header>
        <main className="mb-48 mt-16 px-4">
          <MessageHistoryView
            className="w-page"
            messages={messages}
            loading={responding}
          />
        </main>
        <footer
          className={cn(
            "fixed bottom-4 transition-transform duration-500 ease-in-out",
            messages.length === 0 ? "w-[640px] translate-y-[-34vh]" : "w-page",
          )}
        >
          {messages.length === 0 && (
            <div className="flex w-[640px] translate-y-[-32px] flex-col">
              <h3 className="mb-2 text-center text-3xl font-medium">
                👋 Hello, there!
              </h3>
              <div className="px-4 text-center text-lg text-gray-400">
                LangManus, built on cutting-edge language models, helps you
                search on web, browse information, and handle complex tasks.
              </div>
            </div>
          )}
          <div className="flex flex-col overflow-hidden rounded-[24px] border bg-white shadow-lg">
            <InputBox
              size={messages.length === 0 ? "large" : "normal"}
              onSend={handleSendMessage}
              disabled={responding}
            />
          </div>
          <div className="w-page absolute bottom-[-32px] h-8 backdrop-blur-sm" />
        </footer>
      </div>
    </div>
  );
}
