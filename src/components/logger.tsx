import { Console, Hook, Unhook } from "console-feed";
import type { Message as ComponentMessage } from "console-feed/lib/definitions/Component";
import type { Message as ConsoleMessage } from "console-feed/lib/definitions/Console";
import { useEffect, useState } from "react";

export const Logger = () => {
  const [logs, setLogs] = useState<ConsoleMessage[]>([]);

  useEffect(() => {
    const hookedConsole = Hook(
      window.console,
      (log) => setLogs((currLogs) => [...currLogs, log]),
      false,
      10
    );

    return () => {
      Unhook(hookedConsole);
    };
  }, []);

  return <Console logs={logs as ComponentMessage[]} />;
};
