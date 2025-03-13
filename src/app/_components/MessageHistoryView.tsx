import Markdown from "react-markdown";

import { type Message } from "~/core/messaging";
import { cn } from "~/core/utils/classnames";

import { LoadingAnimation } from "./LoadingAnimation";

export function MessageHistoryView({
  className,
  messages,
  loading,
}: {
  className?: string;
  messages: Message[];
  loading?: boolean;
}) {
  return (
    <div className={cn(className)}>
      {messages.map((message) => (
        <MessageView key={message.id} message={message} />
      ))}
      {loading && <LoadingAnimation />}
    </div>
  );
}

function MessageView({ message }: { message: Message }) {
  if (message.type === "text") {
    return (
      <div className="relative mb-8 w-fit max-w-[560px] rounded-2xl rounded-es-none border bg-white px-4 py-3">
        <Markdown
          components={{
            a: ({ href, children }) => (
              <a href={href} target="_blank" rel="noopener noreferrer">
                {children}
              </a>
            ),
          }}
        >
          {message.content.text}
        </Markdown>
      </div>
    );
  }
  return null;
}
