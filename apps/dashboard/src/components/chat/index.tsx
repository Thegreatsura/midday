"use client";

import type { ClientMessage } from "@/actions/ai/types";
import { useEnterSubmit } from "@/hooks/use-enter-submit";
import { useScrollAnchor } from "@/hooks/use-scroll-anchor";
import { useAssistantStore } from "@/store/assistant";
import { Button } from "@midday/ui/button";
import { Icons } from "@midday/ui/icons";
import { Textarea } from "@midday/ui/textarea";
import { useActions } from "ai/rsc";
import { nanoid } from "nanoid";
import { useEffect, useRef, useState } from "react";
import { ChatEmpty } from "./chat-empty";
import { ChatExamples } from "./chat-examples";
import { ChatList } from "./chat-list";
import { UserMessage } from "./messages";

export function Chat({
  messages,
  submitMessage,
  user,
  onNewChat,
  input,
  setInput,
}) {
  const { submitUserMessage } = useActions();
  const { formRef, onKeyDown } = useEnterSubmit();
  const ref = useRef(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { message } = useAssistantStore();

  const onSubmit = async (input: string) => {
    const value = input.trim();

    if (value.length === 0) {
      return null;
    }

    setInput("");
    scrollToBottom();

    submitMessage((message: ClientMessage[]) => [
      ...message,
      {
        id: nanoid(),
        role: "user",
        display: <UserMessage>{value}</UserMessage>,
      },
    ]);

    const responseMessage = await submitUserMessage(value);

    submitMessage((messages: ClientMessage[]) => [
      ...messages,
      responseMessage,
    ]);
  };

  useEffect(() => {
    if (!ref.current && message) {
      onNewChat();
      onSubmit(message);
      ref.current = true;
    }
  }, []);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [messages]);

  const { messagesRef, scrollRef, visibilityRef, scrollToBottom } =
    useScrollAnchor();

  const showExamples = messages.length === 0 && !input;

  return (
    <div className="relative">
      <div className="overflow-auto h-[375px]" ref={scrollRef}>
        <div ref={messagesRef}>
          {messages.length ? (
            <ChatList messages={messages} />
          ) : (
            <ChatEmpty firstName={user.full_name.split(" ").at(0)} />
          )}

          <div className="w-full h-px" ref={visibilityRef} />
        </div>
      </div>

      <div className="fixed bottom-[1px] left-[1px] right-[1px] h-[50px] border-border border-t-[1px] bg-background">
        {showExamples && <ChatExamples onSubmit={onSubmit} />}

        <form
          ref={formRef}
          onSubmit={(evt) => {
            evt.preventDefault();
            onSubmit(input);
          }}
        >
          <Textarea
            ref={inputRef}
            tabIndex={0}
            rows={1}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            value={input}
            className="border-none h-12 pt-4"
            placeholder="Ask Midday a question..."
            autoFocus
            onKeyDown={onKeyDown}
            onChange={(evt) => {
              setInput(evt.target.value);
            }}
          />

          <Button
            className="absolute right-3 bottom-3 size-6"
            size="icon"
            disabled={input === ""}
            type="submit"
          >
            <Icons.Enter size={18} />
          </Button>
        </form>
      </div>
    </div>
  );
}
