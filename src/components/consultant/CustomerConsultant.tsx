// "use client";

// import { useState } from "react";
// import Script from "next/script";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Badge } from "@/components/ui/badge";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import { useZaynaxCall } from "@/hooks/useZaynaxCall";
// import { ConsultationStatus, IConsultation, useGetMyConsultationCountQuery, useGetMyConsultationsQuery } from "@/redux/features/consultant/consultant.api";

// const statusVariant: Record<ConsultationStatus, "default" | "secondary" | "destructive" | "outline"> = {
//   [ConsultationStatus.INITIATED]: "secondary",
//   [ConsultationStatus.ELIGIBLE]: "secondary",
//   [ConsultationStatus.BOOKED]: "secondary",
//   [ConsultationStatus.PAID]: "outline",
//   [ConsultationStatus.RINGING]: "outline",
//   [ConsultationStatus.ACCEPTED]: "default",
//   [ConsultationStatus.REJECTED]: "destructive",
//   [ConsultationStatus.TIMEOUT]: "destructive",
//   [ConsultationStatus.COMPLETED]: "default",
//   [ConsultationStatus.CANCELLED]: "destructive",
//   [ConsultationStatus.POOL_EXHAUSTED]: "destructive",
//   [ConsultationStatus.FAILED]: "destructive",
// };

// function CustomerConsultant() {
//   const [page, setPage] = useState(1);
//   const [jitsiReady, setJitsiReady] = useState(false);
//   const limit = 10;

//   const {
//     data: listRes,
//     isLoading,
//     isFetching,
//   } = useGetMyConsultationsQuery({ page, limit, sort: "-createdAt" });

//   const { data: countRes } = useGetMyConsultationCountQuery();

//   const { stage, doctorInfo, errorMessage, startCall, cancelCall, endCall } =
//     useZaynaxCall("jitsi-call-container");

// const consultations: IConsultation[] = Array.isArray(listRes?.data)
//   ? listRes.data
//   : Array.isArray((listRes?.data as any)?.data)
//     ? (listRes?.data as any).data
//     : [];

// const meta = Array.isArray(listRes?.data)
//   ? listRes?.meta
//   : (listRes?.data as any)?.meta;

//   const totalTaken = countRes?.data.count ?? 0;

//   const inCallStages: Array<typeof stage> = ["initiating", "ringing", "accepted", "in-call"];
//   const isCallActive = inCallStages.includes(stage);
// console.log("My Consultations ", consultations)
//   return (
//     <div className="space-y-6 p-4">
//       <Script
//         src="https://meet.zaynax.health/external_api.js"
//         strategy="lazyOnload"
//         onLoad={() => setJitsiReady(true)}
//       />

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between">
//           <div>
//             <CardTitle>Doctor Consultation</CardTitle>
//             <p className="text-sm text-muted-foreground mt-1">
//               You have taken {totalTaken} consultation{totalTaken === 1 ? "" : "s"} so far.
//             </p>
//           </div>

//           {!isCallActive ? (
//             <Button onClick={startCall} disabled={!jitsiReady}>
//               {jitsiReady ? "Start New Consultation" : "Loading call service..."}
//             </Button>
//           ) : (
//             <Button variant="destructive" onClick={stage === "in-call" ? endCall : cancelCall}>
//               {stage === "in-call" ? "End Call" : "Cancel"}
//             </Button>
//           )}
//         </CardHeader>

//         {isCallActive && (
//           <CardContent className="space-y-3">
//             {stage !== "in-call" && (
//               <p className="text-sm text-muted-foreground">
//                 {stage === "initiating" && "Connecting to doctor service..."}
//                 {stage === "ringing" && `Calling ${doctorInfo ? doctorInfo.firstName.en : "doctor"}...`}
//                 {stage === "accepted" && "Doctor accepted, joining call..."}
//               </p>
//             )}
//             <div
//               id="jitsi-call-container"
//               className="w-full rounded-md border bg-muted"
//               style={{ height: stage === "in-call" ? 480 : 0 }}
//             />
//           </CardContent>
//         )}

//         {stage === "error" && errorMessage && (
//           <CardContent>
//             <p className="text-sm text-destructive">{errorMessage}</p>
//           </CardContent>
//         )}

//         {stage === "rejected" && (
//           <CardContent>
//             <p className="text-sm text-muted-foreground">
//               The doctor couldn't take your call right now. Please try again shortly.
//             </p>
//           </CardContent>
//         )}

//         {stage === "timeout" && (
//           <CardContent>
//             <p className="text-sm text-muted-foreground">
//               No response from the doctor. Please try again.
//             </p>
//           </CardContent>
//         )}
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle className="text-base">My Consultations</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {isLoading ? (
//             <div className="space-y-2">
//               {Array.from({ length: 4 }).map((_, i) => (
//                 <Skeleton key={i} className="h-10 w-full" />
//               ))}
//             </div>
//           ) : consultations.length === 0 ? (
//             <p className="text-sm text-muted-foreground py-8 text-center">
//               You haven't taken any consultations yet.
//             </p>
//           ) : (
//             <>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>Doctor</TableHead>
//                     <TableHead>Status</TableHead>
//                     <TableHead>Date</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {consultations?.map((c: IConsultation) => (
//                     <TableRow key={c._id}>
//                       <TableCell>{c.doctorName ?? "—"}</TableCell>
//                       <TableCell>
//                         <Badge variant={statusVariant[c.status]}>{c.status}</Badge>
//                       </TableCell>
//                       <TableCell>
//                         {c.createdAt ? new Date(c.createdAt).toLocaleString() : "—"}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>

//               {meta && meta.totalPage > 1 && (
//                 <div className="flex items-center justify-end gap-2 mt-4">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     disabled={page <= 1 || isFetching}
//                     onClick={() => setPage((p) => p - 1)}
//                   >
//                     Previous
//                   </Button>
//                   <span className="text-sm text-muted-foreground">
//                     Page {meta.page} of {meta.totalPage}
//                   </span>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     disabled={page >= meta.totalPage || isFetching}
//                     onClick={() => setPage((p) => p + 1)}
//                   >
//                     Next
//                   </Button>
//                 </div>
//               )}
//             </>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default CustomerConsultant;


// v2

// "use client";

// import { useState } from "react";
// import Script from "next/script";
// import { Download, PhoneCall, Video } from "lucide-react";
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import { useZaynaxCall } from "@/hooks/useZaynaxCall";
// import { ConsultationStatus, IConsultation, useGetMyConsultationCountQuery, useGetMyConsultationsQuery } from "@/redux/features/consultant/consultant.api";

// function formatDateTime(iso?: string) {
//   if (!iso) return "—";
//   return new Date(iso).toLocaleString("en-US", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

// function formatDuration(start?: string, end?: string) {
//   if (!start || !end) return "—";
//   const ms = new Date(end).getTime() - new Date(start).getTime();
//   if (ms <= 0) return "0m:0s";
//   const totalSeconds = Math.floor(ms / 1000);
//   return `${Math.floor(totalSeconds / 60)}m:${totalSeconds % 60}s`;
// }

// function CustomerConsultant() {
//   const [page, setPage] = useState(1);
//   const [jitsiReady, setJitsiReady] = useState(false);
//   const limit = 10;

//   const {
//     data: listRes,
//     isLoading,
//     isFetching,
//   } = useGetMyConsultationsQuery({
//     page,
//     limit,
//     sort: "-createdAt",
//     // status: ConsultationStatus.COMPLETED,
//   });

//   const { data: countRes } = useGetMyConsultationCountQuery();

//   const { stage, doctorInfo, errorMessage, startCall, cancelCall, endCall } =
//     useZaynaxCall("jitsi-call-container");

//   const consultations: IConsultation[] = Array.isArray(listRes?.data)
//     ? listRes.data
//     : Array.isArray((listRes?.data as any)?.data)
//       ? (listRes?.data as any).data
//       : [];

//   const meta = Array.isArray(listRes?.data)
//     ? listRes?.meta
//     : (listRes?.data as any)?.meta;

//   const totalTaken = countRes?.data.count ?? 0;

//   const inCallStages: Array<typeof stage> = ["initiating", "ringing", "accepted", "in-call"];
//   const isCallActive = inCallStages.includes(stage);


//   console.log("My Consultations ", listRes)

//   return (
//     <div className="space-y-6 p-4">
//       <Script
//         src="https://meet.zaynax.health/external_api.js"
//         strategy="lazyOnload"
//         onLoad={() => setJitsiReady(true)}
//       />

//       <Card>
//         <CardHeader className="flex flex-row items-center justify-between">
//           <div>
//             <CardTitle>Doctor Consultation</CardTitle>
//             <p className="text-sm text-muted-foreground mt-1">
//               You have taken {totalTaken} consultation{totalTaken === 1 ? "" : "s"} so far.
//             </p>
//           </div>

//           {!isCallActive ? (
//             <Button onClick={startCall} disabled={!jitsiReady}>
//               <Video className="w-4 h-4 mr-2" />
//               {jitsiReady ? "Get Doctor Consultation Now" : "Loading call service..."}
//             </Button>
//           ) : (
//             <Button variant="destructive" onClick={stage === "in-call" ? endCall : cancelCall}>
//               {stage === "in-call" ? "End Call" : "Cancel"}
//             </Button>
//           )}
//         </CardHeader>

//         {isCallActive && (
//           <CardContent className="space-y-3">
//             {stage !== "in-call" && (
//               <p className="text-sm text-muted-foreground">
//                 {stage === "initiating" && "Connecting to doctor service..."}
//                 {stage === "ringing" && `Calling ${doctorInfo ? doctorInfo.firstName.en : "doctor"}...`}
//                 {stage === "accepted" && "Doctor accepted, joining call..."}
//               </p>
//             )}
//             <div
//               id="jitsi-call-container"
//               className="w-full rounded-md border bg-muted"
//               style={{ height: stage === "in-call" ? 480 : 0 }}
//             />
//           </CardContent>
//         )}

//         {stage === "error" && errorMessage && (
//           <CardContent>
//             <p className="text-sm text-destructive">{errorMessage}</p>
//           </CardContent>
//         )}

//         {stage === "rejected" && (
//           <CardContent>
//             <p className="text-sm text-muted-foreground">
//               The doctor couldn't take your call right now. Please try again shortly.
//             </p>
//           </CardContent>
//         )}

//         {stage === "timeout" && (
//           <CardContent>
//             <p className="text-sm text-muted-foreground">
//               No response from the doctor. Please try again.
//             </p>
//           </CardContent>
//         )}
//       </Card>

//       <Card className="max-w-xs">
//         <CardContent className="flex flex-col items-center py-6">
//           <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
//             <PhoneCall className="w-5 h-5 text-emerald-500" />
//           </div>
//           <span className="text-3xl font-bold">{totalTaken}</span>
//           <span className="text-sm text-muted-foreground mt-1">Used Calls</span>
//         </CardContent>
//       </Card>

//       <Card>
//         <CardHeader>
//           <CardTitle className="text-base">Completed Video Consultations</CardTitle>
//         </CardHeader>
//         <CardContent>
//           {isLoading ? (
//             <div className="space-y-2">
//               {Array.from({ length: 4 }).map((_, i) => (
//                 <Skeleton key={i} className="h-10 w-full" />
//               ))}
//             </div>
//           ) : consultations.length === 0 ? (
//             <p className="text-sm text-muted-foreground py-8 text-center">
//               No completed consultations yet.
//             </p>
//           ) : (
//             <>
//               <Table>
//                 <TableHeader>
//                   <TableRow>
//                     <TableHead>#SN</TableHead>
//                     <TableHead>Call Start Time</TableHead>
//                     <TableHead>Call End Time</TableHead>
//                     <TableHead>Call Duration</TableHead>
//                     <TableHead>Prescription</TableHead>
//                   </TableRow>
//                 </TableHeader>
//                 <TableBody>
//                   {consultations?.map((c: IConsultation, index: number) => (
//                     <TableRow key={c._id}>
//                       <TableCell>{(page - 1) * limit + index + 1}</TableCell>
//                       <TableCell>{formatDateTime(c.callStartedAt)}</TableCell>
//                       <TableCell>{formatDateTime(c.callEndedAt)}</TableCell>
//                       <TableCell>{formatDuration(c.callStartedAt, c.callEndedAt)}</TableCell>
//                       <TableCell>
//                         {c.prescriptionUrl ? (
//                           <Button size="sm">
//                             <a href={c.prescriptionUrl} target="_blank" rel="noopener noreferrer">
//                               <Download className="w-3.5 h-3.5 mr-1.5" />
//                               Download
//                             </a>
//                           </Button>
//                         ) : (
//                           <span className="text-sm text-muted-foreground">—</span>
//                         )}
//                       </TableCell>
//                     </TableRow>
//                   ))}
//                 </TableBody>
//               </Table>

//               {meta && meta.totalPage > 1 && (
//                 <div className="flex items-center justify-end gap-2 mt-4">
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     disabled={page <= 1 || isFetching}
//                     onClick={() => setPage((p) => p - 1)}
//                   >
//                     Previous
//                   </Button>
//                   <span className="text-sm text-muted-foreground">
//                     Page {meta.page} of {meta.totalPage}
//                   </span>
//                   <Button
//                     variant="outline"
//                     size="sm"
//                     disabled={page >= meta.totalPage || isFetching}
//                     onClick={() => setPage((p) => p + 1)}
//                   >
//                     Next
//                   </Button>
//                 </div>
//               )}
//             </>
//           )}
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// export default CustomerConsultant;



// "use client";

// import Script from "next/script";
// import { Download, Phone, Stethoscope, Video, CheckCircle2, Clock } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import { useZaynaxCall } from "@/hooks/useZaynaxCall";
// import {
//   IConsultation,
//   useGetMyConsultationCountQuery,
//   useGetMyConsultationsQuery,
// } from "@/redux/features/consultant/consultant.api";

// function formatDateTime(iso?: string) {
//   if (!iso) return "—";
//   return new Date(iso).toLocaleString("en-US", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

// function formatDuration(start?: string, end?: string) {
//   if (!start || !end) return "—";
//   const ms = new Date(end).getTime() - new Date(start).getTime();
//   if (ms <= 0) return "0m:0s";
//   const totalSeconds = Math.floor(ms / 1000);
//   return `${Math.floor(totalSeconds / 60)}m:${totalSeconds % 60}s`;
// }

// function CustomerConsultant() {
//   const limit = 10;

//   const { data: listRes, isLoading } = useGetMyConsultationsQuery({
//     page: 1,
//     limit,
//     sort: "-createdAt",
//   });

//   const { data: countRes } = useGetMyConsultationCountQuery();

//   const { startCall } = useZaynaxCall("jitsi-call-container");

//   const consultations: IConsultation[] = Array.isArray(listRes?.data)
//     ? listRes.data
//     : Array.isArray((listRes?.data as any)?.data)
//       ? (listRes?.data as any).data
//       : [];
// console.log("Consultations ", consultations)
//   const usedCalls = countRes?.data.count ?? 0;
//   const totalCalls = 10;
//   const availableCalls = Math.max(totalCalls - usedCalls, 0);

//   return (
//     <div className="space-y-6 p-4">
//       <Script src="https://meet.zaynax.health/external_api.js" strategy="lazyOnload" />

//       {/* Hero */}
//       <div className="rounded-2xl border bg-white px-6 py-10 flex flex-col items-center text-center">
//         <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
//           <Stethoscope className="w-6 h-6 text-emerald-500" />
//         </div>
//         <h2 className="text-xl font-bold text-slate-800">
//           Ready for Your Next Consultation?
//         </h2>
//         <p className="text-sm text-muted-foreground mt-2 max-w-md">
//           Connect with experienced doctors instantly. Get professional medical advice from the comfort of your home.
//         </p>
//         <Button
//           onClick={startCall}
//           className="mt-6 rounded-full bg-emerald-500 hover:bg-emerald-600 px-6"
//         >
//           <Video className="w-4 h-4 mr-2" />
//           Get Doctor Consultation Now
//         </Button>
//       </div>

//       <div id="jitsi-call-container" className="w-full rounded-md border bg-muted empty:hidden" />

//       {/* Stats */}
//       {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div className="rounded-2xl border bg-white flex flex-col items-center py-8">
//           <div className="w-11 h-11 rounded-full bg-orange-50 flex items-center justify-center mb-3">
//             <CheckCircle2 className="w-5 h-5 text-orange-500" />
//           </div>
//           <span className="text-3xl font-bold text-slate-800">{usedCalls}</span>
//           <span className="text-sm text-muted-foreground mt-1">Used Calls</span>
//         </div>

//         <div className="rounded-2xl border bg-white flex flex-col items-center py-8">
//           <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
//             <Phone className="w-5 h-5 text-emerald-500" />
//           </div>
//           <span className="text-3xl font-bold text-slate-800">{totalCalls}</span>
//           <span className="text-sm text-muted-foreground mt-1">Total Calls</span>
//         </div>

//         <div className="rounded-2xl border bg-white flex flex-col items-center py-8">
//           <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
//             <Clock className="w-5 h-5 text-emerald-500" />
//           </div>
//           <span className="text-3xl font-bold text-slate-800">{availableCalls}</span>
//           <span className="text-sm text-muted-foreground mt-1">Available Calls</span>
//         </div>
//       </div> */}

//       {/* Table */}
//       <div className="rounded-2xl border bg-white overflow-hidden">
//         <div className="px-5 py-4 border-b">
//           <h3 className="font-semibold text-slate-800">Completed Video Consultations</h3>
//         </div>

//         <div className="p-4">
//           {isLoading ? (
//             <div className="space-y-2">
//               {Array.from({ length: 4 }).map((_, i) => (
//                 <Skeleton key={i} className="h-10 w-full" />
//               ))}
//             </div>
//           ) : consultations.length === 0 ? (
//             <p className="text-sm text-muted-foreground py-8 text-center">
//               No completed consultations yet.
//             </p>
//           ) : (
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-slate-50">
//                   <TableHead>#SN</TableHead>
//                   <TableHead>Call Start Time</TableHead>
//                   <TableHead>Call End Time</TableHead>
//                   <TableHead>Call Duration</TableHead>
//                   <TableHead>Prescription</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {consultations.map((c: IConsultation, index: number) => (
//                   <TableRow key={c._id}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{formatDateTime(c.callStartedAt)}</TableCell>
//                     <TableCell>{formatDateTime(c.callEndedAt)}</TableCell>
//                     <TableCell>{formatDuration(c.callStartedAt, c.callEndedAt)}</TableCell>
//                     <TableCell>
//                       {c.prescriptionUrl ? (
//                         <Button
//                           size="sm"
//                           className="rounded-full bg-emerald-500 hover:bg-emerald-600"
//                         >
//                           <a href={c.prescriptionUrl} target="_blank" rel="noopener noreferrer">
//                             <Download className="w-3.5 h-3.5 mr-1.5" />
//                             Download
//                           </a>
//                         </Button>
//                       ) : (
//                         <span className="text-sm text-muted-foreground">—</span>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CustomerConsultant;
// v4 ------- table working...joining not working.... 
// "use client";

// import { useState } from "react";
// import Script from "next/script";
// import { Download, Phone, Stethoscope, Video, CheckCircle2, Clock, Loader2 } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { Skeleton } from "@/components/ui/skeleton";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";

// import { useZaynaxCall } from "@/hooks/useZaynaxCall";
// import {
//   IConsultation,
//   useGetMyConsultationCountQuery,
//   useGetMyConsultationsQuery,
// } from "@/redux/features/consultant/consultant.api";

// function formatDateTime(iso?: string) {
//   if (!iso) return "—";
//   return new Date(iso).toLocaleString("en-US", {
//     day: "2-digit",
//     month: "short",
//     year: "numeric",
//     hour: "2-digit",
//     minute: "2-digit",
//   });
// }

// function formatDuration(start?: string, end?: string) {
//   if (!start || !end) return "—";
//   const ms = new Date(end).getTime() - new Date(start).getTime();
//   if (ms <= 0) return "0m:0s";
//   const totalSeconds = Math.floor(ms / 1000);
//   return `${Math.floor(totalSeconds / 60)}m:${totalSeconds % 60}s`;
// }

// function CustomerConsultant() {
//   const limit = 10;
//   const [jitsiReady, setJitsiReady] = useState(false);

//   const { data: listRes, isLoading } = useGetMyConsultationsQuery({
//     page: 1,
//     limit,
//     sort: "-createdAt",
//   });

//   const { data: countRes } = useGetMyConsultationCountQuery();

//   const { stage, doctorInfo, errorMessage, startCall, cancelCall, endCall } =
//     useZaynaxCall("jitsi-call-container");

//   const consultations: IConsultation[] = Array.isArray(listRes?.data)
//     ? listRes.data
//     : Array.isArray((listRes?.data as any)?.data)
//       ? (listRes?.data as any).data
//       : [];

//   const usedCalls = countRes?.data.count ?? 0;
//   const totalCalls = 10;
//   const availableCalls = Math.max(totalCalls - usedCalls, 0);

//   const inCallStages: Array<typeof stage> = ["initiating", "ringing", "accepted", "in-call"];
//   const isCallActive = inCallStages.includes(stage);

//   return (
//     <div className="space-y-6 p-4">
//       <Script
//         src="https://meet.zaynax.health/external_api.js"
//         strategy="lazyOnload"
//         onLoad={() => setJitsiReady(true)}
//       />

//       {/* Hero */}
//       <div className="rounded-2xl border bg-white px-6 py-10 flex flex-col items-center text-center">
//         <div className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center mb-4">
//           <Stethoscope className="w-6 h-6 text-emerald-500" />
//         </div>
//         <h2 className="text-xl font-bold text-slate-800">
//           Ready for Your Next Consultation?
//         </h2>
//         <p className="text-sm text-muted-foreground mt-2 max-w-md">
//           Connect with experienced doctors instantly. Get professional medical advice from the comfort of your home.
//         </p>

//         {!isCallActive ? (
//           <Button
//             onClick={startCall}
//             disabled={!jitsiReady}
//             className="mt-6 rounded-full bg-emerald-500 hover:bg-emerald-600 px-6"
//           >
//             {jitsiReady ? (
//               <>
//                 <Video className="w-4 h-4 mr-2" />
//                 Get Doctor Consultation Now
//               </>
//             ) : (
//               <>
//                 <Loader2 className="w-4 h-4 mr-2 animate-spin" />
//                 Loading call service...
//               </>
//             )}
//           </Button>
//         ) : (
//           <div className="mt-6 flex flex-col items-center gap-3 w-full">
//             {stage !== "in-call" && (
//               <div className="flex items-center gap-2 text-sm text-slate-600">
//                 <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
//                 {stage === "initiating" && "Connecting to doctor service..."}
//                 {stage === "ringing" &&
//                   `Calling ${doctorInfo ? doctorInfo.firstName.en : "doctor"}...`}
//                 {stage === "accepted" && "Doctor accepted, joining call..."}
//               </div>
//             )}

//             <div
//               id="jitsi-call-container"
//               className="w-full rounded-md border bg-muted"
//               style={{ height: stage === "in-call" ? 480 : 0 }}
//             />

//             <Button
//               variant="destructive"
//               className="rounded-full px-6"
//               onClick={stage === "in-call" ? endCall : cancelCall}
//             >
//               {stage === "in-call" ? "End Call" : "Cancel"}
//             </Button>
//           </div>
//         )}

//         {stage === "error" && errorMessage && (
//           <p className="text-sm text-destructive mt-4">{errorMessage}</p>
//         )}

//         {stage === "rejected" && (
//           <p className="text-sm text-muted-foreground mt-4">
//             The doctor couldn't take your call right now. Please try again shortly.
//           </p>
//         )}

//         {stage === "timeout" && (
//           <p className="text-sm text-muted-foreground mt-4">
//             No response from the doctor. Please try again.
//           </p>
//         )}
//       </div>

//       {/* Stats */}
//       {/* <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
//         <div className="rounded-2xl border bg-white flex flex-col items-center py-8">
//           <div className="w-11 h-11 rounded-full bg-orange-50 flex items-center justify-center mb-3">
//             <CheckCircle2 className="w-5 h-5 text-orange-500" />
//           </div>
//           <span className="text-3xl font-bold text-slate-800">{usedCalls}</span>
//           <span className="text-sm text-muted-foreground mt-1">Used Calls</span>
//         </div>

//         <div className="rounded-2xl border bg-white flex flex-col items-center py-8">
//           <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
//             <Phone className="w-5 h-5 text-emerald-500" />
//           </div>
//           <span className="text-3xl font-bold text-slate-800">{totalCalls}</span>
//           <span className="text-sm text-muted-foreground mt-1">Total Calls</span>
//         </div>

//         <div className="rounded-2xl border bg-white flex flex-col items-center py-8">
//           <div className="w-11 h-11 rounded-full bg-emerald-50 flex items-center justify-center mb-3">
//             <Clock className="w-5 h-5 text-emerald-500" />
//           </div>
//           <span className="text-3xl font-bold text-slate-800">{availableCalls}</span>
//           <span className="text-sm text-muted-foreground mt-1">Available Calls</span>
//         </div>
//       </div> */}

//       {/* Table */}
//       <div className="rounded-2xl border bg-white overflow-hidden">
//         <div className="px-5 py-4 border-b">
//           <h3 className="font-semibold text-slate-800">Completed Video Consultations</h3>
//         </div>

//         <div className="p-4">
//           {isLoading ? (
//             <div className="space-y-2">
//               {Array.from({ length: 4 }).map((_, i) => (
//                 <Skeleton key={i} className="h-10 w-full" />
//               ))}
//             </div>
//           ) : consultations.length === 0 ? (
//             <p className="text-sm text-muted-foreground py-8 text-center">
//               No completed consultations yet.
//             </p>
//           ) : (
//             <Table>
//               <TableHeader>
//                 <TableRow className="bg-slate-50">
//                   <TableHead>#SN</TableHead>
//                   <TableHead>Call Start Time</TableHead>
//                   <TableHead>Call End Time</TableHead>
//                   <TableHead>Call Duration</TableHead>
//                   <TableHead>Prescription</TableHead>
//                 </TableRow>
//               </TableHeader>
//               <TableBody>
//                 {consultations.map((c: IConsultation, index: number) => (
//                   <TableRow key={c._id}>
//                     <TableCell>{index + 1}</TableCell>
//                     <TableCell>{formatDateTime(c.callStartedAt)}</TableCell>
//                     <TableCell>{formatDateTime(c.callEndedAt)}</TableCell>
//                     <TableCell>{formatDuration(c.callStartedAt, c.callEndedAt)}</TableCell>
//                     <TableCell>
//                       {c.prescriptionUrl ? (
//                         <Button
//                           size="sm"
//                           className="rounded-full bg-emerald-500 hover:bg-emerald-600"
//                         >
//                           <a href={c.prescriptionUrl} target="_blank" rel="noopener noreferrer">
//                             <Download className="w-3.5 h-3.5 mr-1.5" />
//                             Download
//                           </a>
//                         </Button>
//                       ) : (
//                         <span className="text-sm text-muted-foreground">—</span>
//                       )}
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </TableBody>
//             </Table>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// }

// export default CustomerConsultant;



"use client";

import { useState } from "react";
import Script from "next/script";
import { Download } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useZaynaxCall } from "@/hooks/useZaynaxCall";
import {
  IConsultation,
  useGetMyConsultationCountQuery,
  useGetMyConsultationsQuery,
} from "@/redux/features/consultant/consultant.api";

function formatDateTime(iso?: string) {
  if (!iso) return "—";
  return new Date(iso).toLocaleString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

function formatDuration(start?: string, end?: string) {
  if (!start || !end) return "—";
  const ms = new Date(end).getTime() - new Date(start).getTime();
  if (ms <= 0) return "0m:0s";
  const totalSeconds = Math.floor(ms / 1000);
  return `${Math.floor(totalSeconds / 60)}m:${totalSeconds % 60}s`;
}

function CustomerConsultant() {
  const [page, setPage] = useState(1);
  const [jitsiReady, setJitsiReady] = useState(false);
  const limit = 10;

  const {
    data: listRes,
    isLoading,
    isFetching,
  } = useGetMyConsultationsQuery({ page, limit, sort: "-createdAt" });

  const { data: countRes } = useGetMyConsultationCountQuery();

  const { stage, doctorInfo, errorMessage, startCall, cancelCall, endCall } =
    useZaynaxCall("jitsi-call-container");

  const consultations: IConsultation[] = Array.isArray(listRes?.data)
    ? listRes.data
    : Array.isArray((listRes?.data as any)?.data)
      ? (listRes?.data as any).data
      : [];

  const meta = Array.isArray(listRes?.data)
    ? listRes?.meta
    : (listRes?.data as any)?.meta;

  const totalTaken = countRes?.data.count ?? 0;

  const inCallStages: Array<typeof stage> = ["initiating", "ringing", "accepted", "in-call"];
  const isCallActive = inCallStages.includes(stage);

  console.log("My Consultations ", consultations);

  return (
    <div className="space-y-6 p-4">
      <Script
        src="https://meet.zaynax.health/external_api.js"
        strategy="lazyOnload"
        onLoad={() => setJitsiReady(true)}
      />

      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Doctor Consultation</CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              You have taken {totalTaken} consultation{totalTaken === 1 ? "" : "s"} so far.
            </p>
          </div>

          {!isCallActive ? (
            <Button onClick={startCall} disabled={!jitsiReady}>
              {jitsiReady ? "Start New Consultation" : "Loading call service..."}
            </Button>
          ) : (
            <Button variant="destructive" onClick={stage === "in-call" ? endCall : cancelCall}>
              {stage === "in-call" ? "End Call" : "Cancel"}
            </Button>
          )}
        </CardHeader>

        {isCallActive && (
          <CardContent className="space-y-3">
            {stage !== "in-call" && (
              <p className="text-sm text-muted-foreground">
                {stage === "initiating" && "Connecting to doctor service..."}
                {stage === "ringing" && `Calling ${doctorInfo ? doctorInfo.firstName.en : "doctor"}...`}
                {stage === "accepted" && "Doctor accepted, joining call..."}
              </p>
            )}
            <div
              id="jitsi-call-container"
              className="w-full rounded-md border bg-muted"
              style={{ height: stage === "in-call" ? 480 : 0 }}
            />
          </CardContent>
        )}

        {stage === "error" && errorMessage && (
          <CardContent>
            <p className="text-sm text-destructive">{errorMessage}</p>
          </CardContent>
        )}

        {stage === "rejected" && (
          <CardContent>
            <p className="text-sm text-muted-foreground">
              The doctor couldn't take your call right now. Please try again shortly.
            </p>
          </CardContent>
        )}

        {stage === "timeout" && (
          <CardContent>
            <p className="text-sm text-muted-foreground">
              No response from the doctor. Please try again.
            </p>
          </CardContent>
        )}
      </Card>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Completed Video Consultations</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="space-y-2">
              {Array.from({ length: 4 }).map((_, i) => (
                <Skeleton key={i} className="h-10 w-full" />
              ))}
            </div>
          ) : consultations.length === 0 ? (
            <p className="text-sm text-muted-foreground py-8 text-center">
              No completed consultations yet.
            </p>
          ) : (
            <>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>#SN</TableHead>
                    <TableHead>Call Start Time</TableHead>
                    <TableHead>Call End Time</TableHead>
                    <TableHead>Call Duration</TableHead>
                    <TableHead>Prescription</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {consultations?.map((c: IConsultation, index: number) => (
                    <TableRow key={c._id}>
                      <TableCell>{(page - 1) * limit + index + 1}</TableCell>
                      <TableCell>{formatDateTime(c.callStartedAt)}</TableCell>
                      <TableCell>{formatDateTime(c.callEndedAt)}</TableCell>
                      <TableCell>{formatDuration(c.callStartedAt, c.callEndedAt)}</TableCell>
                      <TableCell>
                        {c.prescriptionUrl ? (
                          <Button size="sm">
                            <a href={c.prescriptionUrl} target="_blank" rel="noopener noreferrer">
                              <Download className="w-3.5 h-3.5 mr-1.5" />
                              Download
                            </a>
                          </Button>
                        ) : (
                          <span className="text-sm text-muted-foreground">—</span>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>

              {meta && meta.totalPage > 1 && (
                <div className="flex items-center justify-end gap-2 mt-4">
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page <= 1 || isFetching}
                    onClick={() => setPage((p) => p - 1)}
                  >
                    Previous
                  </Button>
                  <span className="text-sm text-muted-foreground">
                    Page {meta.page} of {meta.totalPage}
                  </span>
                  <Button
                    variant="outline"
                    size="sm"
                    disabled={page >= meta.totalPage || isFetching}
                    onClick={() => setPage((p) => p + 1)}
                  >
                    Next
                  </Button>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default CustomerConsultant;