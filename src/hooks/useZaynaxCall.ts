
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
//     (status: ConsultationStatus) => {
//       const s = sessionRef.current;
//       if (!s) return;
//       // Best-effort audit log — don't block the call flow if this fails.
//       updateStatus({ id: s.consultationId, status }).catch(() => { });
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
//         reportStatus(ConsultationStatus.ACCEPTED);
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
//     reportStatus(ConsultationStatus.COMPLETED);
//     cleanupSocket();
//     setStageBoth("ended");
//   }, [cleanupSocket, reportStatus, setStageBoth]);

//   return { stage, doctorInfo, errorMessage, startCall, cancelCall, endCall };
// }


"use client";

import { ConsultationStatus, useInitiateConsultationMutation, useUpdateConsultationStatusMutation } from "@/redux/features/consultant/consultant.api";
import { useCallback, useRef, useState } from "react";
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

const ZAYNAX_SOCKET_URL = process.env.NEXT_PUBLIC_ZAYNAX_SOCKET_URL || "https://api.zaynax.health";
const RING_TIMEOUT_MS = 30_000;

export function useZaynaxCall(jitsiContainerId: string) {
  const [stage, setStage] = useState<CallStage>("idle");
  const [doctorInfo, setDoctorInfo] = useState<DoctorInfo | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [initiateConsultation] = useInitiateConsultationMutation();
  const [updateStatus] = useUpdateConsultationStatusMutation();

  const socketRef = useRef<Socket | null>(null);
  const stageRef = useRef<CallStage>("idle");
  const ringTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const sessionRef = useRef<{ consultationId: string; roomId: string; orderID: string } | null>(null);
  const jitsiApiRef = useRef<any>(null);

  const setStageBoth = useCallback((s: CallStage) => {
    stageRef.current = s;
    setStage(s);
  }, []);

  const reportStatus = useCallback(
    (
      status: ConsultationStatus,
      extra?: { callStartedAt?: string; callEndedAt?: string; prescriptionUrl?: string },
    ) => {
      const s = sessionRef.current;
      if (!s) return;
      // Best-effort audit log — don't block the call flow if this fails.
      updateStatus({ id: s.consultationId, status, ...extra }).catch(() => { });
    },
    [updateStatus],
  );

  const clearRingTimeout = useCallback(() => {
    if (ringTimeoutRef.current) {
      clearTimeout(ringTimeoutRef.current);
      ringTimeoutRef.current = null;
    }
  }, []);

  const cleanupSocket = useCallback(() => {
    clearRingTimeout();
    socketRef.current?.disconnect();
    socketRef.current = null;
  }, [clearRingTimeout]);

  const joinJitsi = useCallback(
    (roomId: string) => {
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


  const startCall = useCallback(async () => {
    setStageBoth("initiating");
    setErrorMessage(null);

    try {
      const res = await initiateConsultation().unwrap();
      const { consultationId, roomId, orderID, doctorInfo: doctor, zaynaxAuthToken } = res.data;

      console.log("room id is ", roomId)
      sessionRef.current = { consultationId, roomId, orderID };
      setDoctorInfo(doctor);

      const socket = io(ZAYNAX_SOCKET_URL, {
        query: { auth: zaynaxAuthToken },
        transports: ["websocket"],
      });
      socketRef.current = socket;

      socket.on("connect", () => {
        socket.emit("PATIENT_OUTGOING_CALL", { orderID, roomID: roomId });
        setStageBoth("ringing");
        reportStatus(ConsultationStatus.RINGING);

        ringTimeoutRef.current = setTimeout(() => {
          if (stageRef.current === "ringing") {
            setStageBoth("timeout");
            reportStatus(ConsultationStatus.TIMEOUT);
            socket.emit("PATIENT_CALL_CANCELLED", { roomID: roomId });
            cleanupSocket();
          }
        }, RING_TIMEOUT_MS);
      });

      socket.on("DOCTOR_CALL_ACCEPTED", () => {
        clearRingTimeout();
        setStageBoth("accepted");
        reportStatus(ConsultationStatus.ACCEPTED, { callStartedAt: new Date().toISOString() });
        joinJitsi(roomId);
      });

      socket.on("DOCTOR_CALL_REJECTED", () => {
        clearRingTimeout();
        setStageBoth("rejected");
        reportStatus(ConsultationStatus.REJECTED);
        cleanupSocket();
      });

      socket.on("DOCTOR_OFFLINE", () => {
        clearRingTimeout();
        setStageBoth("rejected");
        reportStatus(ConsultationStatus.FAILED);
        cleanupSocket();
      });

      socket.on("connect_error", () => {
        setErrorMessage("Could not connect to the doctor call service.");
        setStageBoth("error");
        cleanupSocket();
      });
    } catch (err: any) {
      setErrorMessage(err?.data?.message ?? "Could not start consultation");
      setStageBoth("error");
    }
  }, [cleanupSocket, clearRingTimeout, initiateConsultation, joinJitsi, reportStatus, setStageBoth]);

  const cancelCall = useCallback(() => {
    const s = sessionRef.current;
    if (s && socketRef.current) {
      socketRef.current.emit("PATIENT_CALL_CANCELLED", { roomID: s.roomId });
    }
    reportStatus(ConsultationStatus.CANCELLED);
    cleanupSocket();
    setStageBoth("idle");
  }, [cleanupSocket, reportStatus, setStageBoth]);

  const endCall = useCallback(() => {
    jitsiApiRef.current?.dispose();
    jitsiApiRef.current = null;
    reportStatus(ConsultationStatus.COMPLETED, { callEndedAt: new Date().toISOString() });
    cleanupSocket();
    setStageBoth("ended");
  }, [cleanupSocket, reportStatus, setStageBoth]);

  return { stage, doctorInfo, errorMessage, startCall, cancelCall, endCall };
}