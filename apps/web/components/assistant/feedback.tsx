// import { sendFeebackAction } from "@/actions/send-feedback-action";
import { Button } from "@/components/ui/button";
// import { Icons } from "@/components/ui/icons";
import { Textarea } from "@/components/ui/textarea";
import { ArrowBigLeft, Loader2 } from "lucide-react";
// import { useAction } from "next-safe-action/hooks";
import { useState } from "react";

type Props = {
  onClose: () => void;
};

export function AssistantFeedback({ onClose }: Props) {
  const [value, setValue] = useState("");

  return (
    <div className="h-full absolute top-0 left-0 right-0 bottom-0 z-[100] bg-background">
      <div className="p-5 flex items-center space-x-3">
        <button
          type="button"
          className="items-center border bg-accent p-1"
          onClick={onClose}
        >
          <ArrowBigLeft />
        </button>
        <h2>Send Feedback</h2>
      </div>
      <div className="p-4">
        <form className="space-y-4">
          <Textarea
            name="feedback"
            value={value}
            required
            autoFocus
            placeholder="Your feedback..."
            className="min-h-[320px] resize-none"
            onChange={(evt) => setValue(evt.target.value)}
          />
        </form>
      </div>
    </div>
  );
}
