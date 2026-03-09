import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Book } from "@mui/icons-material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { Link } from "react-router-dom";
import { use, useState, useEffect} from "react";
import LoginModal from "./modalLogin";
import SignModal from "./modalSign";
function NavBar() {
  const [modalOpen, setModalOpen] = useState(false);
  const [isSignupModalOpen, setIsSignupModalOpen] = useState(false);
  const [auth, setAuth] = useState({ logSign: false, acc: false });

  const handleOpenSignupModal = () => {
    setIsSignupModalOpen(true);
  };

  const handleCloseSignupModal = () => {
    setIsSignupModalOpen(false);
  };

  const handleSwitchToLogin = () => {
    setIsSignupModalOpen(false);
    // هنا تفتح موديل تسجيل الدخول لو عندك
    setModalOpen(true);
  };
  useEffect(() => {
    if (localStorage.getItem("user")) {
      setAuth({ logSign: false, acc: true });
    }else {
      setAuth({ logSign: true, acc: false }); 
    }
  },[localStorage.getItem("user")]);
  return (
    <>
      <AppBar component="nav" sx={{ position: "relative" }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            sx={{ mr: 2 }}
          >
            <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
              <Book />
            </Link>
          </IconButton>
          <Typography
            component="div"
            sx={{
              flexGrow: 1,
              fontSize: { md: "30px", xs: "17px", sm: "15px" },
              fontWeight: "bold",
            }}
          >
            <Link to="/" style={{ color: "#fff", textDecoration: "none" }}>
              منصة التعلم التفاعلي
            </Link>
          </Typography>
          <Box>
            <Button
              sx={{ color: "#fff", fontWeight: "bold" }}
              onClick={() => setModalOpen(true)}
              style={{ display: auth.logSign ? "inline" : "none" }}
            >
              Log in
            </Button>
            <Button
              sx={{ color: "#fff", fontWeight: "bold" }}
              onClick={handleOpenSignupModal}
              style={{ display: auth.logSign ? "inline" : "none" }}
            >
              Sign up
            </Button>
            <Button style={{ display: auth.acc ? "inline" : "none" }}>
              <Link to="/account" style={{ color: "#fff" }}>
                <AccountCircleIcon />
              </Link>
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      <LoginModal open={modalOpen} onClose={() => setModalOpen(false)} />
      <SignModal
        open={isSignupModalOpen}
        onClose={handleCloseSignupModal}
        onSwitchToLogin={handleSwitchToLogin}
      />
    </>
  );
}
export default NavBar;
