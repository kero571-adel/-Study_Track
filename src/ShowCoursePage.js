import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import PropTypes from "prop-types";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import SimpleSnackbar from "./toaster";
import {
  Container,
  Card,
  CardContent,
  CardHeader,
  Button,
  Typography,
  Box,
  Chip,
  List,
  ListItem,
  ListItemText,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Avatar,
  Rating,
} from "@mui/material";
import {
  ExpandMore,
  PlayArrow,
  AccessTime,
  CheckCircle,
  Favorite,
  PlayCircleFilled,
} from "@mui/icons-material";
const courseData = {
  id: 1,
  title: "تعلم React.js من الصفر إلى الاحتراف",
  instructor: "أحمد محمد",
  instructorAvatar: "https://via.placeholder.com/50",
  rating: 4.8,
  totalRatings: 1245,
  students: 9850,
  duration: "15h 30m",
  lectures: 84,
  level: "مبتدئ",
  price: "مجاني",
  description:
    "هذه الدورة ستأخذك في رحلة تعلم React.js من الأساسيات إلى المستوى المتقدم. ستتعلم كيفية بناء تطبيقات ويب تفاعلية باستخدام أحدث التقنيات والمكتبات.",
  objectives: [
    "فهم أساسيات React.js ومفاهيم المكونات",
    "تعلم كيفية استخدام Hooks وإدارة الحالة",
    "بناء تطبيقات حقيقية باستخدام React",
    "التكامل مع APIs وقواعد البيانات",
    "نشر التطبيقات على منصات الاستضافة",
  ],
  requirements: [
    "معرفة أساسية بـ HTML و CSS",
    "مقدمة في JavaScript",
    "لا يلزم خبرة سابقة في React",
  ],
};
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

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}
// بيانات تجريبية للمحتوى
const courseContent = [
  {
    id: 1,
    title: "مقدمة في البرمجة",
    lessons: [
      {
        id: 1,
        title: "ما هي البرمجة؟",
        duration: "10:15",
        videoUrl: "https://www.youtube.com/watch?v=mvZHDpCHphk",
        completed: true,
        favorite: false,
      },
      {
        id: 2,
        title: "أنواع لغات البرمجة",
        duration: "15:30",
        videoUrl: "https://www.youtube.com/watch?v=02a5T6ktx8M",
        completed: false,
        favorite: true,
      },
    ],
  },
];
// دالة مساعدة لاستخراج معرف فيديو YouTube من الرابط
function getYouTubeId(url) {
  const regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  const match = url.match(regExp);
  return match && match[7].length === 11 ? match[7] : null;
}
export default function ShowCoursePage() {
  const [currentVideo, setCurrentVideo] = useState(courseContent[0].lessons[0]);
  const [expandedSection, setExpandedSection] = useState(1);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isReady, setIsReady] = useState(false);
  const [value, setValue] = useState(0);
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  useEffect(() => {
    // إعادة تعيين حالة التشغيل عند تغيير الفيديو
    setIsPlaying(false);
    setIsReady(false);
  }, [currentVideo]);

  const handleSectionClick = (sectionId) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  const handleLessonClick = (lesson) => {
    setCurrentVideo(lesson);
  };

  const handlePlay = () => {
    setIsPlaying(true);
  };

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
        <Box sx={{ width: { xs: "100%", md: "49%" } }}>
          {/* مشغل الفيديو */}
          <Card sx={{ mb: 3, width: "100%" }}>
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
            <CardContent>
              <Typography variant="h5" gutterBottom>
                {currentVideo.title}
              </Typography>
              <Box sx={{ display: "flex", alignItems: "center", mt: 2 }}>
                {currentVideo.completed && (
                  <Chip
                    icon={<CheckCircle />}
                    label="مكتمل"
                    color="success"
                    variant="outlined"
                  />
                )}
                <Chip
                  icon={<Favorite />}
                  label="مفضل"
                  color={currentVideo.favorite ? "secondary" : "primary"}
                  variant="outlined"
                  sx={{ ml: 1 }}
                />
              </Box>
            </CardContent>
          </Card>
          <Box sx={{ width: "100%", border: 3, borderColor: "divider" }}>
            <Box>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
                sx={{ borderBottom: 1, borderColor: "divider" }}
              >
                <Tab label="محتويات الكورس" {...a11yProps(0)} />
                <Tab label="المتطلبات" {...a11yProps(1)} />
                <Tab label="الوصف" {...a11yProps(2)} />
              </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
              <Box>
                {courseContent.map((section) => (
                  <Accordion
                    key={section.id}
                    expanded={expandedSection === section.id}
                    onChange={() => handleSectionClick(section.id)}
                  >
                    <AccordionSummary expandIcon={<ExpandMore />}>
                      <Box sx={{ width: "100%" }}>
                        <Typography variant="subtitle1">
                          {section.title}
                        </Typography>
                        <Box sx={{ display: "flex", mt: 1 }}>
                          <Typography variant="body2" sx={{ mr: 2 }}>
                            {section.lectures} محاضرات
                          </Typography>
                          <Typography variant="body2">
                            {section.duration}
                          </Typography>
                        </Box>
                      </Box>
                    </AccordionSummary>
                    <AccordionDetails>
                      <List>
                        {section.lessons.map((lesson) => (
                          <ListItem
                            key={lesson.id}
                            button
                            selected={currentVideo.id === lesson.id}
                            onClick={() => handleLessonClick(lesson)}
                            sx={{
                              borderRadius: 1,
                              mb: 1,
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
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                  }}
                                >
                                  <PlayArrow sx={{ fontSize: 16, mr: 1 }} />
                                  {lesson.title}
                                  {lesson.completed && (
                                    <CheckCircle
                                      sx={{
                                        fontSize: 16,
                                        color: "success.main",
                                        ml: 1,
                                      }}
                                    />
                                  )}
                                </Box>
                              }
                              secondary={
                                <Box
                                  sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    mt: 0.5,
                                  }}
                                >
                                  <AccessTime sx={{ fontSize: 14, mr: 0.5 }} />
                                  {lesson.duration}
                                </Box>
                              }
                            />
                          </ListItem>
                        ))}
                      </List>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </Box>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={1}>
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam harum impedit est ducimus reiciendis vero officia ea
                quod tenetur quaerat non nisi nesciunt mollitia amet asperiores,
                beatae quidem voluptatum architecto.
              </Typography>
            </CustomTabPanel>
            <CustomTabPanel value={value} index={2}>
              <Typography>
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Laboriosam harum impedit est ducimus reiciendis vero officia ea
                quod tenetur quaerat non nisi nesciunt mollitia amet asperiores,
                beatae quidem voluptatum architecto.
              </Typography>
            </CustomTabPanel>
          </Box>
        </Box>
        <Box sx={{ width: { xs: "100%", md: "49%" } }}>
          <Card>
            <CardHeader
              title={courseData.title}
              subheader={`بواسطة ${courseData.instructor}`}
            />
            <CardContent>
              <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
                <Rating value={courseData.rating} precision={0.1} readOnly />
                <Typography variant="body2" sx={{ ml: 1 }}>
                  {courseData.rating} ({courseData.totalRatings} تقييم)
                </Typography>
              </Box>

              <Box sx={{ mb: 2 }}>
                <Chip label={courseData.level} sx={{ mr: 1, mb: 1 }} />
                <Chip label={courseData.duration} sx={{ mr: 1, mb: 1 }} />
                <Chip
                  label={`${courseData.lectures} محاضرة`}
                  sx={{ mr: 1, mb: 1 }}
                />
              </Box>

              <Button variant="contained" fullWidth size="large" sx={{ mb: 2 }} onClick={() => setToast({open:true,message:"تم الاشتراء بنجاح",severity:"success"})}>
                {courseData.price === "مجاني"
                  ? "التحق بالكورس"
                  : `شراء الكورس - ${courseData.price}`}
              </Button>
            </CardContent>
          </Card>
          {/* معلومات المدرب */}
          <Card sx={{ mt: 3 }}>
            <CardHeader
              title="عن المدرب"
              avatar={<Avatar src={courseData.instructorAvatar} />}
            />
            <CardContent>
              <Typography variant="body2" gutterBottom>
                مطور واجهات أمامية بخبرة تزيد عن 5 سنوات. متخصص في React.js
                ولديه شغف كبير بتعليم البرمجة.
              </Typography>
              <Box sx={{ mt: 2 }}>
                <Typography variant="body2">
                  <strong>4 دورات</strong>
                </Typography>
                <Typography variant="body2">
                  <strong>{courseData.students} طالب</strong>
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Box>
      </Container>
      <SimpleSnackbar toast={toast} setToast={setToast}/>
    </ThemeProvider>
  );
}
