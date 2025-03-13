export type MessageRole = "user" | "assistant";

export interface BaseMessage<
  T extends string,
  C extends Record<string, unknown>,
> {
  id: string;
  role: MessageRole;
  type: T;
  content: C;
}

export interface TextMessage extends BaseMessage<"text", { text: string }> {}

export type Message = TextMessage;
