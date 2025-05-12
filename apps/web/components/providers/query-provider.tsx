"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React from "react";
// import { ReactQueryDevtools } from "@tanstack/react-query-devtools"; // Optional

function QueryProvider({ children }: { children: React.ReactNode }) {
  // Create a new QueryClient instance for each request to avoid sharing data
  // between users/requests, which can lead to unexpected behavior.
  const [queryClient] = React.useState(() => new QueryClient());

  return (
    <QueryClientProvider client={queryClient}>
      {children}
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </QueryClientProvider>
  );
}

export default QueryProvider;
