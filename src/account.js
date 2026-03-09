import { useState } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import HomePageWithLog from "./Activity";
import {
  Box,
  Container,
  Typography,
  Tab,
  Tabs,
  Card,
  FormControlLabel,
  Switch,
  Grid,
  Button,
  Chip,
  Paper,
} from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import PropTypes from "prop-types";
import { Email, ExitToApp } from "@mui/icons-material";
import {notif, toggleNotifications} from "./redux/profile/notification";
import { useSelector, useDispatch } from 'react-redux';
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
export default function Account() {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);
  const [tabValue, setTabValue] = useState(0);
  let user = null;
  if (localStorage.getItem("user")) {
    user = JSON.parse(localStorage.getItem("user"));
  }
  const handleChange = (event, newValue) => {
    setTabValue(newValue);
  };
  return (
    <ThemeProvider theme={theme}>
      <Container sx={{ mt: 4, mb: 3 }}>
        <Card
          variant="outlined"
          sx={{
            display: "flex",
            flexDirection: { md: "row", xs: "column" },
            alignItems: "center",
            justifyContent: "space-between",
            p: 3,
          }}
        >
          <Box>
            {user && user.profileImage ? (
              <img
                src={user.profileImage} 
                alt="Profile"
                width="200px"
                height="200px"
                style={{ borderRadius: "50%", objectFit: "cover" }}
              />
            ) : (
              <p>لا توجد صورة محفوظة</p>
            )}
          </Box>
          <Box
            sx={{
              textAlign: {
                xs: "center",
                md: "right",
                border: "1px solid #ccc",
              },
            }}
          >
            <Typography
              sx={{
                fontSize: {
                  md: "28px",
                  xs: "20px",
                  sm: "17px",
                  borderBottom: "1px solid #ccc",
                  padding: 5,
                },
              }}
            >
              {user ? user.firstName + " " + user.lastName : ""}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  md: "28px",
                  xs: "20px",
                  sm: "17px",
                  borderBottom: "1px solid #ccc",
                  padding: 5,
                },
              }}
            >
              {user ? user.major : ""}
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  md: "28px",
                  xs: "20px",
                  sm: "17px",
                  borderBottom: "1px solid #ccc",
                  padding: 5,
                },
              }}
            >
              الدورات المكتمله: 12
            </Typography>
            <Typography
              sx={{
                fontSize: {
                  md: "28px",
                  xs: "20px",
                  sm: "17px",
                  borderBottom: "1px solid #ccc",
                  padding: 5,
                },
              }}
            >
              الساعات الدراسيه: 120
            </Typography>
            <Typography
              sx={{
                fontSize: { md: "28px", xs: "20px", sm: "17px", padding: 5 },
              }}
            >
              الشهادات: 5
            </Typography>
          </Box>
        </Card>
        <Box sx={{ mt: 3, border: 3, borderColor: "divider" }}>
          <Tabs
            value={tabValue}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{ borderBottom: 3, borderColor: "divider" }}
          >
            <Tab
              label="النشاط"
              {...a11yProps(0)}
              sx={{
                fontWeight: "bold",
                fontSize: {
                  md: "25px",
                  xs: "17px",
                  sm: "15px",
                  color: "black",
                },
              }}
            />
            <Tab
              label="الاشعارات"
              {...a11yProps(1)}
              sx={{
                fontWeight: "bold",
                fontSize: {
                  md: "25px",
                  xs: "17px",
                  sm: "15px",
                  color: "black",
                },
              }}
            />
            <Tab
              label="الامان"
              {...a11yProps(2)}
              sx={{
                fontWeight: "bold",
                fontSize: {
                  md: "25px",
                  xs: "17px",
                  sm: "15px",
                  color: "black",
                },
              }}
            />
          </Tabs>
          <CustomTabPanel value={tabValue} index={0}>
            <HomePageWithLog />
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={1}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Box sx={{ display: "flex", flexDirection: "column" }}>
                  <FormControlLabel
                    label="تفعيل الإشعارات"
                    labelPlacement="start"
                    sx={{ width: "263px", justifyContent: "space-between" }}
                    control={
                      <Switch
                        checked={notificationsEnabled}
                        onChange={(e) =>
                          setNotificationsEnabled(e.target.checked)
                        }
                        color="primary"
                        display="block"
                      />
                    }
                  />
                  <FormControlLabel
                    label="تلقي تحديثات البريد الإلكتروني"
                    labelPlacement="start"
                    sx={{ width: "263px", justifyContent: "space-between" }}
                    control={
                      <Switch
                        checked={emailUpdates}
                        onChange={(e) => setEmailUpdates(e.target.checked)}
                        color="primary"
                        display="block"
                      />
                    }
                  />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <List
                  sx={{
                    width: "100%",
                    maxWidth: 360,
                    bgcolor: "background.paper",
                    border: 3,
                    borderColor: "divider",
                    margin: "auto",
                  }}
                >
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Email />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Email />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Email />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Email />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Email />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Email />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Email />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Email />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Email />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Email />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                  </ListItem>
                  <ListItem>
                    <ListItemAvatar>
                      <Avatar>
                        <Email />
                      </Avatar>
                    </ListItemAvatar>
                    <ListItemText primary="Photos" secondary="Jan 9, 2014" />
                  </ListItem>
                </List>
              </Grid>
            </Grid>
          </CustomTabPanel>
          <CustomTabPanel value={tabValue} index={2}>
            <Typography
              variant="h6"
              gutterBottom
              sx={{
                textAlign: "center",
                fontSize: { md: "28px", xs: "20px", sm: "17px" },
              }}
            >
              إعدادات الأمان
            </Typography>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
                  تغيير كلمة المرور
                </Button>

                <Button variant="outlined" fullWidth sx={{ mb: 2 }}>
                  تفعيل المصادقة الثنائية
                </Button>

                <Button
                  variant="outlined"
                  color="error"
                  fullWidth
                  startIcon={<ExitToApp />}
                >
                  تسجيل الخروج من جميع الأجهزة
                </Button>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{
                    mt: 3,
                    textAlign: "center",
                    fontSize: { md: "25px", xs: "17px", sm: "15px" },
                    color: "rgb(0 0 0 / 61%)",
                  }}
                >
                  جلسات التسجيل النشطة
                </Typography>
                <Paper variant="outlined" sx={{ p: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                    }}
                  >
                    <Box>
                      <Typography variant="body1">
                        Chrome على Windows
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        القاهرة، مصر • منذ 3 ساعات
                      </Typography>
                    </Box>
                    <Chip label="نشط" color="primary" size="small" />
                  </Box>
                </Paper>
              </Grid>
            </Grid>
          </CustomTabPanel>
        </Box>
      </Container>
    </ThemeProvider>
  );
}
