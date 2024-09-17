"use client";

// import type { ClientMessage } from "@/actions/ai/types";
// import { useEnterSubmit } from "@/hooks/use-enter-submit";
// import { useScrollAnchor } from "@/hooks/use-scroll-anchor";
import { useAssistantStore } from "../assistant/store";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Textarea } from "@/components/ui/textarea";
// import { useActions } from "ai/rsc";
import { nanoid } from "nanoid";
import { useEffect, useRef } from "react";
import { ChatEmpty } from "./chat-empty";
import { ChatExamples } from "./chat-examples";
import { ChatFooter } from "./chat-footer";
import { ChatList } from "./chat-list";
import { UserMessage } from "./messages";

export function Chat() {
  // const { submitUserMessage } = useActions();
  // const { formRef, onKeyDown } = useEnterSubmit();
  const ref = useRef(false);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const { message } = useAssistantStore();

  return (
    <div className="relative">
      <ScrollArea className="todesktop:h-[335px] md:h-[335px]">
        <div>
          <ChatList className="p-4 pb-8" />
          <ChatEmpty firstName={"hello"} />

          <div className="w-full h-px" />
        </div>
      </ScrollArea>

      <div className="fixed bottom-[1px] left-[1px] right-[1px] todesktop:h-[88px] md:h-[88px] bg-background border-border border-t-[1px]">
        <ChatExamples />

        <form
          onSubmit={(evt) => {
            evt.preventDefault();
          }}
        >
          <Textarea
            ref={inputRef}
            tabIndex={0}
            rows={1}
            spellCheck={false}
            autoComplete="off"
            autoCorrect="off"
            value={""}
            className="h-12 min-h-12 pt-3 resize-none border-none"
            placeholder="Ask Midday a question..."
            // onKeyDown={onKeyDown}
            onChange={(evt) => {
              // setInput(evt.target.value);
            }}
          />
        </form>

        <ChatFooter
          // onSubmit={() => onSubmit(input)}
          showFeedback={() => {}}
        />
      </div>
    </div>
  );
}
