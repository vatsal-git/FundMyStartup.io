import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { userSelector } from "../../../store/user";
import SexyAvatar from "../../commons/sexyAvatar";
import { getCookie, handleLogout } from "../../../utils/commonFunctions";

import "./index.css";
import {
  Button,
  Typography,
  useMediaQuery,
  Box,
  List,
  ListItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import CloseIcon from "@mui/icons-material/Close";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { user } = useSelector(userSelector);
  const isAuth = !!getCookie("token");
  const isMobile = useMediaQuery("(max-width:768px)");

  const [scrolled, setScrolled] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) setScrolled(isScrolled);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [scrolled]);

  const isActive = (page) => {
    if (
      pathname === page ||
      (page === "/messages" && pathname.includes("/messages/"))
    ) {
      return "navbar-link-active";
    }
  };

  const handleMenuClick = () => setShowMobileMenu(true);
  const handleMenuClose = () => setShowMobileMenu(false);

  return (
    <Box className={`navbar ${scrolled ? " scrolled" : ""}`}>
      <Box className="navbar-logo">
        <Typography variant="h6">FundMyStartup.com</Typography>
      </Box>
      {isMobile ? (
        <>
          <Button
            onClick={handleMenuClick}
            className="navbar-mobile-menu-button"
            variant="outlined"
          >
            <MenuIcon />
          </Button>
          {showMobileMenu && (
            <Box className="navbar-mobile-container">
              <Button
                onClick={handleMenuClose}
                variant="outlined"
                className="navbar-mobile-menu-button-close"
              >
                <CloseIcon />
              </Button>
              <Box className="navbar-mobile-links-container">
                <List className="navbar-mobile-links">
                  <ListItem
                    component={Link}
                    to="/"
                    className={`navbar-mobile-link ${isActive("/")}`}
                  >
                    Home
                  </ListItem>
                  <ListItem
                    component={Link}
                    to="/startups"
                    className={`navbar-mobile-link ${isActive("/startups")}`}
                  >
                    Startups
                  </ListItem>
                  {isAuth ? (
                    <>
                      {user?.role === "ENTREPRENEUR" && (
                        <ListItem
                          component={Link}
                          className={`navbar-mobile-link ${isActive(
                            "/startups/" + user._id
                          )}`}
                          to={"/startups/" + user._id}
                        >
                          My Startups
                        </ListItem>
                      )}
                      <ListItem
                        component={Link}
                        to="/messages"
                        className={`navbar-mobile-link ${isActive(
                          "/messages"
                        )}`}
                      >
                        Messages
                      </ListItem>
                      <ListItem
                        component={Link}
                        onClick={() => handleLogout(dispatch)}
                        className="navbar-mobile-link"
                      >
                        Logout
                      </ListItem>
                      <ListItem
                        component={Link}
                        to="/profile"
                        className="navbar-mobile-link"
                      >
                        Profile
                        <Box
                          className="navbar-mobile-action-profile"
                          onClick={() => navigate("./profile")}
                        >
                          <SexyAvatar name={user?.name} avatar={user?.avatar} />
                        </Box>
                      </ListItem>
                    </>
                  ) : (
                    <>
                      <ListItem
                        component={Link}
                        to="/signin"
                        className={`navbar-mobile-link ${isActive("/signin")}`}
                      >
                        Sign-In
                      </ListItem>
                      <ListItem
                        component={Link}
                        to="/signup"
                        className={`navbar-mobile-link ${isActive("/signup")}`}
                      >
                        Sign-Up
                      </ListItem>
                    </>
                  )}
                </List>
              </Box>
            </Box>
          )}
        </>
      ) : (
        <>
          <Box className="navbar-links-container">
            <List className="navbar-links">
              <ListItem
                component={Link}
                to="/"
                className={`navbar-link ${isActive("/")}`}
              >
                Home
              </ListItem>
              <ListItem
                component={Link}
                to="/startups"
                className={`navbar-link ${isActive("/startups")}`}
              >
                Startups
              </ListItem>

              {isAuth && (
                <>
                  {user?.role === "ENTREPRENEUR" && (
                    <ListItem
                      component={Link}
                      className={`navbar-link ${isActive(
                        "/startups/" + user._id
                      )}`}
                      to={"/startups/" + user._id}
                    >
                      My Startups
                    </ListItem>
                  )}
                  <ListItem
                    component={Link}
                    to="/messages"
                    className={`navbar-link ${isActive("/messages")}`}
                  >
                    Messages
                  </ListItem>
                </>
              )}
            </List>
          </Box>
          <Box className="navbar-actions">
            {isAuth ? (
              <>
                <Box
                  className="navbar-action-profile"
                  onClick={() => navigate("./profile")}
                >
                  <SexyAvatar name={user?.name} avatar={user?.avatar} />
                </Box>
                <Button
                  onClick={() => handleLogout(dispatch)}
                  variant="outlined"
                  className="navbar-action-logout"
                >
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Button
                  component={Link}
                  variant="contained"
                  to="/signin"
                  className="navbar-action-signin"
                >
                  Sign-In
                </Button>
                <Button
                  component={Link}
                  variant="outlined"
                  to="/signup"
                  className="navbar-action-signup"
                >
                  Sign-Up
                </Button>
              </>
            )}
          </Box>
        </>
      )}
    </Box>
  );
};

export default Navbar;
