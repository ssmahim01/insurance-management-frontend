"use client";

import { useCallback, useState } from "react";

export type GeoStatus = "idle" | "requesting" | "granted" | "denied" | "unavailable" | "timeout";

export interface GeoCoords {
  latitude: number;
  longitude: number;
}

export interface GeoState {
  status: GeoStatus;
  coords: GeoCoords | null;
  errorMessage?: string;
}

export function useGeolocation() {
  const [state, setState] = useState<GeoState>({ status: "idle", coords: null });

  const request = useCallback(() => {
    if (typeof window === "undefined" || !navigator.geolocation) {
      setState({
        status: "unavailable",
        coords: null,
        errorMessage: "Geolocation is not supported by your browser.",
      });
      return;
    }

    setState((s) => ({ ...s, status: "requesting" }));

    navigator.geolocation.getCurrentPosition(
      (position) => {
        setState({
          status: "granted",
          coords: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
          },
        });
      },
      (err) => {
        if (err.code === err.PERMISSION_DENIED) {
          setState({ status: "denied", coords: null, errorMessage: "Location permission was denied." });
        } else if (err.code === err.TIMEOUT) {
          setState({ status: "timeout", coords: null, errorMessage: "Location request timed out." });
        } else {
          setState({ status: "unavailable", coords: null, errorMessage: "Unable to determine your location." });
        }
      },
      { enableHighAccuracy: true, timeout: 10_000, maximumAge: 60_000 },
    );
  }, []);

  return { ...state, request };
}