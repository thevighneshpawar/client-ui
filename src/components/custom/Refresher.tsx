"use client";

import React, { useCallback, useEffect, useRef } from "react";
import * as jose from "jose";

const Refresher = ({ children }: { children: React.ReactNode }) => {
  const timeoutId = useRef<NodeJS.Timeout | null>(null);

  const getAccessToken = async () => {
    const res = await fetch("/api/auth/accessToken");
    if (!res.ok) return null;

    const data = await res.json();
    return data.token as string;
  };

  const scheduleRefresh = useCallback(async (token: string) => {
    const decoded = jose.decodeJwt(token);
    if (!decoded.exp) return; // No expiry, don't schedule

    const exp = decoded.exp * 1000; // ms
    const currentTime = Date.now();
    const refreshTime = exp - currentTime - 5000; // refresh 5s before expiry

    // ✅ If token is already expired, do not schedule
    if (refreshTime <= 0) {
      console.log("Token already expired or too close to expiry.");
      return;
    }

    console.log(
      `Scheduling refresh in ${refreshTime / 1000}s at ${new Date(
        currentTime + refreshTime
      ).toISOString()}`
    );

    timeoutId.current = setTimeout(() => {
      refreshAccessToken();
    }, refreshTime);
  }, []);

  const refreshAccessToken = useCallback(async () => {
    try {
      const res = await fetch("/api/auth/refresh", { method: "POST" });
      if (!res.ok) {
        console.warn("Failed to refresh access token");
        return;
      }

      const newToken = await getAccessToken();
      if (newToken) {
        scheduleRefresh(newToken);
        console.log("Access token refreshed successfully.");
      }
    } catch (err) {
      console.error("Error while refreshing the token", err);
    }
  }, [scheduleRefresh]);

  useEffect(() => {
    let isMounted = true;

    getAccessToken().then((token) => {
      if (token && isMounted) scheduleRefresh(token);
    });

    return () => {
      isMounted = false;
      if (timeoutId.current) clearTimeout(timeoutId.current);
    };
  }, [scheduleRefresh]);

  return <>{children}</>;
};

export default Refresher;
