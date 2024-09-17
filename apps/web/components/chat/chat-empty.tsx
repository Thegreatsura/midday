// import { Icons } from "@midday/ui/icons";

import { LogOut } from "lucide-react";

type Props = {
  firstName: string;
};

export function ChatEmpty({ firstName }: Props) {
  return (
    <div className="w-full mt-[200px] todesktop:mt-24 md:mt-24 flex flex-col items-center justify-center text-center">
      <LogOut />
      <span className="font-medium text-xl mt-6">
        Hi {firstName}, how can I help <br />
        you today?
      </span>
    </div>
  );
}
