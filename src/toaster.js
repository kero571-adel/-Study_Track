import * as React from "react";
import Snackbar from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { Button } from "@mui/material";
import { ThemeProvider, createTheme } from "@mui/material/styles";
const theme = createTheme({
  palette: {
    success: { main: "#4caf50" },
    wrong: { main: "#f50057" },
    background: { default: "#f5f5f5" },
  },
});
export default function SimpleSnackbar({ toast = {}, setToast }) {
  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    setToast({ ...toast, open: false });
  };

  const action = (
    <React.Fragment>
      <Button color={toast.severity} size="small" onClick={handleClose}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color={toast.severity}
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <ThemeProvider theme={theme}>
      <div>
        <Snackbar
          open={toast.open}
          autoHideDuration={3000}
          onClose={handleClose}
          message={toast.message}
          action={action}
          color="success"
        />
      </div>
    </ThemeProvider>
  );
}
