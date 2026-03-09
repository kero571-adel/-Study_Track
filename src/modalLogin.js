import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
  Typography,
  Divider,
  Box,
  IconButton,
  InputAdornment,
  FormControlLabel,
  Checkbox,
  CircularProgress,
} from "@mui/material";
import {
  Close,
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Google,
  Facebook,
} from "@mui/icons-material";
//import ForgetPasswordModal from "./forgetPass";
const LoginModal = ({ open, onClose }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    rememberMe: false,
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);

    // محاكاة عملية تسجيل الدخول
    setTimeout(() => {
      setLoading(false);
      alert("تم التسجيل بنجاح!");
      onClose();
    }, 1500);
  };

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };
  //const [openModalForget, setOpenModalForget] = useState(false);

  // const handleLogin = () => {
  //   alert("✅ تسجيل الدخول تم بنجاح!");
  // };
  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          direction: "rtl",
        },
      }}
    >
      {/* الهيدر */}
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          تسجيل الدخول
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          {/* البريد الإلكتروني */}
          <TextField
            fullWidth
            label="البريد الإلكتروني"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            margin="normal"
            required
            style={{ direction: "ltr" }}
          />

          {/* كلمة المرور */}
          <TextField
            fullWidth
            label="كلمة المرور"
            type={showPassword ? "text" : "password"}
            value={formData.password}
            onChange={(e) => handleInputChange("password", e.target.value)}
            margin="normal"
            required
            style={{ direction: "ltr" }}
            InputProps={{
              // startAdornment: (
              //   <InputAdornment position="start">
              //     <Lock color="action" />
              //   </InputAdornment>
              // ),
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* تذكرني ونسيت كلمة المرور؟ */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 1,
              mb: 2,
            }}
          >
            {/* <FormControlLabel
              control={
                <Checkbox
                  checked={formData.rememberMe}
                  onChange={(e) =>
                    handleInputChange("rememberMe", e.target.checked)
                  }
                  color="primary"
                />
              }
              label="تذكرني"
            />

            <Button
              size="small"
              sx={{ color: "primary.main" }}
              onClick={() => setOpenModalForget(true)}  
            >
              نسيت كلمة المرور؟
            </Button> */}
          </Box>

          {/* زر تسجيل الدخول */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            size="large"
            disabled={loading}
            sx={{
              py: 1.5,
              mb: 2,
              borderRadius: 1,
            }}
          >
            {loading ? <CircularProgress size={24} /> : "تسجيل الدخول"}
          </Button>
        </Box>
      </DialogContent>
      {/* <ForgetPasswordModal
        open={openModalForget}
        onClose={() => setOpenModalForget(false)}
        onLogin={handleLogin}
      /> */}
    </Dialog>
  );
};

export default LoginModal;
