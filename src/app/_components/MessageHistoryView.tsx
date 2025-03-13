import Markdown from "react-markdown";

import { type Message } from "~/core/messaging";
import { cn } from "~/core/utils/classnames";

export function MessageHistoryView({
  className,
  messages,
  ongoing,
}: {
  className?: string;
  messages: Message[];
  ongoing?: boolean;
}) {
  return (
    <div className={cn(className)}>
      {messages.map((message) => (
        <MessageView key={message.id} message={message} />
      ))}
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
