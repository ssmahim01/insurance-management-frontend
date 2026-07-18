"use client";

import { useCallback, useState } from "react";

export type GeoStatus =
  | "idle"
  | "requesting"
  | "granted"
  | "denied"
  | "unavailable"
  | "timeout"
  | "ip-requesting"
  | "ip-granted"
  | "ip-failed";

export type LocationSource = "gps" | "ip" | null;

export interface GeoCoords {
  latitude: number;
  longitude: number;
}

export interface GeoState {
  status: GeoStatus;
  coords: GeoCoords | null;
  source: LocationSource;
  errorMessage?: string;
}

const IP_GEOLOCATION_URL = "https://ipapi.co/json/";

export function useGeolocation() {
  const [state, setState] = useState<GeoState>({ status: "idle", coords: null, source: null });

  const requestIpFallback = useCallback(async () => {
    setState((s) => ({ ...s, status: "ip-requesting" }));
    try {
      const res = await fetch(IP_GEOLOCATION_URL);
      if (!res.ok) throw new Error("IP lookup failed");
      const json = await res.json();
      if (typeof json.latitude !== "number" || typeof json.longitude !== "number") {
        throw new Error("Malformed IP location response");
      }
      setState({
        status: "ip-granted",
        coords: { latitude: json.latitude, longitude: json.longitude },
        source: "ip",
      });
    } catch {
      setState({
        status: "ip-failed",
        coords: null,
        source: null,
        errorMessage: "Couldn't determine your approximate location either.",
      });
    }
  }, []);

  const request = useCallback(() => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setState({
        status: "unavailable",
        coords: null,
        source: null,
        errorMessage: "Geolocation is not supported by your browser.",
      });
      requestIpFallback();
      return;
    }

    setState((s) => ({ ...s, status: "requesting" }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          status: "granted",
          coords: { latitude: position.coords.latitude, longitude: position.coords.longitude },
          source: "gps",
        });
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setState({ status: "denied", coords: null, source: null, errorMessage: "Location permission was denied." });
        } else if (err.code === err.TIMEOUT) {
          setState({ status: "timeout", coords: null, source: null, errorMessage: "Location request timed out." });
        } else {
          setState({ status: "unavailable", coords: null, source: null, errorMessage: "Unable to determine your location." });
        }
        // Auto-fallback to IP location whenever GPS fails for any reason.
        requestIpFallback();
      },
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 60_000 },
    );
  }, [requestIpFallback]);

  const setManualCoords = useCallback((coords: GeoCoords) => {
    setState({ status: "granted", coords, source: "ip" });
  }, []);

  return { ...state, request, setManualCoords };
}