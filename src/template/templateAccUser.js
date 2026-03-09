import React, { useState } from 'react';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import {
  Container, Grid, Card, CardContent, CardHeader,
  Button, Avatar, Typography, Box, Divider,
  Tabs, Tab, TextField, Chip, IconButton,
  List, ListItem, ListItemText, ListItemIcon,
  Switch, FormControlLabel, Paper
} from '@mui/material';
import {
  Edit, Save, CameraAlt, Security,
  Notifications, Payment, Language,
  Person, ExitToApp, History, Favorite
} from '@mui/icons-material';

const theme = createTheme({
  palette: {
    primary: {
      main: '#3f51b5',
    },
    secondary: {
      main: '#f50057',
    },
    background: {
      default: '#f5f5f5'
    }
  },
  direction: 'rtl',
});

// بيانات وهمية للمستخدم
const userData = {
  name: 'أحمد محمد',
  email: 'ahmed@example.com',
  joinDate: 'يناير 2023',
  bio: 'مطور واجهات أمامية ومهتم بتعلم التقنيات الحديثة',
  location: 'القاهرة، مصر',
  phone: '+20 100 000 0000'
};

// الإحصائيات
const stats = [
  { label: 'الدورات المكتملة', value: 12 },
  { label: 'الساعات الدراسية', value: 86 },
  { label: 'الشهادات', value: 5 },
  { label: 'النقاط', value: 2450 }
];

// الدورات المستمرة
const ongoingCourses = [
  { title: 'تعلم React المتقدم', progress: 65 },
  { title: 'Node.js للمبتدئين', progress: 30 },
  { title: 'تصميم واجهات المستخدم', progress: 80 }
];

// الإشعارات
const notifications = [
  { text: 'لديك اختبار جديد في دورة React', time: 'منذ ساعتين', read: false },
  { text: 'تمت إضافة محتوى جديد في دورة Node.js', time: 'منذ يوم', read: true },
  { text: 'تهانينا! لقد أكملت دورة JavaScript', time: 'منذ 3 أيام', read: true }
];

const UserProfilePage = () => {
  const [tabValue, setTabValue] = useState(0);
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState(userData);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [emailUpdates, setEmailUpdates] = useState(true);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const handleSave = () => {
    setIsEditing(false);
    // هنا سيتم إرسال البيانات إلى الخادم
  };

  const handleInputChange = (field, value) => {
    setUser(prev => ({ ...prev, [field]: value }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Grid container spacing={4}>
          {/* العمود الجانبي - معلومات المستخدم */}
          <Grid item xs={12} md={4}>
            <Card sx={{ position: 'sticky', top: 20 }}>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Box sx={{ position: 'relative', display: 'inline-block' }}>
                  <Avatar
                    sx={{ width: 120, height: 120, mx: 'auto', mb: 2 }}
                    src="https://via.placeholder.com/120"
                  />
                  <IconButton 
                    sx={{ 
                      position: 'absolute', 
                      bottom: 10, 
                      right: 10, 
                      bgcolor: 'primary.main', 
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' } 
                    }}
                    size="small"
                  >
                    <CameraAlt />
                  </IconButton>
                </Box>
                
                <Typography variant="h5" gutterBottom>
                  {user.name}
                </Typography>
                
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {user.bio}
                </Typography>
                
                <Chip 
                  label="مطور Frontend" 
                  variant="outlined" 
                  sx={{ mt: 1, mb: 2 }} 
                />
                
                <Box sx={{ mt: 2 }}>
                  {stats.map((stat, index) => (
                    <Box key={index} sx={{ 
                      display: 'flex', 
                      justifyContent: 'space-between', 
                      mb: 1 
                    }}>
                      <Typography variant="body2">
                        {stat.label}
                      </Typography>
                      <Typography variant="body2" fontWeight="bold">
                        {stat.value}
                      </Typography>
                    </Box>
                  ))}
                </Box>
                
                <Button 
                  variant="contained" 
                  fullWidth 
                  sx={{ mt: 3 }}
                  startIcon={<Edit />}
                  onClick={() => setIsEditing(true)}
                >
                  تعديل الملف الشخصي
                </Button>
              </CardContent>
            </Card>
          </Grid>

          {/* العمود الرئيسي - محتوى الصفحة */}
          <Grid item xs={12} md={8}>
            <Card>
              <CardHeader 
                title="الملف الشخصي" 
                action={
                  isEditing ? (
                    <Button 
                      startIcon={<Save />} 
                      variant="contained"
                      onClick={handleSave}
                    >
                      حفظ التغييرات
                    </Button>
                  ) : null
                }
              />
              <Tabs 
                value={tabValue} 
                onChange={handleTabChange}
                variant="fullWidth"
              >
                <Tab icon={<Person />} label="المعلومات الشخصية" />
                <Tab icon={<Security />} label="الأمان" />
                <Tab icon={<Notifications />} label="الإشعارات" />
                <Tab icon={<History />} label="النشاط" />
              </Tabs>
              <Divider />
              <CardContent>
                {tabValue === 0 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        المعلومات الأساسية
                      </Typography>
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="الاسم الكامل"
                        value={user.name}
                        onChange={(e) => handleInputChange('name', e.target.value)}
                        disabled={!isEditing}
                      />
                    </Grid>
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="البريد الإلكتروني"
                        type="email"
                        value={user.email}
                        onChange={(e) => handleInputChange('email', e.target.value)}
                        disabled={!isEditing}
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="رقم الهاتف"
                        value={user.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        disabled={!isEditing}
                      />
                    </Grid>
                    
                    <Grid item xs={12} md={6}>
                      <TextField
                        fullWidth
                        label="الموقع"
                        value={user.location}
                        onChange={(e) => handleInputChange('location', e.target.value)}
                        disabled={!isEditing}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="نبذة عني"
                        value={user.bio}
                        onChange={(e) => handleInputChange('bio', e.target.value)}
                        disabled={!isEditing}
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        الدورات المستمرة
                      </Typography>
                      <List>
                        {ongoingCourses.map((course, index) => (
                          <ListItem key={index}>
                            <ListItemIcon>
                              <Favorite color="primary" />
                            </ListItemIcon>
                            <ListItemText 
                              primary={course.title} 
                              secondary={`${course.progress}% مكتمل`} 
                            />
                            <Box sx={{ width: '60px', ml: 2 }}>
                              <Box 
                                sx={{ 
                                  height: '8px', 
                                  bgcolor: 'primary.main', 
                                  borderRadius: '4px',
                                  width: `${course.progress}%`
                                }} 
                              />
                            </Box>
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                )}
                
                {tabValue === 1 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        إعدادات الأمان
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Button 
                        variant="outlined" 
                        fullWidth
                        sx={{ mb: 2 }}
                      >
                        تغيير كلمة المرور
                      </Button>
                      
                      <Button 
                        variant="outlined" 
                        fullWidth
                        sx={{ mb: 2 }}
                      >
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
                    
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                        جلسات التسجيل النشطة
                      </Typography>
                      <Paper variant="outlined" sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                          <Box>
                            <Typography variant="body1">Chrome على Windows</Typography>
                            <Typography variant="body2" color="text.secondary">
                              القاهرة، مصر • منذ 3 ساعات
                            </Typography>
                          </Box>
                          <Chip label="نشط" color="primary" size="small" />
                        </Box>
                      </Paper>
                    </Grid>
                  </Grid>
                )}
                
                {tabValue === 2 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        تفضيلات الإشعارات
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <FormControlLabel
                        control={
                          <Switch 
                            checked={notificationsEnabled} 
                            onChange={(e) => setNotificationsEnabled(e.target.checked)}
                            color="primary"
                          />
                        }
                        label="تفعيل الإشعارات"
                      />
                      <FormControlLabel
                        control={
                          <Switch 
                            checked={emailUpdates} 
                            onChange={(e) => setEmailUpdates(e.target.checked)}
                            color="primary"
                          />
                        }
                        label="تلقي تحديثات البريد الإلكتروني"
                      />
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                        الإشعارات الحديثة
                      </Typography>
                      <List>
                        {notifications.map((notification, index) => (
                          <ListItem 
                            key={index} 
                            sx={{ 
                              bgcolor: notification.read ? 'transparent' : 'action.hover',
                              borderRadius: 1
                            }}
                          >
                            <ListItemText 
                              primary={notification.text} 
                              secondary={notification.time} 
                            />
                          </ListItem>
                        ))}
                      </List>
                    </Grid>
                  </Grid>
                )}
                
                {tabValue === 3 && (
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography variant="h6" gutterBottom>
                        سجل النشاط
                      </Typography>
                    </Grid>
                    
                    <Grid item xs={12}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body1">
                           完成了课程 "مقدمة في React"
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            2023-10-15 • 获得 50 点
                          </Typography>
                        </Box>
                        <Chip label="مكتمل" color="success" size="small" />
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body1">
                            开始了课程 "Node.js للمبتدئين"
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            2023-10-10
                          </Typography>
                        </Box>
                        <Chip label="قيد التقدم" color="primary" size="small" />
                      </Box>
                      
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                        <Box sx={{ flexGrow: 1 }}>
                          <Typography variant="body1">
                            通过了测验 "JavaScript الأساسي"
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            2023-10-05 • 成绩: 85%
                          </Typography>
                        </Box>
                        <Chip label="ناجح" color="success" size="small" />
                      </Box>
                    </Grid>
                  </Grid>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </ThemeProvider>
  );
};

export default UserProfilePage;