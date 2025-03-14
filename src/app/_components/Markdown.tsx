import ReactMarkdown, { type Options } from "react-markdown";

import { cn } from "~/core/utils";

export function Markdown({
  className,
  children,
  ...props
}: Options & { className?: string }) {
  return (
    <div className={cn(className, "markdown")}>
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
    </div>
  );
}
