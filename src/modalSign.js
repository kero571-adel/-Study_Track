import React, { useState, useRef } from "react";

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
  Avatar,
} from "@mui/material";
import {
  Close,
  Visibility,
  VisibilityOff,
  Email,
  Lock,
  Person,
  Google,
  Facebook,
  AddAPhoto,
  Delete,
} from "@mui/icons-material";

const SignupModal = ({ open, onClose, onSwitchToLogin }) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const fileInputRef = useRef(null);

  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    major: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  // دالة handle تحميل الصورة
  const handleImageUpload = (event) => {
    const file = event.target.files[0];

    if (file) {
      // التحقق من نوع الملف
      if (!file.type.startsWith("image/")) {
        alert("الرجاء اختيار ملف صورة فقط");
        return;
      }

      // التحقق من حجم الملف (2MB كحد أقصى)
      if (file.size > 2 * 1024 * 1024) {
        alert("حجم الصورة يجب أن يكون أقل من 2MB");
        return;
      }

      setProfileImage(file);

      // إنشاء معاينة للصورة
      const reader = new FileReader();
      reader.onload = (e) => {
        setImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // دالة حذف الصورة
  const handleRemoveImage = () => {
    setProfileImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // تحقق من تطابق كلمة المرور
    if (formData.password !== formData.confirmPassword) {
      alert("كلمة المرور غير متطابقة!");
      return;
    }

    if (!formData.agreeToTerms) {
      alert("يجب الموافقة على الشروط والأحكام");
      return;
    }

    setLoading(true);

    // محاكاة عملية إنشاء حساب
    setTimeout(() => {
      setLoading(false);
      // 🟢 حفظ بيانات المستخدم في localStorage
      const userData = {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        major: formData.major,
        password: formData.password,
        profileImage: imagePreview, 
      };

      localStorage.setItem("user", JSON.stringify(userData));

      alert("تم إنشاء الحساب بنجاح!");

      onClose();

      // Reset form
      setProfileImage(null);
      setImagePreview(null);
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
        major: "",
        confirmPassword: "",
        agreeToTerms: false,
      });
    }, 1500);
  };
  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 1,
        }}
      >
        <Typography variant="h6" fontWeight="bold">
          إنشاء حساب جديد
        </Typography>
        <IconButton onClick={onClose} size="small">
          <Close />
        </IconButton>
      </DialogTitle>

      <Divider />

      <DialogContent sx={{ pt: 3 }}>
        <Box component="form" onSubmit={handleSubmit}>
          {/* قسم صورة البروفايل */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mb: 3,
            }}
          >
            <Box sx={{ position: "relative" }}>
              <Avatar
                src={imagePreview}
                sx={{
                  width: 80,
                  height: 80,
                  cursor: "pointer",
                  border: "2px dashed #ccc",
                  "&:hover": {
                    borderColor: "primary.main",
                  },
                }}
                onClick={() => fileInputRef.current?.click()}
              >
                {!imagePreview && <Person sx={{ fontSize: 40 }} />}
              </Avatar>

              {imagePreview ? (
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    bgcolor: "error.main",
                    color: "white",
                    "&:hover": { bgcolor: "error.dark" },
                    width: 30,
                    height: 30,
                  }}
                  onClick={handleRemoveImage}
                >
                  <Delete sx={{ fontSize: 16 }} />
                </IconButton>
              ) : (
                <IconButton
                  sx={{
                    position: "absolute",
                    bottom: 0,
                    right: 0,
                    bgcolor: "primary.main",
                    color: "white",
                    "&:hover": { bgcolor: "primary.dark" },
                    width: 30,
                    height: 30,
                  }}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <AddAPhoto sx={{ fontSize: 16 }} />
                </IconButton>
              )}
            </Box>

            <input
              type="file"
              ref={fileInputRef}
              onChange={handleImageUpload}
              accept="image/*"
              style={{ display: "none" }}
            />
          </Box>

          {/* رسالة توجيهية */}
          {!imagePreview && (
            <Typography
              variant="body2"
              color="textSecondary"
              align="center"
              sx={{ mb: 2 }}
            >
              اختر صورة بروفايل (اختياري)
            </Typography>
          )}

          {/* حقول الاسم */}
          <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
            <TextField
              fullWidth
              label="الاسم الأول"
              value={formData.firstName}
              onChange={(e) => handleInputChange("firstName", e.target.value)}
              required
            />
            <TextField
              fullWidth
              label="الاسم الأخير"
              value={formData.lastName}
              onChange={(e) => handleInputChange("lastName", e.target.value)}
              required
            />
          </Box>

          {/* حقل البريد الإلكتروني */}
          <TextField
            fullWidth
            label="البريد الإلكتروني"
            type="email"
            value={formData.email}
            onChange={(e) => handleInputChange("email", e.target.value)}
            margin="normal"
            required
            style={{ direction: "ltr" }}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <Email color="action" />
                </InputAdornment>
              ),
            }}
          />
          {/*حقل التخصص*/}
          <TextField
            fullWidth
            label=" التخصص"
            type="text"
            value={formData.major}
            onChange={(e) => handleInputChange("major", e.target.value)}
            margin="normal"
            required
            style={{ direction: "ltr" }}
          />

          {/* حقل كلمة المرور */}
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
              startAdornment: (
                <InputAdornment position="start">
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

          {/* حقل تأكيد كلمة المرور */}
          <TextField
            style={{ direction: "ltr" }}
            fullWidth
            label="تأكيد كلمة المرور"
            type={showConfirmPassword ? "text" : "password"}
            value={formData.confirmPassword}
            onChange={(e) =>
              handleInputChange("confirmPassword", e.target.value)
            }
            margin="normal"
            required
            error={
              formData.password !== formData.confirmPassword &&
              formData.confirmPassword !== ""
            }
            helperText={
              formData.password !== formData.confirmPassword &&
              formData.confirmPassword !== ""
                ? "كلمة المرور غير متطابقة"
                : ""
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <IconButton
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    edge="end"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {/* الموافقة على الشروط */}
          <FormControlLabel
            control={
              <Checkbox
                checked={formData.agreeToTerms}
                onChange={(e) =>
                  handleInputChange("agreeToTerms", e.target.checked)
                }
                color="primary"
              />
            }
            label={
              <Typography variant="body2">
                أوافق على{" "}
                <Button
                  size="small"
                  sx={{ color: "primary.main", minWidth: "auto", p: 0 }}
                  onClick={() => alert("شروط الخدمة")}
                >
                  شروط الخدمة
                </Button>{" "}
                و{" "}
                <Button
                  size="small"
                  sx={{ color: "primary.main", minWidth: "auto", p: 0 }}
                  onClick={() => alert("سياسة الخصوصية")}
                >
                  سياسة الخصوصية
                </Button>
              </Typography>
            }
            sx={{ mt: 2, mb: 3 }}
          />

          {/* زر إنشاء الحساب */}
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
            {loading ? <CircularProgress size={24} /> : "إنشاء حساب"}
          </Button>
        </Box>
      </DialogContent>

      {/* الفوتر - رابط تسجيل الدخول */}
      <DialogActions
        sx={{
          justifyContent: "center",
          pt: 0,
          pb: 3,
        }}
      >
        <Typography variant="body2">
          لديك حساب بالفعل؟{" "}
          <Button
            size="small"
            sx={{ color: "primary.main" }}
            onClick={onSwitchToLogin}
          >
            تسجيل الدخول
          </Button>
        </Typography>
      </DialogActions>
    </Dialog>
  );
};

export default SignupModal;
