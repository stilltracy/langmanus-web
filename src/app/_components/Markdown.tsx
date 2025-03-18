import ReactMarkdown, { type Options } from "react-markdown";
import { CopyOutlined } from "@ant-design/icons";
import { useState } from "react";

import { cn } from "~/core/utils";

export function Markdown({
  className,
  children,
  style,
  type = "report",
  ...props
}: Options & { 
  className?: string; 
  style?: React.CSSProperties;
  type?: "report" | "flow";
}) {
  const [copied, setCopied] = useState(false);
  const markdownContent = typeof children === "string" ? children : "";
  const copyButtonText = type === "flow" ? "Copy Flow" : "Copy Report";

  return (
    <div className={cn(className, "markdown")} style={style}>
      <ReactMarkdown
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
        }}
        {...props}
      >
        {children}
      </ReactMarkdown>

      <div className="mt-4 flex justify-end">
        <button
          className="flex items-center gap-2 rounded-full bg-gray-50 px-4 py-2 text-sm text-gray-600 transition-all hover:bg-gray-100 hover:text-gray-900"
          onClick={() => {
            navigator.clipboard.writeText(markdownContent);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
          }}
        >
          {copied ? (
            <span className="text-xs">Copied!</span>
          ) : (
            <>
              <CopyOutlined className="h-4 w-4" />
              <span>{copyButtonText}</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
}
