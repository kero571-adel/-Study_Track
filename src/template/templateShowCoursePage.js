// import React, { useState, useRef } from 'react';
// import { ThemeProvider, createTheme } from '@mui/material/styles';
// import {
//   Container, Grid, Card, CardContent, CardHeader,
//   Button, Typography, Box, Divider, Chip,
//   Tabs, Tab, List, ListItem, ListItemText,
//   Accordion, AccordionSummary, AccordionDetails,
//   IconButton, Rating, LinearProgress, Avatar
// } from '@mui/material';
// import {
//   ExpandMore, PlayArrow, AccessTime,
//   CheckCircle, Download, Share,
//   Favorite, MenuBook, QuestionAnswer, PlayCircleFilled
// } from '@mui/icons-material';

// // استيراد ReactPlayer بشكل صحيح
// import ReactPlayer from 'react-player';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#3f51b5',
//     },
//     secondary: {
//       main: '#f50057',
//     },
//     background: {
//       default: '#f5f5f5'
//     }
//   },
//   direction: 'rtl',
// });

// // بيانات وهمية للكورس
// const courseData = {
//   id: 1,
//   title: 'تعلم React.js من الصفر إلى الاحتراف',
//   instructor: 'أحمد محمد',
//   instructorAvatar: 'https://via.placeholder.com/50',
//   rating: 4.8,
//   totalRatings: 1245,
//   students: 9850,
//   duration: '15h 30m',
//   lectures: 84,
//   level: 'مبتدئ',
//   price: 'مجاني',
//   description: 'هذه الدورة ستأخذك في رحلة تعلم React.js من الأساسيات إلى المستوى المتقدم. ستتعلم كيفية بناء تطبيقات ويب تفاعلية باستخدام أحدث التقنيات والمكتبات.',
//   objectives: [
//     'فهم أساسيات React.js ومفاهيم المكونات',
//     'تعلم كيفية استخدام Hooks وإدارة الحالة',
//     'بناء تطبيقات حقيقية باستخدام React',
//     'التكامل مع APIs وقواعد البيانات',
//     'نشر التطبيقات على منصات الاستضافة'
//   ],
//   requirements: [
//     'معرفة أساسية بـ HTML و CSS',
//     'مقدمة في JavaScript',
//     'لا يلزم خبرة سابقة في React'
//   ]
// };

// // محتوى الكورس (فصول ودروس)
// const courseContent = [
//   {
//     id: 1,
//     title: 'مقدمة إلى React',
//     lectures: 5,
//     duration: '45m',
//     lessons: [
//       { id: 1, title: 'ما هو React ولماذا نستخدمه؟', duration: '10m', videoId: 'dGcsHMXbSOA', completed: true },
//       { id: 2, title: 'إعداد بيئة التطوير', duration: '15m', videoId: 'dGcsHMXbSOA', completed: true },
//       { id: 3, title: 'إنشاء أول مكون', duration: '20m', videoId: 'dGcsHMXbSOA', completed: false }
//     ]
//   },
//   {
//     id: 2,
//     title: 'المكونات والخصائص (Components & Props)',
//     lectures: 6,
//     duration: '1h 10m',
//     lessons: [
//       { id: 4, title: 'إنشاء مكونات وظيفية', duration: '15m', videoId: 'dGcsHMXbSOA', completed: false },
//       { id: 5, title: 'استخدام الخصائص (Props)', duration: '20m', videoId: 'dGcsHMXbSOA', completed: false },
//       { id: 6, title: 'تكوين المكونات', duration: '35m', videoId: 'dGcsHMXbSOA', completed: false }
//     ]
//   },
//   {
//     id: 3,
//     title: 'الحالة والأحداث (State & Events)',
//     lectures: 8,
//     duration: '2h 15m',
//     lessons: [
//       { id: 7, title: 'إدارة الحالة مع useState', duration: '25m', videoId: 'dGcsHMXbSOA', completed: false },
//       { id: 8, title: 'معالجة الأحداث', duration: '20m', videoId: 'dGcsHMXbSOA', completed: false }
//     ]
//   }
// ];

// const ShowCoursePage = () => {
//   const [tabValue, setTabValue] = useState(0);
//   const [currentVideo, setCurrentVideo] = useState(courseContent[0].lessons[0]);
//   const [expandedSection, setExpandedSection] = useState(1);
//   const [isPlaying, setIsPlaying] = useState(false);
//   const playerRef = useRef(null);

//   const handleTabChange = (event, newValue) => {
//     setTabValue(newValue);
//   };

//   const handleSectionClick = (sectionId) => {
//     setExpandedSection(expandedSection === sectionId ? null : sectionId);
//   };

//   const handleLessonClick = (lesson) => {
//     setCurrentVideo(lesson);
//     setIsPlaying(true); // سيبدأ التشغيل بعد تفاعل المستخدم
//   };

//   const handlePlay = () => {
//     setIsPlaying(true);
//   };

//   const handlePause = () => {
//     setIsPlaying(false);
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <Container maxWidth="lg" sx={{ py: 4 }}>
//         <Grid container spacing={4}>
//           {/* العمود الرئيسي - محتوى الكورس */}
//           <Grid item xs={12} md={8}>
//             {/* مشغل الفيديو */}
//             <Card sx={{ mb: 3 }}>
//               <Box sx={{ position: 'relative', pt: '56.25%', backgroundColor: '#000' }}>
//                 <ReactPlayer
//                   ref={playerRef}
//                   url={`https://www.youtube.com/watch?v=${currentVideo.videoId}`}
//                   width="100%"
//                   height="100%"
//                   controls
//                   playing={isPlaying}
//                   onPlay={handlePlay}
//                   onPause={handlePause}
//                   style={{ position: 'absolute', top: 0, left: 0 }}
//                   config={{
//                     youtube: {
//                       playerVars: {
//                         modestbranding: 1,
//                         rel: 0,
//                         showinfo: 0
//                       }
//                     }
//                   }}
//                 />
//                 {!isPlaying && (
//                   <Box
//                     sx={{
//                       position: 'absolute',
//                       top: 0,
//                       left: 0,
//                       right: 0,
//                       bottom: 0,
//                       display: 'flex',
//                       alignItems: 'center',
//                       justifyContent: 'center',
//                       backgroundColor: 'rgba(0, 0, 0, 0.5)',
//                       cursor: 'pointer',
//                       zIndex: 10
//                     }}
//                     onClick={handlePlay}
//                   >
//                     <PlayCircleFilled sx={{ fontSize: 80, color: 'white' }} />
//                   </Box>
//                 )}
//               </Box>
//               <CardContent>
//                 <Typography variant="h5" gutterBottom>
//                   {currentVideo.title}
//                 </Typography>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mt: 2 }}>
//                   <Button 
//                     variant="contained" 
//                     startIcon={<PlayArrow />}
//                     sx={{ mr: 1 }}
//                     onClick={handlePlay}
//                   >
//                     تشغيل الفيديو
//                   </Button>
//                   <IconButton>
//                     <Download />
//                   </IconButton>
//                   <IconButton>
//                     <Share />
//                   </IconButton>
//                   <IconButton>
//                     <Favorite />
//                   </IconButton>
//                 </Box>
//               </CardContent>
//             </Card>

//             {/* معلومات الكورس */}
//             <Card>
//               <Tabs 
//                 value={tabValue} 
//                 onChange={handleTabChange}
//                 variant="fullWidth"
//               >
//                 <Tab icon={<MenuBook />} label="محتويات الكورس" />
//                 <Tab icon={<QuestionAnswer />} label="المناقشات" />
//                 <Tab icon={<AccessTime />} label="التقدم" />
//               </Tabs>
              
//               <Divider />
              
//               <CardContent>
//                 {tabValue === 0 && (
//                   <Box>
//                     <Typography variant="h6" gutterBottom>
//                       محتوى الكورس
//                     </Typography>
                    
//                     {courseContent.map((section) => (
//                       <Accordion 
//                         key={section.id} 
//                         expanded={expandedSection === section.id}
//                         onChange={() => handleSectionClick(section.id)}
//                       >
//                         <AccordionSummary expandIcon={<ExpandMore />}>
//                           <Box sx={{ width: '100%' }}>
//                             <Typography variant="subtitle1">
//                               {section.title}
//                             </Typography>
//                             <Box sx={{ display: 'flex', mt: 1 }}>
//                               <Typography variant="body2" sx={{ mr: 2 }}>
//                                 {section.lectures} محاضرات
//                               </Typography>
//                               <Typography variant="body2">
//                                 {section.duration}
//                               </Typography>
//                             </Box>
//                           </Box>
//                         </AccordionSummary>
//                         <AccordionDetails>
//                           <List>
//                             {section.lessons.map((lesson) => (
//                               <ListItem 
//                                 key={lesson.id} 
//                                 button 
//                                 selected={currentVideo.id === lesson.id}
//                                 onClick={() => handleLessonClick(lesson)}
//                                 sx={{ 
//                                   borderRadius: 1,
//                                   mb: 1,
//                                   bgcolor: currentVideo.id === lesson.id ? 'primary.light' : 'transparent',
//                                   color: currentVideo.id === lesson.id ? 'primary.contrastText' : 'text.primary'
//                                 }}
//                               >
//                                 <ListItemText 
//                                   primary={
//                                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                                       <PlayArrow sx={{ fontSize: 16, mr: 1 }} />
//                                       {lesson.title}
//                                       {lesson.completed && (
//                                         <CheckCircle sx={{ fontSize: 16, color: 'success.main', ml: 1 }} />
//                                       )}
//                                     </Box>
//                                   } 
//                                   secondary={
//                                     <Box sx={{ display: 'flex', alignItems: 'center', mt: 0.5 }}>
//                                       <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
//                                       {lesson.duration}
//                                     </Box>
//                                   }
//                                 />
//                               </ListItem>
//                             ))}
//                           </List>
//                         </AccordionDetails>
//                       </Accordion>
//                     ))}
//                   </Box>
//                 )}
                
//                 {tabValue === 1 && (
//                   <Box>
//                     <Typography variant="h6" gutterBottom>
//                       مناقشات الكورس
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary">
//                       سيتم تفعيل نظام المناقشات قريباً...
//                     </Typography>
//                   </Box>
//                 )}
                
//                 {tabValue === 2 && (
//                   <Box>
//                     <Typography variant="h6" gutterBottom>
//                       تقدمك في الكورس
//                     </Typography>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                       <Box sx={{ width: '100%', mr: 1 }}>
//                         <LinearProgress variant="determinate" value={35} sx={{ height: 10, borderRadius: 5 }} />
//                       </Box>
//                       <Box sx={{ minWidth: 35 }}>
//                         <Typography variant="body2" color="text.secondary">
//                           {`35%`}
//                         </Typography>
//                       </Box>
//                     </Box>
//                     <Typography variant="body2">
//                       لقد أكملت 5 من 19 درس (26%)
//                     </Typography>
//                   </Box>
//                 )}
//               </CardContent>
//             </Card>
//           </Grid>

//           {/* العمود الجانبي - معلومات الكورس */}
//           <Grid item xs={12} md={4}>
//             <Card sx={{ position: 'sticky', top: 20 }}>
//               <CardHeader 
//                 title={courseData.title}
//                 subheader={`بواسطة ${courseData.instructor}`}
//               />
              
//               <CardContent>
//                 <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                   <Rating value={courseData.rating} precision={0.1} readOnly />
//                   <Typography variant="body2" sx={{ ml: 1 }}>
//                     {courseData.rating} ({courseData.totalRatings} تقييم)
//                   </Typography>
//                 </Box>
                
//                 <Box sx={{ mb: 2 }}>
//                   <Chip label={courseData.level} sx={{ mr: 1, mb: 1 }} />
//                   <Chip label={courseData.duration} sx={{ mr: 1, mb: 1 }} />
//                   <Chip label={`${courseData.lectures} محاضرة`} sx={{ mr: 1, mb: 1 }} />
//                 </Box>
                
//                 <Button 
//                   variant="contained" 
//                   fullWidth 
//                   size="large"
//                   sx={{ mb: 2 }}
//                 >
//                   {courseData.price === 'مجاني' ? 'التحق بالكورس' : `شراء الكورس - ${courseData.price}`}
//                 </Button>
                
//                 <Box sx={{ mb: 2 }}>
//                   <Typography variant="body2" gutterBottom>
//                     <strong>يشمل:</strong>
//                   </Typography>
//                   <Typography variant="body2">
//                     • وصول كامل مدى الحياة
//                   </Typography>
//                   <Typography variant="body2">
//                     • شهادة إتمام
//                   </Typography>
//                   <Typography variant="body2">
//                     • تمارين عملية
//                   </Typography>
//                 </Box>
                
//                 <Divider sx={{ my: 2 }} />
                
//                 <Box sx={{ mb: 2 }}>
//                   <Typography variant="body2" gutterBottom>
//                     <strong>المتطلبات:</strong>
//                   </Typography>
//                   {courseData.requirements.map((req, index) => (
//                     <Typography key={index} variant="body2">
//                       • {req}
//                     </Typography>
//                   ))}
//                 </Box>
                
//                 <Divider sx={{ my: 2 }} />
                
//                 <Box>
//                   <Typography variant="body2" gutterBottom>
//                     <strong>الأهداف التعليمية:</strong>
//                   </Typography>
//                   {courseData.objectives.map((obj, index) => (
//                     <Typography key={index} variant="body2">
//                       • {obj}
//                     </Typography>
//                   ))}
//                 </Box>
//               </CardContent>
//             </Card>
            
//             {/* معلومات المدرب */}
//             <Card sx={{ mt: 3 }}>
//               <CardHeader 
//                 title="عن المدرب"
//                 avatar={
//                   <Avatar src={courseData.instructorAvatar} />
//                 }
//               />
//               <CardContent>
//                 <Typography variant="body2" gutterBottom>
//                   مطور واجهات أمامية بخبرة تزيد عن 5 سنوات. متخصص في React.js ولديه شغف كبير بتعليم البرمجة.
//                 </Typography>
//                 <Box sx={{ mt: 2 }}>
//                   <Typography variant="body2">
//                     <strong>4 دورات</strong>
//                   </Typography>
//                   <Typography variant="body2">
//                     <strong>{courseData.students} طالب</strong>
//                   </Typography>
//                 </Box>
//               </CardContent>
//             </Card>
//           </Grid>
//         </Grid>
//       </Container>
//     </ThemeProvider>
//   );
// };

// export default ShowCoursePage;