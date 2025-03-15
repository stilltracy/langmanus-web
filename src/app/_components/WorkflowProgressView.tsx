import { cn } from "~/core/utils";
import { WorkflowStep, type Workflow } from "~/core/workflow";

import { Markdown } from "./Markdown";
import { ToolCallView } from "./ToolCallView";

export function WorkflowProgressView({
  className,
  workflow,
}: {
  className?: string;
  workflow: Workflow;
}) {
  return (
    <div className={cn("flex overflow-hidden rounded-2xl border", className)}>
      <aside className="flex w-[220px] flex-shrink-0 flex-col border-r bg-[rgba(0,0,0,0.02)]">
        <div className="flex-shrink-0 px-4 py-4 font-medium">Flow</div>
        <ol className="flex flex-grow list-disc flex-col gap-4 px-4 py-2">
          {workflow.steps.map((step) => (
            <li key={step.id} className="flex items-center gap-2">
              <div className="flex h-2 w-2 rounded-full bg-gray-400"></div>
              <div>{getStepName(step)}</div>
            </li>
          ))}
        </ol>
      </aside>
      <main className="flex-grow overflow-auto bg-white p-4">
        <ul className="flex flex-col gap-4">
          {workflow.steps.map((step, stepIndex) => (
            <li key={step.id} className="flex flex-col gap-2">
              <h3 className="ml-[-4px] text-lg font-bold">
                📍 Step {stepIndex + 1}: {getStepName(step)}
              </h3>
              <ul className="flex flex-col gap-2">
                {step.tasks
                  .filter(
                    (task) =>
                      !(task.type === "thinking" && task.payload.text === ""),
                  )
                  .map((task) => (
                    <li key={task.id} className="flex">
                      {task.type === "thinking" ? (
                        <Markdown
                          className="pl-6 opacity-70"
                          style={{
                            fontSize: "smaller",
                          }}
                        >
                          {task.payload.text}
                        </Markdown>
                      ) : (
                        <ToolCallView task={task} />
                      )}
                    </li>
                  ))}
              </ul>
              {stepIndex < workflow.steps.length - 1 && (
                <hr className="mb-4 mt-8" />
              )}
            </li>
          ))}
        </ul>
      </main>
    </div>
  );
}

function getStepName(step: WorkflowStep) {
  switch (step.agentName) {
    case "browser":
      return "Browsing Web";
    case "coder":
      return "Writing Code";
    case "file_manager":
      return "File Management";
    case "researcher":
      return "Researching";
    case "supervisor":
      return "Thinking";
    default:
      return step.agentName;
  }
}
