import { nanoid } from "nanoid";

import { type ChatEvent, type StartOfWorkflowEvent } from "../api";

import { type WorkflowStep } from "./steps";
import { type ThinkingTask, type ToolCallTask } from "./tasks";
import { type Workflow } from "./workflow";

export class WorkflowEngine {
  start(startEvent: StartOfWorkflowEvent) {
    const workflow: Workflow = {
      id: startEvent.data.workflow_id,
      name: startEvent.data.input[0]!.content,
      steps: [],
    };
    return workflow;
  }

  async *run(workflow: Workflow, stream: AsyncIterable<ChatEvent>) {
    let currentStep: WorkflowStep | null = null;
    let currentToolCallTask: ToolCallTask | null = null;
    let currentThinkingTask: ThinkingTask | null = null;

    for await (const event of stream) {
      switch (event.type) {
        case "start_of_agent":
          currentStep = {
            id: nanoid(),
            agentId: event.data.agent_id,
            agentName: event.data.agent_name,
            type: "agentic",
            tasks: [],
          };
          workflow.steps.push(currentStep);
          yield workflow;
          break;
        case "end_of_agent":
          currentStep = null;
          break;
        case "start_of_llm":
          currentThinkingTask = {
            id: nanoid(),
            type: "thinking",
            state: "pending",
            payload: {
              text: "",
            },
          };
          currentStep!.tasks.push(currentThinkingTask);
          yield workflow;
          break;
        case "end_of_llm":
          currentThinkingTask!.state = "success";
          currentThinkingTask = null;
          yield workflow;
          break;
        case "message":
          currentThinkingTask!.payload.text += event.data.delta.content;
          yield workflow;
          break;
        case "tool_call":
          currentToolCallTask = {
            id: nanoid(),
            type: "tool_call",
            state: "pending",
            payload: {
              toolName: event.data.tool_name,
              input: event.data.tool_input,
            },
          };
          currentStep!.tasks.push(currentToolCallTask);
          yield workflow;
          break;
        case "tool_call_result":
          currentToolCallTask!.state = "success";
          currentToolCallTask!.payload.output = event.data.tool_result;
          yield workflow;
          break;
        case "end_of_workflow":
          return;
        default:
          break;
      }
    }
  }
}
