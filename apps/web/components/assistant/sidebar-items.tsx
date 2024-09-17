// import type { AI } from "@/actions/ai/chat";
// import { getChatsAction } from "@/actions/ai/chat/get-chats-action";
// import type { Chat } from "@/actions/ai/types";
// import { useAIState } from "ai/rsc";
import { useEffect, useState } from "react";
import { SidebarItem } from "./sidebar-item";

interface SidebarItemsProps {
  onSelect: (id: string) => void;
  chatId?: string;
}

const formatRange = (key: string) => {
  switch (key) {
    case "1d":
      return "Today";
    case "2d":
      return "Yesterday";
    case "7d":
      return "Last 7 days";
    case "30d":
      return "Last 30 days";
    default:
      return null;
  }
};

export function SidebarItems() {
  // const [items, setItems] = useState<Chat[]>([]);
  const [isLoading, setLoading] = useState(false);
  // const [aiState] = useAIState<typeof AI>();

  return <SidebarItem />;
}
