import { type KeyboardEvent, useCallback, useState } from "react";

export function InputBox({ onSend }: { onSend?: (message: string) => void }) {
  const [message, setMessage] = useState("");
  const sendMessage = useCallback(() => {
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
        !event.ctrlKey
      ) {
        event.preventDefault();
        sendMessage();
      }
    },
    [sendMessage],
  );
  return (
    <div>
      <textarea
        className="m-0 min-h-4 w-full resize-none border-none p-4 text-lg"
        placeholder="How can LangManus assist you?"
        value={message}
        onKeyDown={handleKeyDown}
        onChange={(event) => {
          setMessage(event.target.value);
        }}
      />
      <div className="flex items-center justify-end px-2 py-2">
        <button
          title="Send"
          className="h-10 w-10 rounded-full bg-[#f9f8f6] text-gray-500 hover:bg-gray-100"
          onClick={sendMessage}
        >
          ↑
        </button>
      </div>
    </div>
  );
}
