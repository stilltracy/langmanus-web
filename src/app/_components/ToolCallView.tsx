import {
  GlobalOutlined,
  SearchOutlined,
  UnorderedListOutlined,
} from "@ant-design/icons";
import { useMemo } from "react";

import { type ToolCallTask } from "~/core/workflow";

export function ToolCallView({ task }: { task: ToolCallTask }) {
  if (task.payload.toolName === "tavily_search") {
    return <TravilySearchToolCallView task={task as ToolCallTask<any>} />;
  } else if (task.payload.toolName === "crawl_tool") {
    return <CrawlToolCallView task={task as ToolCallTask<any>} />;
  } else if (task.payload.toolName === "browser") {
    return <BrowserToolCallView task={task as ToolCallTask<any>} />;
  }
  return <div>{task.payload.toolName}</div>;
}

function BrowserToolCallView({
  task,
}: {
  task: ToolCallTask<{ instruction: string }>;
}) {
  return (
    <div>
      <div className="flex items-center gap-2">
        <div>
          <GlobalOutlined className="h-4 w-4 text-sm" />
        </div>
        <div>
          <span className="text-sm">{task.payload.input.instruction}</span>
        </div>
      </div>
    </div>
  );
}

function CrawlToolCallView({ task }: { task: ToolCallTask<{ url: string }> }) {
  const results = useMemo(() => {
    try {
      return JSON.parse(task.payload.output ?? "") ?? null;
    } catch (error) {
      return null;
    }
  }, [task.payload.output]);
  return (
    <div>
      <div className="flex items-center gap-2">
        <div>
          <GlobalOutlined className="h-4 w-4 text-sm" />
        </div>
        <div>
          <span>Reading</span>{" "}
          <a
            className="text-sm"
            href={task.payload.input.url}
            target="_blank"
            rel="noopener noreferrer"
          >
            {task.payload.input.url}
          </a>
        </div>
      </div>
    </div>
  );
}

function TravilySearchToolCallView({
  task,
}: {
  task: ToolCallTask<{ query: string }>;
}) {
  const results = useMemo(() => {
    try {
      return JSON.parse(task.payload.output ?? "") ?? [];
    } catch (error) {
      return [];
    }
  }, [task.payload.output]);
  return (
    <div>
      <div className="flex items-center gap-2">
        <div>
          <SearchOutlined className="h-4 w-4 text-sm" />
        </div>
        <div>
          Searching for{" "}
          <span className="font-bold">
            &quot;{task.payload.input.query}&quot;
          </span>
        </div>
      </div>
      {task.state !== "pending" && (
        <div className="flex flex-col gap-2 pt-1">
          <div className="flex items-center gap-2">
            <div>
              <UnorderedListOutlined className="h-4 w-4 text-sm" />
            </div>
            <div>
              <span className="text-sm text-gray-500">
                {results.length} results found
              </span>
            </div>
          </div>
          <ul className="flex flex-col gap-2 text-sm">
            {results.map((result: { url: string; title: string }) => (
              <li key={result.url} className="list-item list-inside pl-6">
                <a
                  className="flex items-center gap-2"
                  target="_blank"
                  rel="noopener noreferrer"
                  href={result.url}
                >
                  <img
                    className="h-4 w-4 rounded-full bg-slate-100 shadow"
                    src={new URL(result.url).origin + "/favicon.ico"}
                    alt={result.title}
                    onError={(e) => {
                      e.currentTarget.src =
                        "https://perishablepress.com/wp/wp-content/images/2021/favicon-standard.png";
                    }}
                  />
                  {result.title}
                </a>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
