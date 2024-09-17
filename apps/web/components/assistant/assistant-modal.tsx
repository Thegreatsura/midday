"use client";

import { useAssistantStore } from "./store";
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { useHotkeys } from "react-hotkeys-hook";
import { Assistant } from ".";

export function AssistantModal() {
  const { isOpen, setOpen } = useAssistantStore();

  useHotkeys("meta+k", () => setOpen(), {
    enableOnFormTags: true,
  });

  return (
    <Dialog open={true} onOpenChange={setOpen}>
      <DialogContent
        className="overflow-hidden p-0 max-w-full w-full h-full md:max-w-[740px] md:h-[480px] m-0"
        // hideClose
      >
        <Assistant />
      </DialogContent>
    </Dialog>
  );
}
