import React, { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import {
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  Button,
  Typography,
  Box,
  Chip,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  TextField,
  Avatar,
  Rating,
  IconButton,
} from "@mui/material";
import {
  Search,
  Favorite,
  Share,
  PlayCircleOutline,
  Schedule,
  People,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import SimpleSnackbar from "./toaster";
const theme = createTheme({
  palette: {
    primary: {
      main: "#3f51b5",
    },
    secondary: {
      main: "#f50057",
    },
    background: {
      default: "#f5f5f5",
    },
  },
  direction: "rtl",
});

// بيانات وهمية للكورسات
const coursesData = [
  {
    id: 1,
    title: "تعلم React.js من الصفر إلى الاحتراف",
    instructor: "أحمد محمد",
    instructorAvatar: "https://via.placeholder.com/40",
    image: "https://via.placeholder.com/300x200/3f51b5/ffffff?text=React.js",
    rating: 4.8,
    totalRatings: 1245,
    students: 9850,
    duration: "15h 30m",
    lectures: 84,
    level: "مبتدئ",
    price: "مجاني",
    category: "برمجة",
    description:
      "هذه الدورة ستأخذك في رحلة تعلم React.js من الأساسيات إلى المستوى المتقدم. ستتعلم كيفية بناء تطبيقات ويب تفاعلية باستخدام أحدث التقنيات والمكتبات.",
  },
  {
    id: 2,
    title: "تعلم Node.js وإنشاء APIs",
    instructor: "محمد علي",
    instructorAvatar: "https://via.placeholder.com/40",
    image: "https://via.placeholder.com/300x200/4caf50/ffffff?text=Node.js",
    rating: 4.6,
    totalRatings: 876,
    students: 6520,
    duration: "12h 45m",
    lectures: 68,
    level: "متوسط",
    price: "مدفوع",
    originalPrice: "199 جنيه",
    discountPrice: "149 جنيه",
    category: "برمجة",
    description:
      "تعلم كيفية بناء تطبيقات الخادم باستخدام Node.js وإنشاء واجهات برمجة تطبيقات (APIs) قوية.",
  },
  {
    id: 3,
    title: "تصميم واجهات المستخدم UX/UI",
    instructor: "سارة أحمد",
    instructorAvatar: "https://via.placeholder.com/40",
    image: "https://via.placeholder.com/300x200/f50057/ffffff?text=UI/UX",
    rating: 4.9,
    totalRatings: 956,
    students: 7450,
    duration: "18h 20m",
    lectures: 92,
    level: "مبتدئ",
    price: "مدفوع",
    originalPrice: "249 جنيه",
    discountPrice: "199 جنيه",
    category: "تصميم",
    description:
      "أتقن تصميم واجهات المستخدم وتجربة المستخدم من خلال هذه الدورة الشاملة.",
  },
  {
    id: 4,
    title: "تعلم Python وتحليل البيانات",
    instructor: "علي حسن",
    instructorAvatar: "https://via.placeholder.com/40",
    image: "https://via.placeholder.com/300x200/ff9800/ffffff?text=Python",
    rating: 4.7,
    totalRatings: 1123,
    students: 8320,
    duration: "20h 15m",
    lectures: 105,
    level: "مبتدئ",
    price: "مجاني",
    category: "برمجة",
    description:
      "ابدأ رحلتك في تعلم Python واستخدامها في تحليل البيانات وعلم البيانات.",
  },
  {
    id: 5,
    title: "أساسيات Cybersecurity",
    instructor: "خالد إبراهيم",
    instructorAvatar: "https://via.placeholder.com/40",
    image: "https://via.placeholder.com/300x200/9c27b0/ffffff?text=Security",
    rating: 4.5,
    totalRatings: 654,
    students: 4320,
    duration: "14h 30m",
    lectures: 72,
    level: "متوسط",
    price: "مدفوع",
    originalPrice: "299 جنيه",
    discountPrice: "229 جنيه",
    category: "أمن",
    description:
      "تعلم أساسيات الأمن السيبراني وكيفية حماية أنظمتك من الهجمات الإلكترونية.",
  },
  {
    id: 6,
    title: "تعلم DevOps من الصفر",
    instructor: "نورة سعد",
    instructorAvatar: "https://via.placeholder.com/40",
    image: "https://via.placeholder.com/300x200/607d8b/ffffff?text=DevOps",
    rating: 4.8,
    totalRatings: 789,
    students: 5620,
    duration: "16h 45m",
    lectures: 88,
    level: "متقدم",
    price: "مدفوع",
    originalPrice: "349 جنيه",
    discountPrice: "279 جنيه",
    category: "عمليات",
    description: "أتقن أدوات وممارسات DevOps لتحسين دورة حياة تطوير البرمجيات.",
  },
];

// التصنيفات المتاحة
const categories = [
  "الكل",
  "برمجة",
  "تصميم",
  "أمن",
  "عمليات",
  "تسويق",
  "إدارة",
];
// المستويات المتاحة
const levels = ["الكل", "مبتدئ", "متوسط", "متقدم"];
// أنواع الأسعار
const prices = ["الكل", "مجاني", "مدفوع"];

export default function Courses() {
  const [selectedCategory, setSelectedCategory] = useState("الكل");
  const [selectedLevel, setSelectedLevel] = useState("الكل");
  const [selectedPrice, setSelectedPrice] = useState("الكل");
  const [searchQuery, setSearchQuery] = useState("");
  const [toast, setToast] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const filteredCourses = coursesData.filter((course) => {
    return (
      (selectedCategory === "الكل" || course.category === selectedCategory) &&
      (selectedLevel === "الكل" || course.level === selectedLevel) &&
      (selectedPrice === "الكل" || course.price === selectedPrice) &&
      (course.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        course.description.toLowerCase().includes(searchQuery.toLowerCase()))
    );
  });
  return (
    <ThemeProvider theme={theme}>
      <Container>
        <Box sx={{ textAlign: "center", mb: 4, mt: 4 }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{ mb: 4, fontWeight: "bold", color: "primary.main" }}
          >
            دوراتنا التعليمية
          </Typography>
          <Typography variant="h6" color="text.secondary">
            اكتشف مجموعة واسعة من الدورات التعليمية لتنمية مهاراتك
          </Typography>
          <Card sx={{ p: 3, mb: 4 }}>
            <Grid container spacing={3} alignItems="center">
              <Grid item xs={12} md={6}>
                <TextField
                  fullWidth
                  placeholder="ابحث عن دورة..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <Search sx={{ mr: 1, color: "text.secondary" }} />
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">التصنيف</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedCategory}
                    label="التصنيف"
                    onChange={(e) => setSelectedCategory(e.target.value)}
                  >
                    {categories.map((category) => (
                      <MenuItem value={category}>{category}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">المسنوى</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedLevel}
                    label="المسنوى"
                    onChange={(e) => setSelectedLevel(e.target.value)}
                  >
                    {levels.map((level) => (
                      <MenuItem value={level}>{level}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="demo-simple-select-label">السعر</InputLabel>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={selectedPrice}
                    label="السعر"
                    onChange={(e) => setSelectedPrice(e.target.value)}
                  >
                    {prices.map((price) => (
                      <MenuItem value={price}>{price}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Grid>
            </Grid>
          </Card>
          <Grid container spacing={4}>
            {filteredCourses.map((course) => {
              return (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={course.id}>
                  <Card
                    sx={{
                      height: "100%",
                      display: "flex",
                      flexDirection: "column",
                      transition: "0.3s",
                      "&:hover": {
                        transform: "translateY(-5px)",
                        boxShadow: 6,
                      },
                    }}
                  >
                    <CardMedia
                      component="img"
                      height="200"
                      image="/image/download.png"
                      alt={course.title}
                    />
                    <CardContent sx={{ flexGrow: 1 }}>
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "flex-start",
                          mb: 1,
                        }}
                      >
                        <Chip
                          label={course.category}
                          size="small"
                          color="primary"
                        />
                        <Box>
                          {course.price === "مدفوع" ? (
                            <Box sx={{ display: "flex", alignItems: "center" }}>
                              <Typography
                                variant="body2"
                                sx={{
                                  textDecoration: "line-through",
                                  mr: 1,
                                  color: "text.secondary",
                                }}
                              >
                                {course.originalPrice}
                              </Typography>
                              <Typography variant="h6" color="secondary">
                                {course.discountPrice}
                              </Typography>
                            </Box>
                          ) : (
                            <Chip label="مجاني" color="success" size="small" />
                          )}
                        </Box>
                      </Box>

                      <Typography
                        gutterBottom
                        variant="h6"
                        component="h2"
                        sx={{ mt: 1, height: 64, overflow: "hidden" }}
                      >
                        {course.title}
                      </Typography>

                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{ mb: 2, height: 40, overflow: "hidden" }}
                      >
                        {course.description}
                      </Typography>

                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Avatar
                          src={course.instructorAvatar}
                          sx={{ width: 24, height: 24, mr: 1 }}
                        />
                        <Typography variant="body2">
                          {course.instructor}
                        </Typography>
                      </Box>

                      <Box
                        sx={{ display: "flex", alignItems: "center", mb: 1 }}
                      >
                        <Rating
                          value={course.rating}
                          precision={0.1}
                          readOnly
                          size="small"
                        />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          ({course.totalRatings})
                        </Typography>
                      </Box>

                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <Schedule sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2">
                            {course.duration}
                          </Typography>
                        </Box>
                        <Box sx={{ display: "flex", alignItems: "center" }}>
                          <People sx={{ fontSize: 16, mr: 0.5 }} />
                          <Typography variant="body2">
                            {course.students.toLocaleString()}
                          </Typography>
                        </Box>
                      </Box>

                      <Chip
                        label={course.level}
                        size="small"
                        variant="outlined"
                        sx={{ mt: 1 }}
                      />
                    </CardContent>
                    <CardActions sx={{ justifyContent: "space-between", p: 2 }}>
                      <Link to="/showcoursepage">
                        <Button
                          variant="contained"
                          startIcon={<PlayCircleOutline />}
                          size="small"
                        >
                          ابدأ التعلم
                        </Button>
                      </Link>
                      <Box>
                        <IconButton size="small" onClick={() => setToast({open:true,message:"تم حفظ الكورس ف المفضله",severity:"success"})}>
                          <Favorite/>
                        </IconButton>
                        <IconButton size="small">
                          <Share />
                        </IconButton>
                      </Box>
                    </CardActions>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Box>
      </Container>
      <SimpleSnackbar toast={toast} setToast={setToast} />
    </ThemeProvider>
  );
}
