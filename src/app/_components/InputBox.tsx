import { ArrowUpOutlined } from "@ant-design/icons";
import { type KeyboardEvent, useCallback, useState } from "react";

import { cn } from "~/core/utils/classnames";

export function InputBox({
  className,
  onSend,
}: {
  className?: string;
  onSend?: (message: string) => void;
}) {
  const [message, setMessage] = useState("");
  const [imeStatus, setImeStatus] = useState<"active" | "inactive">("inactive");
  const sendMessage = useCallback(() => {
    if (message.trim() === "") {
      return;
    }
    if (onSend) {
      onSend(message);
      setMessage("");
    }
  }, [onSend, message]);
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (
        event.key === "Enter" &&
        !event.shiftKey &&
        !event.metaKey &&
        !event.ctrlKey &&
        imeStatus === "inactive"
      ) {
        event.preventDefault();
        sendMessage();
      }
    },
    [sendMessage, imeStatus],
  );
  return (
    <div className={cn(className)}>
      <textarea
        className="m-0 min-h-4 w-full resize-none border-none px-4 py-3 text-lg"
        placeholder="What can I do for you?"
        value={message}
        onCompositionStart={() => setImeStatus("active")}
        onCompositionEnd={() => setImeStatus("inactive")}
        onKeyDown={handleKeyDown}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <div className="flex items-center justify-end px-2 py-2">
        <button
          title="Send"
          className="h-10 w-10 rounded-full bg-[#f9f8f6] text-gray-500 transition-shadow hover:bg-gray-100 hover:shadow"
          onClick={sendMessage}
        >
          <ArrowUpOutlined />
        </button>
      </div>
    </div>
  );
}
