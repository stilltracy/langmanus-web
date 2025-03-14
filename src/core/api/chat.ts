import { env } from "~/env";

import { type Message } from "../messaging";
import { fetchStream } from "../sse";

import { type ChatEvent } from "./types";

export function chatStream(userMessage: Message) {
  return fetchStream<ChatEvent>(env.NEXT_PUBLIC_API_URL + "/chat/stream", {
    body: JSON.stringify({ messages: [userMessage] }),
  });
}
