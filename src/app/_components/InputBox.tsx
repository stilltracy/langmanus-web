import { ArrowUpOutlined } from "@ant-design/icons";
import { type KeyboardEvent, useCallback, useState } from "react";

import { cn } from "~/core/utils";

export function InputBox({
  className,
  size,
  disabled,
  onSend,
}: {
  className?: string;
  size?: "large" | "normal";
  disabled?: boolean;
  onSend?: (message: string) => void;
}) {
  const [message, setMessage] = useState("");
  const [imeStatus, setImeStatus] = useState<"active" | "inactive">("inactive");
  const sendMessage = useCallback(() => {
    if (disabled) {
      return;
    }
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
        className={cn(
          "m-0 w-full resize-none border-none px-4 py-3 text-lg",
          size === "large" ? "min-h-32" : "min-h-4",
        )}
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
          className="bg-button text-button hover:bg-button-hover hover:text-button-hover h-10 w-10 rounded-full transition-shadow hover:shadow"
          onClick={sendMessage}
          disabled={disabled}
        >
          <ArrowUpOutlined />
        </button>
      </div>
    </div>
  );
}
