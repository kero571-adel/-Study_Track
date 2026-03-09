import React from "react";
import {
  Container,
  Paper,
  Typography,
  Box,
  Button,
  Divider,
  Avatar,
} from "@mui/material";
import { Print, Share, Verified } from "@mui/icons-material";

// دالة لتحميل البيانات من الـ URL parameters
const getCertificateData = () => {
  // في الواقع، هتجب البيانات من الـ API أو الـ URL parameters
  // هنا مثال ببيانات وهمية للعرض
  const urlParams = new URLSearchParams(window.location.search);

  return {
    studentName: urlParams.get("name") || "أحمد محمد",
    courseName:
      urlParams.get("course") || "تعلم React.js من الصفر إلى الاحتراف",
    completionDate: urlParams.get("date") || "29 أغسطس 2025",
    certificateId: urlParams.get("id") || "TEC-2025-789456",
    instructor: "محمد أحمد",
    duration: "15 ساعة",
  };
};

const CertificatePage = () => {
  const certificateData = getCertificateData();

  const handlePrint = () => {
    window.print();
  };

  const handleShare = async () => {
    const shareData = {
      title: `شهادة إتمام ${certificateData.courseName}`,
      text: `أنا أكملت دورة ${certificateData.courseName} على ilp`,
      url: window.location.href,
    };

    try {
      await navigator.share(shareData);
    } catch (err) {
      // Fallback: نسخ الرابط
      navigator.clipboard.writeText(window.location.href);
      alert("تم نسخ رابط الشهادة!");
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* ورقة الشهادة */}
      <Paper
        className="certificate-container"
        elevation={6}
        sx={{
          p: 6,
          textAlign: "center",
          background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
          border: "20px solid #3f51b5",
          position: "relative",
          minHeight: "600px",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
        }}
      >
        {/* شعار الموقع */}
        <Box sx={{ position: "absolute", top: 20, left: 20 }}>
          <Typography variant="h4" color="primary" fontWeight="bold">
            ILP
          </Typography>
        </Box>

        {/* ختم الشهادة */}
        <Box sx={{ position: "absolute", top: 20, right: 20 }}>
          <Verified sx={{ fontSize: 40, color: "gold" }} />
        </Box>

        {/* محتوى الشهادة */}
        <Typography variant="h5" color="text.secondary" gutterBottom>
          شهادة إتمام
        </Typography>

        <Typography variant="h3" color="primary" fontWeight="bold" gutterBottom>
          {certificateData.courseName}
        </Typography>

        <Typography variant="h6" sx={{ my: 3 }}>
          تمنح هذه الشهادة إلى
        </Typography>

        <Typography
          variant="h4"
          color="primary"
          fontWeight="bold"
          sx={{ mb: 3 }}
        >
          {certificateData.studentName}
        </Typography>

        <Typography variant="body1" sx={{ mb: 4 }}>
          لإكماله الدورة التدريبية بنجاح في{" "}
          <Box component="span" fontWeight="bold">
            {certificateData.completionDate}
          </Box>
        </Typography>

        <Divider sx={{ my: 3 }} />

        {/* معلومات إضافية */}
        <Box sx={{ display: "flex", justifyContent: "space-around", my: 4 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              المدرب
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {certificateData.instructor}
            </Typography>
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              المدة
            </Typography>
            <Typography variant="body1" fontWeight="bold">
              {certificateData.duration}
            </Typography>
          </Box>
        </Box>

        {/* رقم الشهادة */}
        <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
          رقم الشهادة: {certificateData.certificateId}
        </Typography>

        {/* تواقيع */}
        <Box sx={{ display: "flex", justifyContent: "space-around", mt: 6 }}>
          <Box>
            <Typography variant="body2" color="text.secondary">
              توقيع المدرب
            </Typography>
            <Box sx={{ borderBottom: "1px solid black", width: 150, mt: 1 }} />
          </Box>

          <Box>
            <Typography variant="body2" color="text.secondary">
              توقيع رئيس الأكاديمية
            </Typography>
            <Box sx={{ borderBottom: "1px solid black", width: 150, mt: 1 }} />
          </Box>
        </Box>
      </Paper>

      {/* أزرار التحكم */}
      <Box sx={{ display: "flex", justifyContent: "center", gap: 2, mt: 4 }}>
        <Button
          variant="contained"
          startIcon={<Print />}
          onClick={handlePrint}
          size="large"
        >
          طباعة الشهادة
        </Button>

        <Button
          variant="outlined"
          startIcon={<Share />}
          onClick={handleShare}
          size="large"
        >
          مشاركة الشهادة
        </Button>
      </Box>

      {/* معلومات التحقق */}
      <Paper sx={{ p: 3, mt: 4, textAlign: "center" }}>
        <Typography variant="h6" gutterBottom>
          التحقق من صحة الشهادة
        </Typography>
        <Typography
          variant="body2"
          color="text.secondary"
          sx={{ overflowWrap: "break-word" }}
        >
          يمكن التحقق من صحة هذه الشهادة عبر الرابط: {window.location.href}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
          أو عن طريق التواصل مع support@teecraft.com
        </Typography>
      </Paper>

      {/* ستايل خاص للطباعة */}
      <style>
        {`
          @media print {
  @page {
    size: A4;                /* نخلي الطباعة A4 */
    margin: 0;               /* نشيل الهوامش */
  }

  body {
    -webkit-print-color-adjust: exact !important;
    print-color-adjust: exact !important;
  }

  body * {
    visibility: hidden;
  }

  .certificate-container, 
  .certificate-container * {
    visibility: visible;
  }

  .certificate-container {
    position: relative;
    width: 100%;
    height: 100%;           /* تملأ الصفحة كلها */
    box-sizing: border-box;
    border: 20px solid #3f51b5 !important;  /* البوردر يطبع كامل */
    page-break-inside: avoid; /* تمنع انقسام الشهادة */
    margin: 0;               /* نشيل أي هوامش */
  }

  .no-print {
    display: none !important;
  }
}

        `}
      </style>
    </Container>
  );
};

export default CertificatePage;
