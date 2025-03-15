import { ArrowUpOutlined, BorderOutlined } from "@ant-design/icons";
import { type KeyboardEvent, useCallback, useState } from "react";

import { cn } from "~/core/utils";

export function InputBox({
  className,
  size,
  responding,
  onSend,
  onCancel,
}: {
  className?: string;
  size?: "large" | "normal";
  responding?: boolean;
  onSend?: (message: string) => void;
  onCancel?: () => void;
}) {
  const [message, setMessage] = useState("");
  const [imeStatus, setImeStatus] = useState<"active" | "inactive">("inactive");
  const handleSendMessage = useCallback(() => {
    if (responding) {
      onCancel?.();
    } else {
      if (message.trim() === "") {
        return;
      }
      if (onSend) {
        onSend(message);
        setMessage("");
      }
    }
  }, [onSend, message, onCancel, responding]);
  const handleKeyDown = useCallback(
    (event: KeyboardEvent<HTMLTextAreaElement>) => {
      if (responding) {
        return;
      }
      if (
        event.key === "Enter" &&
        !event.shiftKey &&
        !event.metaKey &&
        !event.ctrlKey &&
        imeStatus === "inactive"
      ) {
        event.preventDefault();
        handleSendMessage();
      }
    },
    [handleSendMessage, imeStatus],
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
          title={responding ? "Cancel" : "Send"}
          className="bg-button text-button hover:bg-button-hover hover:text-button-hover h-10 w-10 rounded-full transition-shadow hover:shadow"
          onClick={handleSendMessage}
        >
          {responding ? (
            <div className="flex h-10 w-10 items-center justify-center">
              <div className="h-4 w-4 rounded bg-gray-300" />
            </div>
          ) : (
            <ArrowUpOutlined />
          )}
        </button>
      </div>
    </div>
  );
}
