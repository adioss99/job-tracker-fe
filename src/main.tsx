import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { RouterProvider } from "react-router";

import "./index.css";
import { ErrorBoundary } from "@/components/error-boundary";

import { AuthProvider } from "@/context/auth-context";
import { appRouter } from "@/routes";

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

createRoot(document.getElementById("app-root")!).render(
  <StrictMode>
    <ErrorBoundary>
      <AuthProvider>
        <QueryClientProvider client={queryClient}>
          <RouterProvider router={appRouter} />
        </QueryClientProvider>
      </AuthProvider>
    </ErrorBoundary>
  </StrictMode>
);
