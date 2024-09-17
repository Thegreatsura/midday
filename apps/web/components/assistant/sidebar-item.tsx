// import type { Chat } from "@/actions/ai/types";
import { cn } from "@/lib/utils";
// import { cn } from "@/components/ui/cn";

export function SidebarItem() {
  return (
    <button
      type="button"
      className={cn(
        "text-left transition-colors px-0 py-1 rounded-lg w-full text-[#878787] hover:text-primary"
      )}
      onClick={() => {}}
    >
      <span className="text-xs line-clamp-1">{"hello"}</span>
    </button>
  );
}
