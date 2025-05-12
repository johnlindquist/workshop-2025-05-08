"use client";

import type React from "react";
import { useEffect, useState } from "react";

// Only run MSW in development and when specifically enabled (e.g., via env var)
const MSW_ENABLED =
  process.env.NODE_ENV === "development" && process.env.NEXT_PUBLIC_ENABLE_MSW === "true";

function MSWComponent({ children }: { children: React.ReactNode }) {
  const [mswReady, setMswReady] = useState(!MSW_ENABLED); // Assume ready if MSW is disabled

  useEffect(() => {
    async function initMSW() {
      if (MSW_ENABLED) {
        try {
          console.log("Initializing MSW...");
          const { worker } = await import("@/mocks/browser");
          await worker.start({
            onUnhandledRequest: "bypass", // Allow unhandled requests to pass through
          });
          console.log("MSW initialized successfully.");
          setMswReady(true);
        } catch (error) {
          console.error("Failed to initialize MSW:", error);
          setMswReady(true); // Still allow app to render even if MSW fails
        }
      } else {
        setMswReady(true);
      }
    }

    if (!mswReady) {
      initMSW();
    }
  }, [mswReady]); // Rerun if mswReady changes (though it shouldn't)

  // Optionally, render a loading state until MSW is ready
  if (!mswReady) {
    return <div>Loading Mock Service Worker...</div>; // Or null, or a skeleton screen
  }

  return <>{children}</>;
}

export default MSWComponent;
