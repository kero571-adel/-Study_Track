import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import FormatListBulletedIcon from "@mui/icons-material/FormatListBulleted";
import CloseIcon from "@mui/icons-material/Close";
import {
  LinearProgress,
  Container,
  Card,
  CardContent,
  Button,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Avatar,
} from "@mui/material";
import {
  ArrowBack,
  PlayArrow,
  CheckCircle,
  PlayCircleFilled,
  ArrowForward,
} from "@mui/icons-material";
import { MenuBook } from "@mui/icons-material";
const theme = createTheme({
  palette: {
    primary: { main: "#3f51b5" },
    secondary: { main: "#f50057" },
    background: { default: "#f5f5f5" },
  },
  direction: "rtl",
});

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

CustomTabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};
const courseData = {
  id: 1,
  title: "تعلم React.js من الصفر إلى الاحتراف",
  instructor: "أحمد محمد",
  progress: 35,
  currentLesson: 3,
  totalLessons: 19,
};
// بيانات تجريبية للمحتوى
const courseContent = [
  {
    id: 1,
    title: "مقدمة إلى React",
    lectures: 5,
    duration: "45m",
    completed: true,
    lessons: [
      {
        id: 1,
        title: "ما هو React ولماذا نستخدمه؟",
        duration: "10m",
        videoUrl: "https://www.youtube.com/watch?v=mvZHDpCHphk",
        completed: true,
      },
      {
        id: 2,
        title: "إعداد بيئة التطوير",
        duration: "15m",
        videoUrl: "https://www.youtube.com/watch?v=02a5T6ktx8M",
        completed: true,
      },
      {
        id: 3,
        title: "إنشاء أول مكون",
        duration: "20m",
        videoUrl: "https://www.youtube.com/watch?v=xiMHoMVWdI4",
        completed: true,
      },
    ],
  },
  {
    id: 2,
    title: "المكونات والخصائص (Components & Props)",
    lectures: 6,
    duration: "1h 10m",
    completed: false,
    lessons: [
      {
        id: 4,
        title: "إنشاء مكونات وظيفية",
        duration: "15m",
        videoUrl: "https://www.youtube.com/watch?v=YsENRLNaYug",
        completed: false,
      },
      {
        id: 5,
        title: "استخدام الخصائص (Props)",
        duration: "20m",
        videoUrl: "https://www.youtube.com/watch?v=zlkIcCHj3Dg",
        completed: false,
      },
      {
        id: 6,
        title: "تكوين المكونات",
        duration: "35m",
        videoUrl: "https://www.youtube.com/watch?v=43lT7k0Zws0",
        completed: false,
      },
    ],
  },
  {
    id: 3,
    title: "الحالة والأحداث (State & Events)",
    lectures: 8,
    duration: "2h 15m",
    completed: false,
    lessons: [
      {
        id: 7,
        title: "إدارة الحالة مع useState",
        duration: "25m",
        videoUrl: "https://www.youtube.com/watch?v=hQnZxqp3Q0Y",
        completed: false,
      },
      {
        id: 8,
        title: "معالجة الأحداث",
        duration: "20m",
        videoUrl: "https://www.youtube.com/watch?v=U0307lBCiDk",
        completed: false,
      },
    ],
  },
];
function getYouTubeId(url) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
}
export default function StudyCoursePage() {
  const [currentVideo, setCurrentVideo] = useState(courseContent[0].lessons[0]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [openList, setOpenList] = useState(false);
  const currentSection = courseContent.find((section) =>
    section.lessons.some((lesson) => lesson.id === currentVideo.id)
  );
  // العثور على индекс الدرس الحالي
  const currentLessonIndex = currentSection.lessons.findIndex(
    (lesson) => lesson.id === currentVideo.id
  );
  const goToNextLesson = () => {
    if (currentLessonIndex < currentSection.lessons.length - 1) {
      const nextLesson = currentSection.lessons[currentLessonIndex + 1];
      setCurrentVideo(nextLesson);
      setIsPlaying(true);
    }
  };

  useEffect(() => {
    // إعادة تعيين حالة التشغيل عند تغيير الفيديو
    setIsPlaying(false);
    setIsReady(false);
  }, [currentVideo]);

  const handlePlay = () => {
    setIsPlaying(true);
  };
  const goToPrevLesson = () => {
    if (currentLessonIndex > 0) {
      const prevLesson = currentSection.lessons[currentLessonIndex - 1];
      setCurrentVideo(prevLesson);
      setIsPlaying(true);
    }
  };

  // تحديد إذا كان هناك درس سابق
  const hasPrevLesson = currentLessonIndex > 0;

  // تحديد إذا كان هناك درس تالي
  const hasNextLesson = currentLessonIndex < currentSection.lessons.length - 1;
  return (
    <ThemeProvider theme={theme}>
      <Container
        sx={{
          mt: 3,
          display: "flex",
          flexDirection: { xs: "column", md: "row" },
          justifyContent: "space-between",
        }}
      >
        <Box
          className="buttonMenu"
          sx={{ display: { xs: "flex", md: "none" } }}
        >
          {!openList ? (
            <FormatListBulletedIcon
              sx={{ color: "white" }}
              onClick={() => setOpenList(!openList)}
            />
          ) : (
            <CloseIcon
              sx={{ color: "white" }}
              onClick={() => setOpenList(!openList)}
            />
          )}
        </Box>
        <Box sx={{ width: { xs: "90%", md: "68%" } }}>
          <Box
            sx={{
              position: "relative",
              pt: "56.25%", // نسبة 16:9
              backgroundColor: "#000",
              width: "100%",
            }}
          >
            <iframe
              src={`https://www.youtube.com/embed/${getYouTubeId(
                currentVideo.videoUrl
              )}`}
              width="100%"
              height="100%"
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                border: "none",
              }}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="YouTube video player"
            />
            {!isPlaying && (
              <Box
                sx={{
                  position: "absolute",
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  backgroundColor: "rgba(0, 0, 0, 0.5)",
                  cursor: "pointer",
                  zIndex: 5,
                }}
                onClick={handlePlay}
              >
                <PlayCircleFilled sx={{ fontSize: 80, color: "white" }} />
              </Box>
            )}
          </Box>
          <Box
            sx={{
              p: 2,
              borderTop: "1px solid #e0e0e0",
              backgroundColor: "white",
            }}
          >
            <Typography variant="h6" sx={{ textAlign: "center"}}>
              {currentSection.title}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}
            >
              <Button
                variant="outlined"
                startIcon={<ArrowBack />}
                onClick={goToPrevLesson}
                disabled={!hasPrevLesson}
                sx={{ fontSize: { xs: "10px", md: "12px" } }}
              ></Button>

              <Box sx={{ display: "flex", alignItems: "center" }}>
                <Chip
                  label={`الدرس ${currentLessonIndex + 1} من ${
                    currentSection.lessons.length
                  }`}
                  variant="outlined"
                  sx={{ mx: 1, fontSize: { xs: "10px", md: "12px" } }}
                />
              </Box>

              <Button
                variant="contained"
                endIcon={<ArrowForward />}
                onClick={goToNextLesson}
                disabled={!hasNextLesson}
                sx={{ fontSize: { xs: "10px", md: "12px" } }}
              ></Button>
            </Box>
          </Box>

          {/* محتوى الدرس (شرح، ملاحظات، إلخ) */}
          <Box sx={{ p: 3, overflowY: "auto", flexGrow: 1 }}>
            <Card>
              <CardContent sx={{ textAlign: "right" }}>
                <Typography
                  variant="h5"
                  gutterBottom
                  sx={{ fontSize: { xs: "16px", md: "20px" } }}
                >
                  {currentVideo.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  مدة الدرس: {currentVideo.duration}
                </Typography>

                <Typography
                  variant="body1"
                  paragraph
                  sx={{ fontSize: { xs: "16px", md: "20px" } }}
                >
                  هذا هو محتوى الشرح للدرس. هنا يمكنك إضافة الشرح الكامل للدرس،
                  الأكواد البرمجية، الملاحظات، والموارد الإضافية.
                </Typography>

                <Box sx={{ bgcolor: "#f5f5f5", p: 2, borderRadius: 1, my: 2 }}>
                  <Typography variant="h6" gutterBottom>
                    الكود البرمجي للدرس:
                  </Typography>
                  <Box
                    component="pre"
                    sx={{
                      bgcolor: "#263238",
                      color: "white",
                      p: 2,
                      borderRadius: 1,
                      overflowX: "auto",
                    }}
                  >
                    {`function ExampleComponent() {
                              const [count, setCount] = useState(0);
                              
                              return (
                                <div>
                                  <p>لقد نقرت {count} مرات</p>
                                  <button onClick={() => setCount(count + 1)}>
                                    انقر هنا
                                  </button>
                                </div>
                              );
                            }`}
                  </Box>
                </Box>

                <Typography variant="body1" paragraph>
                  يمكنك إضافة المزيد من المحتوى مثل المرفقات، الاختبارات
                  القصيرة، أو الموارد الإضافية.
                </Typography>

                <Box sx={{ display: "flex", gap: 1, mt: 3 }}>
                  <Button variant="outlined" size="small">
                    تحميل الملفات المرفقة
                  </Button>
                  <Button variant="outlined" size="small">
                    اختبار قصير
                  </Button>
                  <Button variant="outlined" size="small">
                    مناقشة الدرس
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Box>
        </Box>
        <Box
          sx={{
            width: { xs: openList ? "70%" : "0", md: "30%" },
            position: "relative",
            height: "100vh",
            overflow: "auto",
            position: {
              xs: "absolute",
              md: "relative",
            },
            background: "white",
            zIndex: 10,
          }}
        >
          <Box sx={{ p: 2, borderBottom: "1px solid #e0e0e0" }}>
            <Typography variant="h6" gutterBottom>
              {courseData.title}
            </Typography>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Avatar
                sx={{ width: 24, height: 24, mr: 1 }}
                src="https://via.placeholder.com/24"
              />
              <Typography variant="body2">{courseData.instructor}</Typography>
            </Box>
            <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
              <Box sx={{ width: "100%", mr: 1 }}>
                <LinearProgress
                  variant="determinate"
                  value={courseData.progress}
                />
              </Box>
              <Typography variant="body2">{courseData.progress}%</Typography>
            </Box>
            <Typography variant="body2">
              {courseData.currentVideo} / {courseData.totalLessons} دروس
            </Typography>
          </Box>

          <Box sx={{ p: 2 }}>
            {courseContent.map((section) => (
              <Box key={section.id} sx={{ mb: 3 }}>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  <MenuBook sx={{ fontSize: 18, mr: 1 }} />
                  <Typography variant="subtitle1">{section.title}</Typography>
                  {section.completed && (
                    <CheckCircle
                      sx={{ fontSize: 18, color: "success.main", ml: 1 }}
                    />
                  )}
                </Box>
                <List dense>
                  {section.lessons.map((lesson) => (
                    <ListItem
                      key={lesson.id}
                      button
                      selected={currentVideo.id === lesson.id}
                      onClick={() => {
                        setCurrentVideo(lesson);
                        setIsPlaying(true);
                      }}
                      sx={{
                        borderRadius: 1,
                        mb: 0.5,
                        bgcolor:
                          currentVideo.id === lesson.id
                            ? "primary.light"
                            : "transparent",
                        color:
                          currentVideo.id === lesson.id
                            ? "primary.contrastText"
                            : "text.primary",
                      }}
                    >
                      <ListItemText
                        primary={
                          <Box sx={{ display: "flex", alignItems: "center" }}>
                            <PlayArrow sx={{ fontSize: 14, mr: 1 }} />
                            {lesson.title}
                            {lesson.completed && (
                              <CheckCircle
                                sx={{
                                  fontSize: 14,
                                  color: "success.main",
                                  ml: 1,
                                }}
                              />
                            )}
                          </Box>
                        }
                        secondary={lesson.duration}
                      />
                    </ListItem>
                  ))}
                </List>
              </Box>
            ))}
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
