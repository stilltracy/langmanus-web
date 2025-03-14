export interface GenericChatEvent<T extends string, D extends object> {
  type: T;
  data: D;
}

export interface StartOfWorkflowEvent
  extends GenericChatEvent<
    "start_of_workflow",
    { workflow_id: string; input: { content: string }[] }
  > {}

export interface EndOfWorkflowEvent
  extends GenericChatEvent<"end_of_workflow", { workflow_id: string }> {}

export interface StartOfAgentEvent
  extends GenericChatEvent<
    "start_of_agent",
    { agent_id: string; agent_name: string }
  > {}

export interface EndOfAgentEvent
  extends GenericChatEvent<"end_of_agent", { agent_id: string }> {}

export interface ToolCallEvent
  extends GenericChatEvent<
    "tool_call",
    { tool_call_id: string; tool_name: string; tool_input: Record<string, any> }
  > {}

export interface ToolCallResultEvent
  extends GenericChatEvent<
    "tool_call_result",
    { tool_call_id: string; tool_result: string }
  > {}

export interface StartOfLLMEvent
  extends GenericChatEvent<"start_of_llm", { agent_name: string }> {}

export interface EndOfLLMEvent
  extends GenericChatEvent<"end_of_llm", { agent_name: string }> {}

export interface MessageEvent
  extends GenericChatEvent<
    "message",
    { message_id: string; delta: { content: string } }
  > {}

export type ChatEvent =
  | StartOfWorkflowEvent
  | EndOfWorkflowEvent
  | StartOfAgentEvent
  | EndOfAgentEvent
  | ToolCallEvent
  | ToolCallResultEvent
  | StartOfLLMEvent
  | EndOfLLMEvent
  | MessageEvent;
