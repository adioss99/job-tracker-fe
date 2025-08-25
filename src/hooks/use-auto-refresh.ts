// use-auto-refresh.tsx
"use client";

import { useEffect } from "react";

import { useGetRefreshToken } from "@/hooks/use-auth";

export function useAutoRefresh() {
  const { mutateAsync: getRefreshToken } = useGetRefreshToken();
  useEffect(() => {
    const interval = setInterval(
      async () => {
        try {
          await getRefreshToken();
          console.log("token refreshed");
        } catch (err) {
          throw new Error("❌ refresh error" + err);
        }
      },
      (14 * 60 + 45) * 1000
    );
    return () => {
      clearInterval(interval);
    };
  }, [getRefreshToken]);
}
