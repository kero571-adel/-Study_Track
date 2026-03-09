// import React, { useState } from "react";
// import { ThemeProvider, createTheme } from "@mui/material/styles";
// import {
//   Container,
//   Grid,
//   Card,
//   CardContent,
//   Button,
//   Typography,
//   Box,
//   Divider,
//   Chip,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   LinearProgress,
//   Avatar,
// } from "@mui/material";
// import {
//   PlayArrow,
//   Pause,
//   VolumeUp,
//   VolumeOff,
//   Fullscreen,
//   CheckCircle,
//   ArrowBack,
//   ArrowForward,
//   MenuBook,
// } from "@mui/icons-material";
// import ReactPlayer from "react-player";

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: "#3f51b5",
//     },
//     secondary: {
//       main: "#f50057",
//     },
//     background: {
//       default: "#f5f5f5",
//     },
//   },
//   direction: "rtl",
// });

// // بيانات وهمية للكورس والدروس
// const courseData = {
//   id: 1,
//   title: "تعلم React.js من الصفر إلى الاحتراف",
//   instructor: "أحمد محمد",
//   progress: 35,
//   currentLesson: 3,
//   totalLessons: 19,
// };

// // محتوى الكورس (فصول ودروس)
// const courseContent = [
//   {
//     id: 1,
//     title: "مقدمة إلى React",
//     lectures: 5,
//     duration: "45m",
//     completed: true,
//     lessons: [
//       {
//         id: 1,
//         title: "ما هو React ولماذا نستخدمه؟",
//         duration: "10m",
//         videoId: "-5oof3k6nCQ",
//         completed: true,
//       },
//       {
//         id: 2,
//         title: "إعداد بيئة التطوير",
//         duration: "15m",
//         videoId: "dGcsHMXbSOA",
//         completed: true,
//       },
//       {
//         id: 3,
//         title: "إنشاء أول مكون",
//         duration: "20m",
//         videoId: "dGcsHMXbSOA",
//         completed: true,
//       },
//     ],
//   },
//   {
//     id: 2,
//     title: "المكونات والخصائص (Components & Props)",
//     lectures: 6,
//     duration: "1h 10m",
//     completed: false,
//     lessons: [
//       {
//         id: 4,
//         title: "إنشاء مكونات وظيفية",
//         duration: "15m",
//         videoId: "dGcsHMXbSOA",
//         completed: false,
//       },
//       {
//         id: 5,
//         title: "استخدام الخصائص (Props)",
//         duration: "20m",
//         videoId: "dGcsHMXbSOA",
//         completed: false,
//       },
//       {
//         id: 6,
//         title: "تكوين المكونات",
//         duration: "35m",
//         videoId: "dGcsHMXbSOA",
//         completed: false,
//       },
//     ],
//   },
//   {
//     id: 3,
//     title: "الحالة والأحداث (State & Events)",
//     lectures: 8,
//     duration: "2h 15m",
//     completed: false,
//     lessons: [
//       {
//         id: 7,
//         title: "إدارة الحالة مع useState",
//         duration: "25m",
//         videoId: "dGcsHMXbSOA",
//         completed: false,
//       },
//       {
//         id: 8,
//         title: "معالجة الأحداث",
//         duration: "20m",
//         videoId: "dGcsHMXbSOA",
//         completed: false,
//       },
//     ],
//   },
// ];

// const StudyCoursePage = () => {
//   const [currentLesson, setCurrentLesson] = useState(
//     courseContent[0].lessons[2]
//   );
//   const [isPlaying, setIsPlaying] = useState(false);
//   const [playerReady, setPlayerReady] = useState(false);

//   // العثور على الفصل الحالي
//   const currentSection = courseContent.find((section) =>
//     section.lessons.some((lesson) => lesson.id === currentLesson.id)
//   );

//   // العثور على индекс الدرس الحالي
//   const currentLessonIndex = currentSection.lessons.findIndex(
//     (lesson) => lesson.id === currentLesson.id
//   );

//   // الانتقال إلى الدرس التالي
//   const goToNextLesson = () => {
//     if (currentLessonIndex < currentSection.lessons.length - 1) {
//       const nextLesson = currentSection.lessons[currentLessonIndex + 1];
//       setCurrentLesson(nextLesson);
//       setIsPlaying(true);
//     }
//   };

//   // الانتقال إلى الدرس السابق
//   const goToPrevLesson = () => {
//     if (currentLessonIndex > 0) {
//       const prevLesson = currentSection.lessons[currentLessonIndex - 1];
//       setCurrentLesson(prevLesson);
//       setIsPlaying(true);
//     }
//   };

//   // تحديد إذا كان هناك درس سابق
//   const hasPrevLesson = currentLessonIndex > 0;

//   // تحديد إذا كان هناك درس تالي
//   const hasNextLesson = currentLessonIndex < currentSection.lessons.length - 1;

//   return (
//     <ThemeProvider theme={theme}>
//       <Box sx={{ display: "flex", height: "100vh", overflow: "hidden" }}>
//         {/* الشريط الجانبي لمحتوى الكورس */}
//         <Box
//           sx={{
//             width: 320,
//             flexShrink: 0,
//             borderLeft: "1px solid #e0e0e0",
//             overflowY: "auto",
//           }}
//         >
//           <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
//             <Typography variant="h6" gutterBottom>
//               {courseData.title}
//             </Typography>
//             <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//               <Avatar
//                 sx={{ width: 24, height: 24, mr: 1 }}
//                 src="https://via.placeholder.com/24"
//               />
//               <Typography variant="body2">{courseData.instructor}</Typography>
//             </Box>
//             <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//               <Box sx={{ width: "100%", mr: 1 }}>
//                 <LinearProgress
//                   variant="determinate"
//                   value={courseData.progress}
//                 />
//               </Box>
//               <Typography variant="body2">{courseData.progress}%</Typography>
//             </Box>
//             <Typography variant="body2">
//               {courseData.currentLesson} / {courseData.totalLessons} دروس
//             </Typography>
//           </Box>

//           <Box sx={{ p: 2 }}>
//             {courseContent.map((section) => (
//               <Box key={section.id} sx={{ mb: 3 }}>
//                 <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
//                   <MenuBook sx={{ fontSize: 18, mr: 1 }} />
//                   <Typography variant="subtitle1">{section.title}</Typography>
//                   {section.completed && (
//                     <CheckCircle
//                       sx={{ fontSize: 18, color: "success.main", ml: 1 }}
//                     />
//                   )}
//                 </Box>
//                 <List dense>
//                   {section.lessons.map((lesson) => (
//                     <ListItem
//                       key={lesson.id}
//                       button
//                       selected={currentLesson.id === lesson.id}
//                       onClick={() => {
//                         setCurrentLesson(lesson);
//                         setIsPlaying(true);
//                       }}
//                       sx={{
//                         borderRadius: 1,
//                         mb: 0.5,
//                         bgcolor:
//                           currentLesson.id === lesson.id
//                             ? "primary.light"
//                             : "transparent",
//                         color:
//                           currentLesson.id === lesson.id
//                             ? "primary.contrastText"
//                             : "text.primary",
//                       }}
//                     >
//                       <ListItemText
//                         primary={
//                           <Box sx={{ display: "flex", alignItems: "center" }}>
//                             <PlayArrow sx={{ fontSize: 14, mr: 1 }} />
//                             {lesson.title}
//                             {lesson.completed && (
//                               <CheckCircle
//                                 sx={{
//                                   fontSize: 14,
//                                   color: "success.main",
//                                   ml: 1,
//                                 }}
//                               />
//                             )}
//                           </Box>
//                         }
//                         secondary={lesson.duration}
//                       />
//                     </ListItem>
//                   ))}
//                 </List>
//               </Box>
//             ))}
//           </Box>
//         </Box>

//         {/* المنطقة الرئيسية للفيديو والمحتوى */}
//         <Box sx={{ flexGrow: 1, display: "flex", flexDirection: "column" }}>
//           {/* مشغل الفيديو */}
//           <Box
//             sx={{
//               position: "relative",
//               width: "100%",
//               height: "56.25%",
//               backgroundColor: "#000",
//             }}
//           >
//             <ReactPlayer
//               // url={`https://www.youtube.com/watch?v=${currentLesson.videoId}`}
//               url={'youtube.com/watch?v=-5oof3k6nCQ'}
//               width="100%"
//               height="100%"
//               playing={isPlaying}
//               controls
//               onReady={() => setPlayerReady(true)}
//               onPlay={() => setIsPlaying(true)}
//               onPause={() => setIsPlaying(false)}
//               config={{
//                 youtube: {
//                   playerVars: {
//                     modestbranding: 1,
//                     rel: 0,
//                     showinfo: 0,
//                   },
//                 },
//               }}
//             />

//             {!playerReady && (
//               <Box
//                 sx={{
//                   position: "absolute",
//                   top: 0,
//                   left: 0,
//                   right: 0,
//                   bottom: 0,
//                   display: "flex",
//                   alignItems: "center",
//                   justifyContent: "center",
//                   backgroundColor: "rgba(0, 0, 0, 0.7)",
//                   color: "white",
//                 }}
//               >
//                 <Typography>جاري تحميل الفيديو...</Typography>
//               </Box>
//             )}
//           </Box>

//           {/* أدوات التحكم والتنقل */}
//           <Box
//             sx={{
//               p: 2,
//               borderTop: "1px solid #e0e0e0",
//               backgroundColor: "white",
//             }}
//           >
//             <Box
//               sx={{
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//               }}
//             >
//               <Button
//                 variant="outlined"
//                 startIcon={<ArrowBack />}
//                 onClick={goToPrevLesson}
//                 disabled={!hasPrevLesson}
//               >
//                 الدرس السابق
//               </Button>

//               <Box sx={{ display: "flex", alignItems: "center" }}>
//                 <Chip
//                   label={`الدرس ${currentLessonIndex + 1} من ${
//                     currentSection.lessons.length
//                   }`}
//                   variant="outlined"
//                   sx={{ mx: 1 }}
//                 />
//                 <Typography variant="body2">{currentSection.title}</Typography>
//               </Box>

//               <Button
//                 variant="contained"
//                 endIcon={<ArrowForward />}
//                 onClick={goToNextLesson}
//                 disabled={!hasNextLesson}
//               >
//                 الدرس التالي
//               </Button>
//             </Box>
//           </Box>

//           {/* محتوى الدرس (شرح، ملاحظات، إلخ) */}
//           <Box sx={{ p: 3, overflowY: "auto", flexGrow: 1 }}>
//             <Card>
//               <CardContent>
//                 <Typography variant="h5" gutterBottom>
//                   {currentLesson.title}
//                 </Typography>
//                 <Typography variant="body2" color="text.secondary" paragraph>
//                   مدة الدرس: {currentLesson.duration}
//                 </Typography>

//                 <Typography variant="body1" paragraph>
//                   هذا هو محتوى الشرح للدرس. هنا يمكنك إضافة الشرح الكامل للدرس،
//                   الأكواد البرمجية، الملاحظات، والموارد الإضافية.
//                 </Typography>

//                 <Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 1, my: 2 }}>
//                   <Typography variant="h6" gutterBottom>
//                     الكود البرمجي للدرس:
//                   </Typography>
//                   <Box
//                     component="pre"
//                     sx={{
//                       bgcolor: "#263238",
//                       color: "white",
//                       p: 2,
//                       borderRadius: 1,
//                       overflowX: "auto",
//                     }}
//                   >
//                     {`function ExampleComponent() {
//                       const [count, setCount] = useState(0);
                      
//                       return (
//                         <div>
//                           <p>لقد نقرت {count} مرات</p>
//                           <button onClick={() => setCount(count + 1)}>
//                             انقر هنا
//                           </button>
//                         </div>
//                       );
//                     }`}
//                   </Box>
//                 </Box>

//                 <Typography variant="body1" paragraph>
//                   يمكنك إضافة المزيد من المحتوى مثل المرفقات، الاختبارات
//                   القصيرة، أو الموارد الإضافية.
//                 </Typography>

//                 <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
//                   <Button variant="outlined" size="small">
//                     تحميل الملفات المرفقة
//                   </Button>
//                   <Button variant="outlined" size="small">
//                     اختبار قصير
//                   </Button>
//                   <Button variant="outlined" size="small">
//                     مناقشة الدرس
//                   </Button>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Box>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// };

// export default StudyCoursePage;
