// PROJECT: Surokkha — health insurance management platform
// Stack: Node.js + Express + Mongoose (TS backend), Next.js frontend
// Frontend: Redux Toolkit Query, shadcn/ui, React Hook Form + Zod, Tailwind

// FEATURE: Zaynax Health doctor-consultation (audio/video call) integration

// BUSINESS MODEL:
// - Surokkha customers pay a subscription (no per-call payment to Zaynax)
// - Single SHARED Zaynax corporate account/package — one balance pool
//   (e.g. 10/30 consultations) used across all customers
// - Consultation count is tracked in Surokkha's own DB, incremented at the
//   PAID step (Zaynax payment/by-package success) — NOT at call-accepted/
//   completed, since that's when Zaynax actually deducts the pool balance
// - No quota LIMIT enforced yet — just recording usage count for now

// BACKEND MODULE (follows existing subscription module pattern: catchAsync +
// sendResponse + httpStatus, plain-object services throwing AppError,
// checkAuth(...roles) + Role enum + validateRequest, QueryBuilder for lists):

//   consultation.interface.ts   — ConsultationStatus enum + IConsultation
//   consultation.model.ts       — Mongoose schema (customer, subscription refs,
//                                  zaynaxBookingId, roomId, doctorId/Name, status)
//   consultation.constants.ts   — searchable fields for QueryBuilder
//   consultation.validation.ts  — zod schema for status-update PATCH body
//   consultation.service.ts     — ConsultationServices: initiateConsultation
//                                  (orchestrates full Zaynax flow: subscribe →
//                                  getUserToken → checkPackageForCall →
//                                  bookQuickAppointment → payByPackage →
//                                  getBookingDetails), updateConsultationStatus,
//                                  getMyConsultations, getMyConsultationCount,
//                                  getSingleConsultation
//   consultation.controller.ts  — ConsultationControllers wrapping the above
//   consultation.route.ts       — POST /initiate, GET /my-consultations,
//                                  GET /my-consultations/count, GET /:id,
//                                  PATCH /:id/status

//   integrations/zaynax/
//     zaynax.config.ts           — env-driven secrets (CLIENT_ID, SECRET_KEY, IV)
//     zaynax-crypto.service.ts   — AES-256-CBC encrypt/decrypt (ZaynaxCrypto)
//     zaynax-api.service.ts      — ZaynaxApi: wraps every Zaynax REST endpoint
//                                   from their doc + extractTokenFromUrl helper

//   IMPORTANT: roomID = bookingID + patientUserID (per Zaynax docs) — exact
//   concatenation format not yet confirmed with Zaynax.
//   Zaynax calls are NOT wrapped in a Mongo transaction (external payment
//   can't be rolled back, so a transaction would give false safety).

// FRONTEND:
//   redux/features/consultant/consultant.api.ts  (renamed from consultationApi.ts
//     by user) — RTK Query slice: useInitiateConsultationMutation,
//     useGetMyConsultationsQuery, useGetMyConsultationCountQuery,
//     useGetSingleConsultationQuery, useUpdateConsultationStatusMutation
//     (needs "CONSULTATIONS" added to baseApi tagTypes)

//   hooks/useZaynaxCall.ts — client hook: calls initiateConsultation mutation,
//     opens socket.io-client connection DIRECTLY to Zaynax's socket server
//     (https://api.zaynax.health) using the returned zaynaxAuthToken, emits
//     PATIENT_OUTGOING_CALL, listens for DOCTOR_CALL_ACCEPTED/REJECTED/
//     DOCTOR_OFFLINE, 30s ring timeout, joins Jitsi via
//     window.JitsiMeetExternalAPI on accept, reports status back via
//     useUpdateConsultationStatusMutation. Requires `npm install socket.io-client`.

//   components/CustomerConsultant.tsx — customer-facing page: "Start New
//     Consultation" button + live call status + Jitsi container div (no
//     manual <iframe>, JitsiMeetExternalAPI mounts its own) + paginated table
//     of past consultations + total-taken count. Loads Jitsi's
//     external_api.js via next/script (strategy="lazyOnload").

// ARCHITECTURE PRINCIPLE: Zaynax secrets (clientId/secretKey/IV) never leave
// the backend. All Zaynax REST calls happen server-side. Only the socket.io
// connection + Jitsi video happen directly from the browser, using a
// short-lived per-patient Bearer token the backend fetches and forwards.

// CURRENT OPEN ISSUE (unresolved as of last message):
//   "consultations?.map is not a function" runtime error in
//   CustomerConsultant.tsx. Suspected cause: mismatch between how baseApi's
//   baseQuery unwraps the backend's sendResponse envelope
//   ({ success, message, data: { data: [...], meta } }) vs. what
//   IConsultationListResponse assumes — i.e. listRes.data might be the
//   { data, meta } object, not directly the array. Was asking user to share
//   baseApi.ts's baseQuery + the actual consultant.api.ts to confirm the
//   correct shape and fix both the type and the component in one pass.





// Detaisl  {
//   z_id: '6a5f378ff586fcdb046695c6',
//   patientID: '6a5f378f4d885a3be9cb80e5',
//   appointmentFor: 'Joy',
//   doctorID: '66839857343d4b7926d1c45f',
//   chamberDetails: null,
//   bookingType: 'QUICK_BOOKING',
//   receptionistID: 'ADMIN',
//   speciality: 'ENT Specialist',
//   bookingDate: '2026-07-22T11:40:00.000Z',
//   bookingDateISO: '2026-07-22T00:00:00.000Z',
//   slot: '5:40PM-6:00PM',
//   consultationFee: 25,
//   oldConsultationFee: 0,
//   callStatus: 'PROCESSING',
//   isRescheduled: false,
//   rescheduleDate: null,
//   rescheduleSlot: '',
//   isInstant: true,
//   patientInfo: { mobileNumber: '01918557168', name: 'Joy -' },
//   comments: [],
//   discount: 0,
//   corporateClientId: '696cccca8096af1623a36b8b',
//   userType: 'CORPORATE',
//   invoiceUrl: '',
//   isMetlifeUserBooking: false,
//   appointmentType: 'QUICK_APPOINTMENT',
//   ratingDetails: null,
//   isCallback: false,
//   isOutgoing: false,
//   callDuration: '0m:0s',
//   prescriptionWriteDuration: '0m:0s',
//   appointmentLink: null,
//   isMetlifeSpecialistAppointment: false,
//   isPremiumPlusFreeAppointment: false,
//   clientSideAppointmentId: '6a60a8374a8cd2583d0d18d6',
//   referrerId: null,
//   isAiGenerated: false,
//   appointmentNumber: '4851237294604',
//   prescriptions: [
//     {
//       prescriptionURL: 'https://cdn.zaynaxhealth.com/patient_images/1784719522624.pdf',
//       timestamp: '2026-07-22T11:27:52.310Z'
//     }
//   ],
//   status: [
//     {
//       timestamp: '2026-07-22T11:24:14.132Z',
//       status: 'ON_HOLD',
//       updatedBy: 'SYSTEM',
//       message: 'Appointment has been placed successfully.'
//     },
//     {
//       status: 'PROCESSING',
//       updatedBy: 'SYSTEM',
//       message: 'Payment Complete, Awaiting Confirmation, Transaction ID: 6a60a85e12ebebcb59e496bf',
//       timestamp: '2026-07-22T11:24:14.544Z'
//     },
//     {
//       status: 'UPCOMING',
//       updatedBy: 'SYSTEM',
//       message: 'A Doctor Has been Assigned to you',
//       timestamp: '2026-07-22T11:24:14.592Z'
//     }
//   ],
//   orderDate: '2026-07-22T11:24:14.132Z',
//   callAttemptHistory: [ { timestamp: '2026-07-22T11:24:14.132Z', loggedInDoctorIDs: [] } ],
//   createdAt: '2026-07-22T11:24:14.135Z',
//   updatedAt: '2026-07-22T11:27:52.318Z',
//   lastStatus: 'UPCOMING',
//   callStartTime: '1784719457807',
//   remainingHours: '11 minutes',
//   id: '6a60a85edec7dd585d64ded7',
//   doctorInfo: {
//     image: 'https://www.shutterstock.com/image-photo/portrait-handsome-hispanic-male-doctor-600nw-2608441611.jpg',
//     firstName: { en: 'Dr Mukut', bn: '' },
//     lastName: { en: 'Test 1', bn: '' },
//     speciality: [ [Object] ],
//     rating: '4',
//     email: 'td1@gmail.com',
//     docContact: { primary: '01780045987', secondary: '' },
//     yearOfExperience: '10'
//   },
//   packageName: { en: 'KOKOMO one call', bn: '' }
// }
