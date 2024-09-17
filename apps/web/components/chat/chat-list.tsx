"use client";

import { cn } from "@/lib/utils";

// import type { ClientMessage } from "@/actions/ai/types";
// import { cn } from "@midday/ui/cn";

type Props = {
  // messages: ClientMessage[];
  className?: string;
};

export function ChatList({ className }: Props) {
  return (
    <div className={cn("flex flex-col", className)}>
      <div>
        {/* hello hello hello hello hello hello */}
        <div className="my-6" />
      </div>
    </div>
  );
}
