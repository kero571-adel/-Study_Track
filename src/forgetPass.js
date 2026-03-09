// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Modal,
//   TextField,
//   Typography,
//   Alert,
// } from "@mui/material";

// const style = {
//   position: "absolute",
//   top: "50%",
//   left: "50%",
//   transform: "translate(-50%, -50%)",
//   width: 400,
//   bgcolor: "background.paper",
//   borderRadius: 3,
//   boxShadow: 24,
//   p: 4,
// };

// export default function ForgetPasswordModal({ open, onClose, onLogin }) {
//   const [email, setEmail] = useState("");
//   const [step, setStep] = useState(1); // 1=ايميل, 2=كود
//   const [generatedCode, setGeneratedCode] = useState("");
//   const [inputCode, setInputCode] = useState("");
//   const [message, setMessage] = useState("");

//   const handleNext = () => {
//     const storedUser = JSON.parse(localStorage.getItem("users"));

//     if (!storedUser || storedUser.email !== email) {
//       setMessage("❌ هذا البريد الإلكتروني غير مسجل.");
//       return;
//     }

//     // لو الإيميل موجود، نولّد كود عشوائي
//     const code = Math.floor(100000 + Math.random() * 900000).toString();
//     setGeneratedCode(code);
//     console.log("🔹 كود التحقق:", code); // كأننا "بنبعته بالإيميل"

//     setMessage("✅ تم إرسال كود مكون من 6 أرقام إلى بريدك الإلكتروني.");
//     setStep(2);
//   };

//   const handleVerify = () => {
//     if (inputCode === generatedCode) {
//       setMessage("✅ تم التحقق بنجاح! يتم تسجيل الدخول الآن...");
//       setTimeout(() => {
//         onLogin(); // تستدعي دالة تسجيل الدخول اللي انت هتحددها
//         onClose();
//       }, 1500);
//     } else {
//       setMessage("❌ الكود غير صحيح. حاول مرة أخرى.");
//     }
//   };

//   return (
//     <Modal open={open} onClose={onClose}>
//       <Box sx={style}>
//         <Typography variant="h6" mb={2}>
//           نسيت كلمة المرور
//         </Typography>

//         {message && (
//           <Alert
//             severity={
//               message.includes("❌")
//                 ? "error"
//                 : message.includes("✅")
//                 ? "success"
//                 : "info"
//             }
//             sx={{ mb: 2 }}
//           >
//             {message}
//           </Alert>
//         )}

//         {step === 1 ? (
//           <>
//             <TextField
//               label="البريد الإلكتروني"
//               fullWidth
//               value={email}
//               onChange={(e) => setEmail(e.target.value)}
//               sx={{ mb: 2 }}
//             />
//             <Button
//               variant="contained"
//               fullWidth
//               onClick={handleNext}
//               disabled={!email}
//             >
//               التالي
//             </Button>
//           </>
//         ) : (
//           <>
//             <TextField
//               label="أدخل كود التحقق"
//               fullWidth
//               value={inputCode}
//               onChange={(e) => setInputCode(e.target.value)}
//               sx={{ mb: 2 }}
//             />
//             <Button
//               variant="contained"
//               fullWidth
//               onClick={handleVerify}
//               disabled={!inputCode}
//             >
//               تحقق
//             </Button>
//           </>
//         )}
//       </Box>
//     </Modal>
//   );
// }
