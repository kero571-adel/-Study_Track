import { useNavigate } from "react-router-dom";
import {
  Container,
  createTheme,
  Box,
  Typography,
  Button,
  Tab,
  Tabs,
  Grid,
  ThemeProvider,
  LinearProgress
} from "@mui/material";
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import PropTypes from "prop-types";
import Chip from "@mui/material/Chip";
import { useState } from "react";
import { PlayCircleOutline } from "@mui/icons-material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { Link } from "react-router-dom";
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
export default function Activity() {
  const [tabValue, setTabValue] = useState(0);
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  const navigate = useNavigate();
  
    const handleGetCertificate = () => {
      navigate(`/certificate?name=أحمد محمد&course=تعلم React&date=29 أغسطس 2025&id=TEC-2025-789456`);
    };
  return (
    <ThemeProvider theme={theme}>
      <Box>
        <Container>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
          >
            <Tab label="دوراتى" {...a11yProps(0)} sx={{ fontWeight: "bold" , fontSize: { md: "20px", xs: "15px", sm: "13px"}}}/>
            <Tab label="الدورات المكتمله" {...a11yProps(1)} sx={{ fontWeight: "bold" , fontSize: { md: "20px", xs: "15px", sm: "13px"}}}/>
          </Tabs>
          <CustomTabPanel value={tabValue} index={0}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "0.3s",
                    "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                  }}
                >
                  <CardMedia
                    sx={{ height: 140 }}
                    image="/image/download.png"
                    title="green iguana"
                  />
                  <CardContent>
                    <Chip label="برمجة" size="small" sx={{ mb: 1 }} />
                    <Typography gutterBottom variant="h5" component="div">
                      تعلم React.js
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      instructor: أحمد محمد
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      ⭐ 4.8 (24 lessons)
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ width: "100%", mr: 1 }}>
                        <LinearProgress variant="determinate" value={20} />
                      </Box>
                      <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary">
                          20%
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Link
                      to="/studycoursepage"
                      style={{ textDecoration: "none" }}
                    >
                      <Button size="larger" startIcon={<PlayCircleOutline />}>
                        استمر
                      </Button>
                    </Link>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            <Grid container spacing={4}>
              <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    transition: "0.3s",
                    "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                  }}
                >
                  <CardMedia
                    sx={{ height: 140 }}
                    image="/image/download.png"
                    title="green iguana"
                  />
                  <CardContent>
                    <Chip label="برمجة" size="small" sx={{ mb: 1 }} />
                    <Typography gutterBottom variant="h5" component="div">
                      تعلم React.js
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary" }}
                    >
                      instructor: أحمد محمد
                    </Typography>
                    <Typography gutterBottom variant="h6" component="div">
                      ⭐ 4.8 (24 lessons)
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center" }}>
                      <Box sx={{ width: "100%", mr: 1 }}>
                        <LinearProgress variant="determinate" value={100} />
                      </Box>
                      <Box sx={{ minWidth: 35 }}>
                        <Typography variant="body2" color="text.secondary">
                          100%
                        </Typography>
                      </Box>
                    </Box>
                  </CardContent>
                  <CardActions>
                    <Button size="larger" startIcon={<CheckCircleIcon />} sx={{color:"green"}} onClick={handleGetCertificate}>
                      اطلع على شهادتك
                    </Button>
                  </CardActions>
                </Card>
              </Grid>
            </Grid>
          </CustomTabPanel>
        </Container>
      </Box>
    </ThemeProvider>
  );
}
