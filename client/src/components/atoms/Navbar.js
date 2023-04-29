import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { getCookie } from "../../utils/commonFunctions";
import { useDispatch } from "react-redux";
import { removeUser } from "../../store/user";
import {
  AppBar,
  Toolbar,
  Button,
  Typography,
  IconButton,
  useMediaQuery,
  Menu,
  MenuItem,
} from "@mui/material";
import FaceIcon from "@mui/icons-material/Face";
import MenuIcon from "@mui/icons-material/Menu";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isMobile = useMediaQuery("(max-width:600px)");
  const { pathname } = useLocation();
  const [currentPage, setCurrentPage] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);

  useEffect(() => {
    setCurrentPage(pathname);
  }, [pathname]);

  const isAuthenticated = !!getCookie("token");

  const handleLogout = () => {
    dispatch(removeUser());
    navigate("/");
  };

  const isActive = (page) => {
    if (page === currentPage) {
      return "active-nav-item";
    } else {
      return "";
    }
  };

  const handleMenuClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar
      component="nav"
      position="static"
      color="transparent"
      sx={{
        boxShadow: "none",
        borderBottom: "1px solid",
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          FundMyStartup
        </Typography>
        {isMobile ? (
          <>
            <IconButton
              onClick={handleMenuClick}
              size="large"
              color="inherit"
              sx={{ display: "block" }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem component={Link} to="/" className={`${isActive("/")}`}>
                Home
              </MenuItem>
              <MenuItem
                component={Link}
                to="/startups"
                className={`${isActive("/startups")}`}
              >
                Startups
              </MenuItem>
              <MenuItem
                component={Link}
                to="/investors"
                className={`${isActive("/investors")}`}
              >
                Investors
              </MenuItem>
              {isAuthenticated && (
                <>
                  <MenuItem
                    component={Link}
                    to="/messages"
                    className={`${isActive("/messages")}`}
                  >
                    Messages
                  </MenuItem>
                  <MenuItem
                    component={Link}
                    to="/profile"
                    className={`${isActive("/profile")}`}
                  >
                    Profile
                  </MenuItem>
                </>
              )}
              {!isAuthenticated ? (
                <MenuItem
                  component={Link}
                  to="/signin"
                  className={`${isActive("/signin")}`}
                >
                  Sign In
                </MenuItem>
              ) : (
                <MenuItem onClick={handleLogout} className={`${isActive("/")}`}>
                  Logout
                </MenuItem>
              )}
            </Menu>
          </>
        ) : (
          <>
            <div style={{ marginRight: "2em", display: "flex", gap: ".25em" }}>
              <Button
                component={Link}
                className={`${isActive("/")} nav-item`}
                to="/"
                color="inherit"
              >
                Home
              </Button>
              <Button
                component={Link}
                className={`${isActive("/startups")} nav-item`}
                to="/startups"
                color="inherit"
              >
                Startups
              </Button>
              <Button
                component={Link}
                className={`${isActive("/investors")} nav-item`}
                to="/investors"
                color="inherit"
              >
                Investors
              </Button>
              {isAuthenticated && (
                <>
                  <Button
                    component={Link}
                    className={`${isActive("/messages")} nav-item`}
                    to="/messages"
                    color="inherit"
                  >
                    Messages
                  </Button>
                  <IconButton
                    component={Link}
                    to="/profile"
                    size="small"
                    color="inherit"
                  >
                    <FaceIcon />
                  </IconButton>
                </>
              )}
            </div>
            <div>
              {isAuthenticated ? (
                <Button
                  onClick={handleLogout}
                  className="secondaryBtn"
                  sx={{
                    padding: ".25em .5em",
                    marginLeft: 2,
                  }}
                >
                  Logout
                </Button>
              ) : (
                <Button
                  component={Link}
                  to="/signin"
                  className="secondaryBtn"
                  sx={{
                    padding: ".25em .5em",
                  }}
                >
                  Sign-In
                </Button>
              )}
            </div>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
