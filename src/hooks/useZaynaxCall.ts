
// "use client";

// import { ConsultationStatus, useInitiateConsultationMutation, useUpdateConsultationStatusMutation } from "@/redux/features/consultant/consultant.api";
// import { useCallback, useRef, useState } from "react";
// import { io, Socket } from "socket.io-client";


// declare global {
//   interface Window {
//     JitsiMeetExternalAPI: any;
//   }
// }

// type CallStage =
//   | "idle"
//   | "initiating"
//   | "ringing"
//   | "accepted"
//   | "rejected"
//   | "timeout"
//   | "in-call"
//   | "ended"
//   | "error";

// interface DoctorInfo {
//   firstName: { en: string; bn: string };
//   lastName: { en: string; bn: string };
//   image: string;
// }

// const ZAYNAX_SOCKET_URL = process.env.NEXT_PUBLIC_ZAYNAX_SOCKET_URL || "https://api.zaynax.health";
// const RING_TIMEOUT_MS = 30_000;

// export function useZaynaxCall(jitsiContainerId: string) {
//   const [stage, setStage] = useState<CallStage>("idle");
//   const [doctorInfo, setDoctorInfo] = useState<DoctorInfo | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);

//   const [initiateConsultation] = useInitiateConsultationMutation();
//   const [updateStatus] = useUpdateConsultationStatusMutation();

//   const socketRef = useRef<Socket | null>(null);
//   const stageRef = useRef<CallStage>("idle");
//   const ringTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const sessionRef = useRef<{ consultationId: string; roomId: string; orderID: string } | null>(null);
//   const jitsiApiRef = useRef<any>(null);

//   const setStageBoth = useCallback((s: CallStage) => {
//     stageRef.current = s;
//     setStage(s);
//   }, []);

//   const reportStatus = useCallback(
//     (
//       status: ConsultationStatus,
//       extra?: { callStartedAt?: string; callEndedAt?: string; prescriptionUrl?: string },
//     ) => {
//       const s = sessionRef.current;
//       if (!s) return;
//       // Best-effort audit log — don't block the call flow if this fails.
//       updateStatus({ id: s.consultationId, status, ...extra }).catch(() => { });
//     },
//     [updateStatus],
//   );

//   const clearRingTimeout = useCallback(() => {
//     if (ringTimeoutRef.current) {
//       clearTimeout(ringTimeoutRef.current);
//       ringTimeoutRef.current = null;
//     }
//   }, []);

//   const cleanupSocket = useCallback(() => {
//     clearRingTimeout();
//     socketRef.current?.disconnect();
//     socketRef.current = null;
//   }, [clearRingTimeout]);

//   const joinJitsi = useCallback(
//     (roomId: string) => {
//       if (!window.JitsiMeetExternalAPI) {
//         setErrorMessage("Video call could not load, please refresh and try again.");
//         setStageBoth("error");
//         return;
//       }

//       jitsiApiRef.current = new window.JitsiMeetExternalAPI("meet.zaynax.health", {
//         roomName: roomId,
//         parentNode: document.getElementById(jitsiContainerId),
//         width: "100%",
//         height: "100%",
//       });
//       setStageBoth("in-call");
//     },
//     [jitsiContainerId, setStageBoth],
//   );


//   const startCall = useCallback(async () => {
//     setStageBoth("initiating");
//     setErrorMessage(null);

//     try {
//       const res = await initiateConsultation().unwrap();
//       const { consultationId, roomId, orderID, doctorInfo: doctor, zaynaxAuthToken } = res.data;

//       console.log("room id is ", roomId)
//       sessionRef.current = { consultationId, roomId, orderID };
//       setDoctorInfo(doctor);

//       const socket = io(ZAYNAX_SOCKET_URL, {
//         query: { auth: zaynaxAuthToken },
//         transports: ["websocket"],
//       });
//       socketRef.current = socket;

//       socket.on("connect", () => {
//         socket.emit("PATIENT_OUTGOING_CALL", { orderID, roomID: roomId });
//         setStageBoth("ringing");
//         reportStatus(ConsultationStatus.RINGING);

//         ringTimeoutRef.current = setTimeout(() => {
//           if (stageRef.current === "ringing") {
//             setStageBoth("timeout");
//             reportStatus(ConsultationStatus.TIMEOUT);
//             socket.emit("PATIENT_CALL_CANCELLED", { roomID: roomId });
//             cleanupSocket();
//           }
//         }, RING_TIMEOUT_MS);
//       });

//       socket.on("DOCTOR_CALL_ACCEPTED", () => {
//         clearRingTimeout();
//         setStageBoth("accepted");
//         reportStatus(ConsultationStatus.ACCEPTED, { callStartedAt: new Date().toISOString() });
//         joinJitsi(roomId);
//       });

//       socket.on("DOCTOR_CALL_REJECTED", () => {
//         clearRingTimeout();
//         setStageBoth("rejected");
//         reportStatus(ConsultationStatus.REJECTED);
//         cleanupSocket();
//       });

//       socket.on("DOCTOR_OFFLINE", () => {
//         clearRingTimeout();
//         setStageBoth("rejected");
//         reportStatus(ConsultationStatus.FAILED);
//         cleanupSocket();
//       });

//       socket.on("connect_error", () => {
//         setErrorMessage("Could not connect to the doctor call service.");
//         setStageBoth("error");
//         cleanupSocket();
//       });
//     } catch (err: any) {
//       setErrorMessage(err?.data?.message ?? "Could not start consultation");
//       setStageBoth("error");
//     }
//   }, [cleanupSocket, clearRingTimeout, initiateConsultation, joinJitsi, reportStatus, setStageBoth]);

//   const cancelCall = useCallback(() => {
//     const s = sessionRef.current;
//     if (s && socketRef.current) {
//       socketRef.current.emit("PATIENT_CALL_CANCELLED", { roomID: s.roomId });
//     }
//     reportStatus(ConsultationStatus.CANCELLED);
//     cleanupSocket();
//     setStageBoth("idle");
//   }, [cleanupSocket, reportStatus, setStageBoth]);

//   const endCall = useCallback(() => {
//     jitsiApiRef.current?.dispose();
//     jitsiApiRef.current = null;
//     reportStatus(ConsultationStatus.COMPLETED, { callEndedAt: new Date().toISOString() });
//     cleanupSocket();
//     setStageBoth("ended");
//   }, [cleanupSocket, reportStatus, setStageBoth]);

//   return { stage, doctorInfo, errorMessage, startCall, cancelCall, endCall };
// }


// -------------------------------------------------------------
// With doctor call 


// "use client";

// import { ConsultationStatus, useInitiateConsultationMutation, useUpdateConsultationStatusMutation } from "@/redux/features/consultant/consultant.api";
// import { useCallback, useEffect, useRef, useState } from "react";
// import { io, Socket } from "socket.io-client";


// declare global {
//   interface Window {
//     JitsiMeetExternalAPI: any;
//   }
// }

// type CallStage =
//   | "idle"
//   | "initiating"
//   | "ringing"
//   | "accepted"
//   | "rejected"
//   | "timeout"
//   | "in-call"
//   | "ended"
//   | "error";

// interface DoctorInfo {
//   firstName: { en: string; bn: string };
//   lastName: { en: string; bn: string };
//   image: string;
// }

// // Payload for INCOMING_CALL_FROM_DOCTOR, per Zaynax's socket event docs.
// interface IncomingCall {
//   doctorID: string;
//   doctorName: string;
//   docImage: string;
//   roomID: string;
//   orderID: string;
// }

// const ZAYNAX_SOCKET_URL = process.env.NEXT_PUBLIC_ZAYNAX_SOCKET_URL || "https://api.zaynax.health";
// const RING_TIMEOUT_MS = 30_000;

// // Toggle this off once the callback flow is confirmed working — it's
// // deliberately verbose for debugging the doctor-callback path.
// const DEBUG = true;
// const log = (...args: any[]) => {
//   if (DEBUG) console.log("[ZaynaxCall]", ...args);
// };

// export function useZaynaxCall(jitsiContainerId: string) {
//   const [stage, setStage] = useState<CallStage>("idle");
//   const [doctorInfo, setDoctorInfo] = useState<DoctorInfo | null>(null);
//   const [errorMessage, setErrorMessage] = useState<string | null>(null);
//   const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);

//   const [initiateConsultation] = useInitiateConsultationMutation();
//   const [updateStatus] = useUpdateConsultationStatusMutation();

//   const socketRef = useRef<Socket | null>(null);
//   const stageRef = useRef<CallStage>("idle");
//   const ringTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
//   const sessionRef = useRef<{ consultationId: string; roomId: string; orderID: string } | null>(null);
//   const jitsiApiRef = useRef<any>(null);

//   const setStageBoth = useCallback((s: CallStage) => {
//     log("stage:", stageRef.current, "->", s);
//     stageRef.current = s;
//     setStage(s);
//   }, []);

//   const reportStatus = useCallback(
//     (
//       status: ConsultationStatus,
//       extra?: { callStartedAt?: string; callEndedAt?: string; prescriptionUrl?: string },
//     ) => {
//       const s = sessionRef.current;
//       if (!s) {
//         log("reportStatus skipped (no active session):", status);
//         return;
//       }
//       log("reportStatus:", status, extra ?? "");
//       // Best-effort audit log — don't block the call flow if this fails.
//       updateStatus({ id: s.consultationId, status, ...extra }).catch((err) => {
//         log("reportStatus FAILED:", status, err);
//       });
//     },
//     [updateStatus],
//   );

//   const clearRingTimeout = useCallback(() => {
//     if (ringTimeoutRef.current) {
//       clearTimeout(ringTimeoutRef.current);
//       ringTimeoutRef.current = null;
//     }
//   }, []);

//   const cleanupSocket = useCallback((reason: string) => {
//     log("cleanupSocket:", reason);
//     clearRingTimeout();
//     socketRef.current?.disconnect();
//     socketRef.current = null;
//   }, [clearRingTimeout]);

//   const joinJitsi = useCallback(
//     (roomId: string) => {
//       log("joinJitsi:", roomId);
//       if (!window.JitsiMeetExternalAPI) {
//         setErrorMessage("Video call could not load, please refresh and try again.");
//         setStageBoth("error");
//         return;
//       }

//       jitsiApiRef.current = new window.JitsiMeetExternalAPI("meet.zaynax.health", {
//         roomName: roomId,
//         parentNode: document.getElementById(jitsiContainerId),
//         width: "100%",
//         height: "100%",
//       });
//       setStageBoth("in-call");
//     },
//     [jitsiContainerId, setStageBoth],
//   );

//   // Wires the doctor-callback listeners onto a live socket. These stay
//   // active for the socket's whole lifetime (not just while "ringing") —
//   // a callback can arrive any time after the first outgoing attempt.
//   const registerIncomingCallListeners = useCallback((socket: Socket) => {
//     socket.on("INCOMING_CALL_FROM_DOCTOR", (payload: IncomingCall) => {
//       log("📞 INCOMING_CALL_FROM_DOCTOR received:", payload);
//       setIncomingCall(payload);
//     });

//     socket.on("INCOMING_CALL_CANCELLED", () => {
//       log("INCOMING_CALL_CANCELLED received");
//       setIncomingCall(null);
//     });

//     socket.on("disconnect", (reason) => {
//       log("❌ socket disconnected. reason:", reason);
//     });

//     socket.on("reconnect", (attempt) => {
//       log("🔄 socket reconnected after", attempt, "attempt(s)");
//     });

//     socket.on("reconnect_attempt", (attempt) => {
//       log("🔁 socket reconnect_attempt #", attempt);
//     });

//     socket.on("error", (err) => {
//       log("⚠️ socket error event:", err);
//     });
//   }, []);

//   const startCall = useCallback(async () => {
//     setStageBoth("initiating");
//     setErrorMessage(null);

//     try {
//       const res = await initiateConsultation().unwrap();
//       const { consultationId, roomId, orderID, doctorInfo: doctor, zaynaxAuthToken } = res.data;

//       log("initiateConsultation ok:", { consultationId, roomId, orderID });
//       sessionRef.current = { consultationId, roomId, orderID };
//       setDoctorInfo(doctor);

//       const socket = io(ZAYNAX_SOCKET_URL, {
//         query: { auth: zaynaxAuthToken },
//         transports: ["websocket"],
//       });
//       socketRef.current = socket;
//       registerIncomingCallListeners(socket);

//       socket.on("connect", () => {
//         log("✅ socket connected. id:", socket.id);
//         socket.emit("PATIENT_OUTGOING_CALL", { orderID, roomID: roomId });
//         log("emitted PATIENT_OUTGOING_CALL:", { orderID, roomID: roomId });
//         setStageBoth("ringing");
//         reportStatus(ConsultationStatus.RINGING);

//         ringTimeoutRef.current = setTimeout(() => {
//           if (stageRef.current === "ringing") {
//             log("⏱ ring timeout reached — NOT cancelling the call on Zaynax's side, so a doctor callback can still come through");
//             setStageBoth("timeout");
//             reportStatus(ConsultationStatus.TIMEOUT);
//             // Deliberately NOT emitting PATIENT_CALL_CANCELLED here — that
//             // event cancels the call channel on Zaynax's side, which would
//             // stop INCOMING_CALL_FROM_DOCTOR from ever arriving for a
//             // later doctor callback on this same booking.
//             // Socket also stays connected (no cleanupSocket()) for the
//             // same reason.
//           }
//         }, RING_TIMEOUT_MS);
//       });

//       socket.on("DOCTOR_CALL_ACCEPTED", () => {
//         log("DOCTOR_CALL_ACCEPTED received");
//         clearRingTimeout();
//         setStageBoth("accepted");
//         reportStatus(ConsultationStatus.ACCEPTED, { callStartedAt: new Date().toISOString() });
//         joinJitsi(roomId);
//       });

//       socket.on("DOCTOR_CALL_REJECTED", () => {
//         log("DOCTOR_CALL_REJECTED received");
//         clearRingTimeout();
//         setStageBoth("rejected");
//         reportStatus(ConsultationStatus.REJECTED);
//         // Socket stays connected — doctor may call back on this booking.
//       });

//       socket.on("DOCTOR_OFFLINE", () => {
//         log("DOCTOR_OFFLINE received");
//         clearRingTimeout();
//         setStageBoth("rejected");
//         reportStatus(ConsultationStatus.FAILED);
//         // Socket stays connected — doctor may come back online and call.
//       });

//       socket.on("connect_error", (err) => {
//         log("connect_error:", err.message);
//         setErrorMessage("Could not connect to the doctor call service.");
//         setStageBoth("error");
//         cleanupSocket("connect_error");
//       });
//     } catch (err: any) {
//       log("startCall FAILED:", err);
//       setErrorMessage(err?.data?.message ?? "Could not start consultation");
//       setStageBoth("error");
//     }
//   }, [cleanupSocket, clearRingTimeout, initiateConsultation, joinJitsi, registerIncomingCallListeners, reportStatus, setStageBoth]);

//   // Patient explicitly gives up — the one place (besides endCall) where a
//   // full disconnect is correct, since the patient is opting out entirely.
//   const cancelCall = useCallback(() => {
//     const s = sessionRef.current;
//     if (s && socketRef.current) {
//       socketRef.current.emit("PATIENT_CALL_CANCELLED", { roomID: s.roomId });
//       log("emitted PATIENT_CALL_CANCELLED (explicit patient cancel):", s.roomId);
//     }
//     reportStatus(ConsultationStatus.CANCELLED);
//     cleanupSocket("patient cancelled");
//     setIncomingCall(null);
//     setStageBoth("idle");
//   }, [cleanupSocket, reportStatus, setStageBoth]);

//   const endCall = useCallback(() => {
//     jitsiApiRef.current?.dispose();
//     jitsiApiRef.current = null;
//     reportStatus(ConsultationStatus.COMPLETED, { callEndedAt: new Date().toISOString() });
//     cleanupSocket("call ended");
//     setStageBoth("ended");
//   }, [cleanupSocket, reportStatus, setStageBoth]);

//   // Doctor is calling back on the existing booking — patient accepts.
//   const acceptIncomingCall = useCallback(() => {
//     if (!incomingCall || !socketRef.current) {
//       log("acceptIncomingCall called but no incomingCall/socket — ignoring");
//       return;
//     }

//     log("accepting incoming call:", incomingCall);
//     socketRef.current.emit("PATIENT_CALL_ACCEPTED", {
//       doctorID: incomingCall.doctorID,
//       roomID: incomingCall.roomID,
//     });

//     setDoctorInfo({
//       firstName: { en: incomingCall.doctorName, bn: "" },
//       lastName: { en: "", bn: "" },
//       image: incomingCall.docImage,
//     });

//     reportStatus(ConsultationStatus.ACCEPTED, { callStartedAt: new Date().toISOString() });
//     joinJitsi(incomingCall.roomID);
//     setIncomingCall(null);
//   }, [incomingCall, joinJitsi, reportStatus]);

//   // Doctor is calling back — patient declines. Socket stays connected in
//   // case the doctor tries again.
//   const rejectIncomingCall = useCallback(() => {
//     if (!incomingCall || !socketRef.current) {
//       log("rejectIncomingCall called but no incomingCall/socket — ignoring");
//       return;
//     }

//     log("rejecting incoming call:", incomingCall);
//     socketRef.current.emit("PATIENT_CALL_REJECTED", {
//       doctorID: incomingCall.doctorID,
//       roomID: incomingCall.roomID,
//     });

//     reportStatus(ConsultationStatus.REJECTED);
//     setIncomingCall(null);
//   }, [incomingCall, reportStatus]);

//   // Disconnect on unmount so we don't leak a live socket connection.
//   useEffect(() => {
//     return () => {
//       cleanupSocket("component unmounted");
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, []);

//   return {
//     stage,
//     doctorInfo,
//     errorMessage,
//     startCall,
//     cancelCall,
//     endCall,
//     incomingCall,
//     acceptIncomingCall,
//     rejectIncomingCall,
//   };
// }



// update with doctor to patient call  version 2
"use client";

import {
  ConsultationStatus,
  useGetActiveConsultationQuery,
  useInitiateConsultationMutation,
  useUpdateConsultationStatusMutation,
} from "@/redux/features/consultant/consultant.api";
import { useCallback, useEffect, useRef, useState } from "react";
import { io, Socket } from "socket.io-client";


declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

type CallStage =
  | "idle"
  | "initiating"
  | "ringing"
  | "accepted"
  | "rejected"
  | "timeout"
  | "in-call"
  | "ended"
  | "error";

interface DoctorInfo {
  firstName: { en: string; bn: string };
  lastName: { en: string; bn: string };
  image: string;
}

interface IncomingCall {
  doctorID: string;
  doctorName: string;
  docImage: string;
  roomID: string;
  orderID: string;
}

const ZAYNAX_SOCKET_URL = process.env.NEXT_PUBLIC_ZAYNAX_SOCKET_URL || "https://api.zaynax.health";
const RING_TIMEOUT_MS = 30_000;

const DEBUG = true;
const log = (...args: any[]) => {
  if (DEBUG) console.log("[ZaynaxCall]", ...args);
};

export function useZaynaxCall(jitsiContainerId: string) {
  const [stage, setStage] = useState<CallStage>("idle");
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [incomingCall, setIncomingCall] = useState<IncomingCall | null>(null);

  const [initiateConsultation] = useInitiateConsultationMutation();
  const [updateStatus] = useUpdateConsultationStatusMutation();

  // Checked once on mount — if the customer has a booking from an earlier
  // attempt that's still "callback eligible" (see backend
  // CALLBACK_ELIGIBLE_STATUSES), this lets us proactively reconnect and
  // listen, instead of only listening while stage is "ringing".
  const { data: activeRes } = useGetActiveConsultationQuery();

  const socketRef = useRef<Socket | null>(null);
  const stageRef = useRef<CallStage>("idle");
  const ringTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sessionRef = useRef<{ consultationId: string; roomId: string; orderID: string } | null>(null);
  const jitsiApiRef = useRef<any>(null);

  const setStageBoth = useCallback((s: CallStage) => {
    log("stage:", stageRef.current, "->", s);
    stageRef.current = s;
    setStage(s);
  }, []);

  const reportStatus = useCallback(
    (
      status: ConsultationStatus,
      extra?: { callStartedAt?: string; callEndedAt?: string; prescriptionUrl?: string },
    ) => {
      const s = sessionRef.current;
      if (!s) {
        log("reportStatus skipped (no active session):", status);
        return;
      }
      log("reportStatus:", status, extra ?? "");
      updateStatus({ id: s.consultationId, status, ...extra }).catch((err) => {
        log("reportStatus FAILED:", status, err);
      });
    },
    [updateStatus],
  );

  const clearRingTimeout = useCallback(() => {
    if (ringTimeoutRef.current) {
      clearTimeout(ringTimeoutRef.current);
      ringTimeoutRef.current = null;
    }
  }, []);

  const cleanupSocket = useCallback((reason: string) => {
    log("cleanupSocket:", reason);
    clearRingTimeout();
    socketRef.current?.disconnect();
    socketRef.current = null;
  }, [clearRingTimeout]);

  const joinJitsi = useCallback(
    (roomId: string) => {
      log("joinJitsi:", roomId);
      if (!window.JitsiMeetExternalAPI) {
        setErrorMessage("Video call could not load, please refresh and try again.");
        setStageBoth("error");
        return;
      }

      jitsiApiRef.current = new window.JitsiMeetExternalAPI("meet.zaynax.health", {
        roomName: roomId,
        parentNode: document.getElementById(jitsiContainerId),
        width: "100%",
        height: "100%",
      });
      setStageBoth("in-call");
    },
    [jitsiContainerId, setStageBoth],
  );

  // Shared listener wiring for both an outgoing call socket and a
  // reconnect-to-listen socket. `roomId`/`orderID` are closed over so
  // DOCTOR_CALL_ACCEPTED/REJECTED can join/report against the right call.
  const registerListeners = useCallback(
    (socket: Socket, roomId: string, orderID: string) => {
      socket.on("disconnect", (reason) => log("❌ socket disconnected. reason:", reason));
      socket.on("reconnect", (attempt) => log("🔄 socket reconnected after", attempt, "attempt(s)"));
      socket.on("reconnect_attempt", (attempt) => log("🔁 reconnect_attempt #", attempt));
      socket.on("error", (err) => log("⚠️ socket error event:", err));

      socket.on("INCOMING_CALL_FROM_DOCTOR", (payload: IncomingCall) => {
        log("📞 INCOMING_CALL_FROM_DOCTOR received:", payload);
        setIncomingCall(payload);
      });

      socket.on("INCOMING_CALL_CANCELLED", () => {
        log("INCOMING_CALL_CANCELLED received");
        setIncomingCall(null);
      });

      socket.on("DOCTOR_CALL_ACCEPTED", () => {
        log("DOCTOR_CALL_ACCEPTED received");
        clearRingTimeout();
        setStageBoth("accepted");
        reportStatus(ConsultationStatus.ACCEPTED, { callStartedAt: new Date().toISOString() });
        joinJitsi(roomId);
      });

      socket.on("DOCTOR_CALL_REJECTED", () => {
        log("DOCTOR_CALL_REJECTED received");
        clearRingTimeout();
        setStageBoth("rejected");
        reportStatus(ConsultationStatus.REJECTED);
        // Socket stays connected — doctor may call back.
      });

      socket.on("DOCTOR_OFFLINE", () => {
        log("DOCTOR_OFFLINE received");
        clearRingTimeout();
        setStageBoth("rejected");
        reportStatus(ConsultationStatus.FAILED);
        // Socket stays connected — doctor may come back online and call.
      });
    },
    [clearRingTimeout, joinJitsi, reportStatus, setStageBoth],
  );

  // On mount: if there's a booking still eligible for a callback, silently
  // reconnect and start listening — no PATIENT_OUTGOING_CALL is emitted,
  // this is listen-only until/unless the doctor calls in.
  useEffect(() => {
    if (!activeRes?.data || sessionRef.current || socketRef.current) return;

    const { consultationId, roomId, orderID, zaynaxAuthToken } = activeRes.data;
    log("resuming listener for existing booking:", { consultationId, roomId });

    sessionRef.current = { consultationId, roomId, orderID: orderID ?? "" };

    const socket = io(ZAYNAX_SOCKET_URL, {
      query: { auth: zaynaxAuthToken },
      transports: ["websocket"],
    });
    socketRef.current = socket;
    registerListeners(socket, roomId, orderID ?? "");

    socket.on("connect", () => {
      log("✅ (resume) socket connected. id:", socket.id);
    });

    socket.on("connect_error", (err) => {
      log("(resume) connect_error:", err.message);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activeRes]);

  const startCall = useCallback(async () => {
    setStageBoth("initiating");
    setErrorMessage(null);

    try {
      const res = await initiateConsultation().unwrap();
      const { consultationId, roomId, orderID, doctorInfo: doctor, zaynaxAuthToken } = res.data;

      log("initiateConsultation ok:", { consultationId, roomId, orderID });

      // If a resume-listener socket from the effect above is already open
      // (unlikely right after a fresh initiate, but be safe), tear it down
      // first so we don't end up with two sockets.
      cleanupSocket("starting a fresh outgoing call");

      sessionRef.current = { consultationId, roomId, orderID };
      setDoctorInfo(doctor);

      const socket = io(ZAYNAX_SOCKET_URL, {
        query: { auth: zaynaxAuthToken },
        transports: ["websocket"],
      });
      socketRef.current = socket;
      registerListeners(socket, roomId, orderID);

      socket.on("connect", () => {
        log("✅ socket connected. id:", socket.id);
        socket.emit("PATIENT_OUTGOING_CALL", { orderID, roomID: roomId });
        log("emitted PATIENT_OUTGOING_CALL:", { orderID, roomID: roomId });
        setStageBoth("ringing");
        reportStatus(ConsultationStatus.RINGING);

        ringTimeoutRef.current = setTimeout(() => {
          if (stageRef.current === "ringing") {
            log("⏱ ring timeout — staying connected for a possible doctor callback");
            setStageBoth("timeout");
            reportStatus(ConsultationStatus.TIMEOUT);
            // Deliberately not cancelling on Zaynax's side or disconnecting.
          }
        }, RING_TIMEOUT_MS);
      });

      socket.on("connect_error", (err) => {
        log("connect_error:", err.message);
        setErrorMessage("Could not connect to the doctor call service.");
        setStageBoth("error");
        cleanupSocket("connect_error");
      });
    } catch (err: any) {
      log("startCall FAILED:", err);
      setErrorMessage(err?.data?.message ?? "Could not start consultation");
      setStageBoth("error");
    }
  }, [cleanupSocket, initiateConsultation, registerListeners, reportStatus, setStageBoth]);

  const cancelCall = useCallback(() => {
    const s = sessionRef.current;
    if (s && socketRef.current) {
      socketRef.current.emit("PATIENT_CALL_CANCELLED", { roomID: s.roomId });
      log("emitted PATIENT_CALL_CANCELLED (explicit patient cancel):", s.roomId);
    }
    reportStatus(ConsultationStatus.CANCELLED);
    cleanupSocket("patient cancelled");
    setIncomingCall(null);
    setStageBoth("idle");
  }, [cleanupSocket, reportStatus, setStageBoth]);

  const endCall = useCallback(() => {
    jitsiApiRef.current?.dispose();
    jitsiApiRef.current = null;
    reportStatus(ConsultationStatus.COMPLETED, { callEndedAt: new Date().toISOString() });
    cleanupSocket("call ended");
    setStageBoth("ended");
  }, [cleanupSocket, reportStatus, setStageBoth]);

  const acceptIncomingCall = useCallback(() => {
    if (!incomingCall || !socketRef.current) {
      log("acceptIncomingCall called but no incomingCall/socket — ignoring");
      return;
    }

    log("accepting incoming call:", incomingCall);
    socketRef.current.emit("PATIENT_CALL_ACCEPTED", {
      doctorID: incomingCall.doctorID,
      roomID: incomingCall.roomID,
    });

    setDoctorInfo({
      firstName: { en: incomingCall.doctorName, bn: "" },
      lastName: { en: "", bn: "" },
      image: incomingCall.docImage,
    });

    reportStatus(ConsultationStatus.ACCEPTED, { callStartedAt: new Date().toISOString() });
    joinJitsi(incomingCall.roomID);
    setIncomingCall(null);
  }, [incomingCall, joinJitsi, reportStatus]);

  const rejectIncomingCall = useCallback(() => {
    if (!incomingCall || !socketRef.current) {
      log("rejectIncomingCall called but no incomingCall/socket — ignoring");
      return;
    }

    log("rejecting incoming call:", incomingCall);
    socketRef.current.emit("PATIENT_CALL_REJECTED", {
      doctorID: incomingCall.doctorID,
      roomID: incomingCall.roomID,
    });

    reportStatus(ConsultationStatus.REJECTED);
    setIncomingCall(null);
  }, [incomingCall, reportStatus]);

  useEffect(() => {
    return () => {
      cleanupSocket("component unmounted");
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return {
    stage,
    doctorInfo,
    errorMessage,
    startCall,
    cancelCall,
    endCall,
    incomingCall,
    acceptIncomingCall,
    rejectIncomingCall,
  };
}