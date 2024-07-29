import { createLazyFileRoute } from "@tanstack/react-router";

export const Route = createLazyFileRoute("/")({
  component: () => (
    <div className="mx-auto max-w-screen-lg grid gap-2">
      <h1 className="font-bold text-2xl">Combobox Demo</h1>
      <p className="text-muted-foreground text-sm">
        The following examples are provided strictly for research and
        development purposes and are not intended for direct use in production
        environments. These implementations serve as a means to explore and
        analyze the behavior and functionality of various combobox libraries.
      </p>
    </div>
  ),
});
