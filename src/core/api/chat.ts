import { env } from "~/env";

import { type Message } from "../messaging";
import { fetchStream } from "../sse";

import { type ChatEvent } from "./types";

export function chatStream(
  userMessage: Message,
  state: { messages: { role: string; content: string }[] },
  params: { deepThinkMode: boolean; searchBeforePlanning: boolean },
  options: { abortSignal?: AbortSignal } = {},
) {
  return fetchStream<ChatEvent>(env.NEXT_PUBLIC_API_URL + "/chat/stream", {
    body: JSON.stringify({
      messages: [...state.messages, userMessage],
      deep_think_mode: params.deepThinkMode,
      search_before_planning: params.searchBeforePlanning,
    }),
    signal: options.abortSignal,
  });
}
