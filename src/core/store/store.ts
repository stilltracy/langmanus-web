import { nanoid } from "nanoid";
import { create } from "zustand";

import { chatStream } from "../api/mock";
import { type WorkflowMessage, type Message } from "../messaging";
import {
  type WorkflowStep,
  type Workflow,
  type WorkflowTask,
  WorkflowEngine,
} from "../workflow";

export const useStore = create<{
  messages: Message[];
  responding: boolean;
}>(() => ({
  messages: [
    // {
    //   id: "1",
    //   role: "user",
    //   type: "text",
    //   content: "东京的天气怎么样？",
    // },
    // {
    //   id: "2",
    //   role: "assistant",
    //   type: "text",
    //   content: "东京的天气晴朗，气温在10度左右。",
    // },
    // {
    //   id: "3",
    //   role: "assistant",
    //   type: "workflow",
    //   content: {
    //     workflow: {
    //       id: "123",
    //       name: "东京天气查询",
    //       steps: [
    //         {
    //           id: "123_1",
    //           type: "agentic",
    //           agentId: "123",
    //           agentName: "researcher",
    //           tasks: [
    //             {
    //               id: "4",
    //               type: "tool_call",
    //               payload: {
    //                 toolName: "weather",
    //                 toolInput: {
    //                   city: "东京",
    //                 },
    //                 state: "pending",
    //                 output: {},
    //               },
    //             },
    //           ],
    //         },
    //       ],
    //     },
    //   },
    // },
  ],
  responding: false,
}));

export function addMessage(message: Message) {
  useStore.setState((state) => ({ messages: [...state.messages, message] }));
  return message;
}

export function updateMessage(message: Partial<Message> & { id: string }) {
  useStore.setState((state) => {
    const index = state.messages.findIndex((m) => m.id === message.id);
    if (index === -1) {
      return state;
    }
    const newMessage = JSON.parse(
      JSON.stringify({ ...state.messages[index], ...message }),
    ) as Message;
    return {
      messages: [
        ...state.messages.slice(0, index),
        newMessage,
        ...state.messages.slice(index + 1),
      ],
    };
  });
}

export async function sendMessage(message: Message) {
  addMessage(message);
  const stream = chatStream(message);
  setResponding(true);
  for await (const event of stream) {
    switch (event.type) {
      case "start_of_workflow":
        const workflowEngine = new WorkflowEngine();
        const workflow = workflowEngine.start(event);
        const message: WorkflowMessage = {
          id: event.data.workflow_id,
          role: "assistant",
          type: "workflow",
          content: { workflow: workflow },
        };
        addMessage(message);
        for await (const updatedWorkflow of workflowEngine.run(
          workflow,
          stream,
        )) {
          updateMessage({
            id: message.id,
            content: { workflow: updatedWorkflow },
          });
        }
        break;
      default:
        break;
    }
  }
  setResponding(false);
  return message;
}

export function clearMessages() {
  useStore.setState({ messages: [] });
}

export function setResponding(responding: boolean) {
  useStore.setState({ responding });
}
