import ReactMarkdown, { type Options } from "react-markdown";
import { CopyOutlined } from "@ant-design/icons";
import { useState } from "react";

import { cn } from "~/core/utils";

interface CodeProps {
  node?: any;
  inline?: boolean;
  className?: string;
  children?: React.ReactNode;
}

interface MarkdownProps extends Options {
  className?: string;
  style?: React.CSSProperties;
  type?: "report" | "flow";
}

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
        remarkPlugins={[remarkGfm]}
        components={{
          a: ({ href, children }) => (
            <a href={href} target="_blank" rel="noopener noreferrer">
              {children}
            </a>
          ),
          table: ({ children }) => (
            <div className="my-4 w-full overflow-x-auto">
              <table className="min-w-full table-auto border border-gray-200">
                {children}
              </table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className="bg-gray-50">
              {children}
            </thead>
          ),
          tbody: ({ children }) => (
            <tbody className="bg-white">
              {children}
            </tbody>
          ),
          tr: ({ children }) => (
            <tr className="border-b border-gray-200 hover:bg-gray-50">
              {children}
            </tr>
          ),
          th: ({ children }) => (
            <th className="border border-gray-200 px-4 py-2 text-left text-sm font-semibold text-gray-700">
              {children}
            </th>
          ),
          td: ({ children }) => (
            <td className="border border-gray-200 px-4 py-2 text-sm text-gray-600">
              {children}
            </td>
          ),
          code: ({ node, inline, className, children, ...props }: CodeProps) => {
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const code = String(children).replace(/\n$/, "");
            const [codeCopied, setCodeCopied] = useState(false);

            if (inline || (!code.includes('\n') && code.length < 50)) {
              return (
                <code className="rounded bg-gray-100 px-1.5 py-0.5 text-sm font-mono text-gray-800" {...props}>
                  {children}
                </code>
              );
            }

            return (
              <div className="relative my-4">
                <pre className="relative rounded-lg bg-gray-50 p-4">
                  <code
                    className={cn(
                      "block overflow-x-auto text-sm font-mono",
                      language && `language-${language}`,
                    )}
                    {...props}
                  >
                    {code}
                  </code>
                  <button
                    className="absolute right-2 top-2 rounded bg-gray-100 p-1 text-gray-500 hover:bg-gray-200"
                    onClick={() => {
                      navigator.clipboard.writeText(code);
                      setCodeCopied(true);
                      setTimeout(() => setCodeCopied(false), 2000);
                    }}
                  >
                    {codeCopied ? (
                      <span className="text-xs">Copied!</span>
                    ) : (
                      <CopyOutlined className="h-4 w-4" />
                    )}
                  </button>
                </pre>
              </div>
            );
          },
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
