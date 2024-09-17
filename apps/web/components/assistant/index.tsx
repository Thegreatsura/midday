"use client";

// import type { AI } from "@/actions/ai/chat";
// import { getUIStateFromAIState } from "@/actions/ai/chat/utils";
// import { getChat } from "@/actions/ai/storage";
import { Chat } from "@/components/chat";
// import { useAIState, useUIState } from "ai/rsc";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
// import { useHotkeys } from "react-hotkeys-hook";
import { AssistantFeedback } from "./feedback";
import { Header } from "./header";
import { SidebarList } from "./sidebar-list";

export function Assistant() {
  const [isExpanded, setExpanded] = useState(false);
  const [showFeedback, setShowFeedback] = useState(false);
  const [chatId, setChatId] = useState();
  // const [messages, setMessages] = useUIState<typeof AI>();
  // const [aiState, setAIState] = useAIState<typeof AI>();
  const [input, setInput] = useState<string>("");

  const toggleOpen = () => setExpanded((prev) => !prev);

  return (
    <div className="overflow-hidden p-0 h-full w-full todesktop:max-w-[760px] md:max-w-[760px] md:h-[480px] todesktop:h-[480px]">
      {showFeedback && (
        <AssistantFeedback onClose={() => setShowFeedback(false)} />
      )}

      {/* <SidebarList
        isExpanded={isExpanded}
        setExpanded={setExpanded}
      /> */}

      <Header toggleSidebar={toggleOpen} isExpanded={isExpanded} />

      <Chat
      // submitMessage={setMessages}
      // messages={messages}
      // user={aiState.user}
      // onNewChat={onNewChat}
      // setInput={setInput}
      // input={input}
      // showFeedback={() => setShowFeedback(true)}
      />
    </div>
  );
}
