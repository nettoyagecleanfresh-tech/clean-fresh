import { QueryClient } from "@tanstack/react-query";
import { createRouter } from "@tanstack/react-router";
import { routeTree } from "./routeTree.gen";

export const getRouter = () => {
  const queryClient = new QueryClient();

  const router = createRouter({
    routeTree,
    context: { queryClient },
    scrollRestoration: true,
    // Prepare only the destination the visitor is pointing at / touching.
    defaultPreload: "intent",
    defaultPreloadDelay: 50,
    defaultPendingMinMs: 0,
    defaultPreloadStaleTime: 0,
  });

  return router;
};
