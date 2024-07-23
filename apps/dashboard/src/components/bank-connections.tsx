"use client";

import { manualSyncTransactionsAction } from "@/actions/transactions/manual-sync-transactions-action";
import { connectionStatus } from "@/utils/connection-status";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@midday/ui/accordion";
import { Icons } from "@midday/ui/icons";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@midday/ui/tooltip";
import { differenceInDays, formatDistanceToNow } from "date-fns";
import { Loader2 } from "lucide-react";
import { useAction } from "next-safe-action/hooks";
import { useState } from "react";
import { BankAccount } from "./bank-account";
import { BankLogo } from "./bank-logo";
import { ReconnectProvider } from "./reconnect-provider";
import { SyncTransactions } from "./sync-transactions";

interface BankConnectionProps {
  connection: {
    id: string;
    name: string;
    logo_url: string;
    provider: string;
    expires_at?: string;
    enrollment_id: string | null;
    institution_id: string;
    last_accessed?: string;
    access_token: string | null;
    error?: string;
    error_code?: string;
    accounts: Array<{
      id: string;
      name: string;
      enabled: boolean;
      manual: boolean;
      currency: string;
      balance?: number;
      type: string;
    }>;
  };
}

function ConnectionState({ connection, isSyncing }) {
  const { show, expired } = connectionStatus(connection);

  if (isSyncing) {
    return (
      <div className="text-xs font-normal flex items-center space-x-1">
        <Loader2 className="size-3.5 animate-spin" />
        <span>Syncing...</span>
      </div>
    );
  }

  if (connection.error) {
    switch (connection.error_code) {
      case "AUTH_ERROR":
        return (
          <>
            <div className="text-xs font-normal flex items-center space-x-1 text-[#FFD02B]">
              <Icons.AlertCircle />
              <span>Syncing issue detected</span>
            </div>

            <TooltipContent
              className="px-3 py-1.5 text-xs max-w-[430px]"
              sideOffset={20}
              side="left"
            >
              The login details for this connection have changed (credentials,
              MFA, or similar) restore the connection to a good state.
            </TooltipContent>
          </>
        );

      default:
        return null;
    }
  }

  if (show) {
    return (
      <>
        <div className="text-xs font-normal flex items-center space-x-1 text-[#FFD02B]">
          <Icons.AlertCircle />
          <span>Connection expires soon</span>
        </div>

        {connection.expires_at && (
          <TooltipContent
            className="px-3 py-1.5 text-xs max-w-[430px]"
            sideOffset={20}
            side="left"
          >
            We only have access to your bank for another{" "}
            {differenceInDays(new Date(connection.expires_at), new Date())}{" "}
            days. Please update the connection to keep everything in sync.
          </TooltipContent>
        )}
      </>
    );
  }

  if (expired) {
    return (
      <div className="text-xs font-normal flex items-center space-x-1 text-[#c33839]">
        <Icons.Error />
        <span>Connection expired</span>
      </div>
    );
  }

  if (connection.last_accessed) {
    return (
      <span className="text-xs font-normal">{`Updated ${formatDistanceToNow(
        new Date(connection.last_accessed),
      )} ago`}</span>
    );
  }

  return <div className="text-xs font-normal">Never accessed</div>;
}

export function BankConnection({ connection }: BankConnectionProps) {
  const [eventId, setEventId] = useState<string>();
  const [isSyncing, setSyncing] = useState(false);

  const manualSyncTransactions = useAction(manualSyncTransactionsAction, {
    onExecute: () => setSyncing(true),
    onSuccess: (data) => {
      if (data.id) {
        setEventId(data.id);
      }

      setTimeout(() => {
        // NOTE: Wait to event status is EXECUTING
        setSyncing(false);
      }, 1500);
    },
  });

  return (
    <div>
      <div className="flex justify-between items-center">
        <AccordionTrigger
          className="justify-start text-start w-full"
          chevronBefore
        >
          <div className="flex space-x-4 items-center ml-4 w-full">
            <BankLogo src={connection.logo_url} alt={connection.name} />

            <div className="flex flex-col">
              <span className="text-sm">{connection.name}</span>

              <TooltipProvider delayDuration={70}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <div>
                      <ConnectionState
                        connection={connection}
                        isSyncing={isSyncing}
                      />
                    </div>
                  </TooltipTrigger>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
        </AccordionTrigger>

        <div className="ml-auto flex space-x-2">
          <ReconnectProvider
            provider={connection.provider}
            enrollmentId={connection.enrollmentId}
            institutionId={connection.institution_id}
            accessToken={connection.access_token}
          />
          <SyncTransactions
            eventId={eventId}
            isSyncing={isSyncing}
            onClick={() =>
              manualSyncTransactions.execute({ connectionId: connection.id })
            }
          />
        </div>
      </div>

      <AccordionContent className="bg-background">
        <div className="ml-[30px] divide-y">
          {connection.accounts.map((account) => {
            return (
              <BankAccount
                key={account.id}
                id={account.id}
                name={account.name}
                enabled={account.enabled}
                manual={account.manual}
                currency={account.currency}
                balance={account.balance ?? 0}
                type={account.type}
              />
            );
          })}
        </div>
      </AccordionContent>
    </div>
  );
}

export function BankConnections({ data }) {
  const defaultValue = data.length === 1 ? ["connection-0"] : undefined;

  return (
    <div className="px-6 pb-6 space-y-6 divide-y">
      <Accordion type="multiple" className="w-full" defaultValue={defaultValue}>
        {data.map((connection, index) => {
          return (
            <AccordionItem
              value={`connection-${index}`}
              key={connection.id}
              className="border-none"
            >
              <BankConnection connection={connection} />
            </AccordionItem>
          );
        })}
      </Accordion>
    </div>
  );
}