import { Link, Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <>
      <div className="flex gap-2 p-2">
        <Link to="/ariakit" className="data-[status=active]:font-bold">
          Ariakit
        </Link>
        <Link to="/cmdk" className="data-[status=active]:font-bold">
          Cmdk
        </Link>
        <Link to="/downshift" className="data-[status=active]:font-bold">
          Downshift
        </Link>
        <Link to="/material-ui" className="data-[status=active]:font-bold">
          Material UI
        </Link>
        <Link to="/react-aria" className="data-[status=active]:font-bold">
          React Aria (Components)
        </Link>
      </div>
      <hr />
      <Outlet />
      <TanStackRouterDevtools />
    </>
  ),
});
