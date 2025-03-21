import { CheckOutlined, CopyOutlined } from "@ant-design/icons";
import { useState } from "react";
import ReactMarkdown, {
  type Options as ReactMarkdownOptions,
} from "react-markdown";
import remarkGfm from "remark-gfm";

import { Button } from "~/components/ui/button";
import { cn } from "~/core/utils";

export function Markdown({
  className,
  children,
  style,
  enableCopy,
  ...props
}: ReactMarkdownOptions & {
  className?: string;
  enableCopy?: boolean;
  style?: React.CSSProperties;
}) {
  return (
    <div
      className={cn(className, "markdown flex flex-col gap-4")}
      style={style}
    >
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
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
      {enableCopy && typeof children === "string" && (
        <div className="flex">
          <CopyButton content={children} />
        </div>
      )}
    </div>
  );
}

function CopyButton({ content }: { content: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <Button
      variant="outline"
      size="sm"
      className="rounded-full"
      onClick={async () => {
        try {
          await navigator.clipboard.writeText(content);
          setCopied(true);
          setTimeout(() => {
            setCopied(false);
          }, 1000);
        } catch (error) {
          console.error(error);
        }
      }}
    >
      {copied ? (
        <CheckOutlined className="h-4 w-4" />
      ) : (
        <CopyOutlined className="h-4 w-4" />
      )}{" "}
      {copied ? "Copied" : "Copy"}
    </Button>
  );
}
