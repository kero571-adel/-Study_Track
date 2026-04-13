// src/components/PageLoader.jsx
import { Box, CircularProgress } from "@mui/material";

export default function PageLoader() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        width: "100%",
        backgroundColor: "background.default",
      }}
    >
      <CircularProgress size={60} thickness={4} />
    </Box>
  );
}
