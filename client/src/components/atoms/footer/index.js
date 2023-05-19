import React, { useEffect } from "react";

import { useGetAllStartupsMutation } from "../../../store/apis/startup.api";

import "./index.css";
import { Box, Divider, Typography } from "@mui/material";

const Footer = () => {
  const [getAllStartups, startupsRes] = useGetAllStartupsMutation();

  useEffect(() => {
    getAllStartups();
  }, []);

  return (
    <Box component="footer">
      <Box className="footer-main">
        <Box className="footer-main-links">
          <Box className="footer-main-link">
            <Typography variant="body2">Resources</Typography>
            <Typography variant="body2" color="GrayText">
              Blogs
            </Typography>
            <Typography variant="body2" color="GrayText">
              NewsLetters
            </Typography>
            <Typography variant="body2" color="GrayText">
              Events
            </Typography>
            <Typography variant="body2" color="GrayText">
              Help center
            </Typography>
            <Typography variant="body2" color="GrayText">
              Support
            </Typography>
          </Box>
          <Box className="footer-main-link">
            <Typography variant="body2">Company</Typography>
            <Typography variant="body2" color="GrayText">
              About Us
            </Typography>
            <Typography variant="body2" color="GrayText">
              Careers
            </Typography>
            <Typography variant="body2" color="GrayText">
              Press
            </Typography>
            <Typography variant="body2" color="GrayText">
              News
            </Typography>
            <Typography variant="body2" color="GrayText">
              Partners
            </Typography>
          </Box>
          <Box className="footer-main-link">
            <Typography variant="body2">Social</Typography>
            <Typography variant="body2" color="GrayText">
              Twitter
            </Typography>
            <Typography variant="body2" color="GrayText">
              LinkedIn
            </Typography>
            <Typography variant="body2" color="GrayText">
              Facebook
            </Typography>
            <Typography variant="body2" color="GrayText">
              Github
            </Typography>
            <Typography variant="body2" color="GrayText">
              Dribbble
            </Typography>
          </Box>
          <Box className="footer-main-link">
            <Typography variant="body2">Legal</Typography>
            <Typography variant="body2" color="GrayText">
              Terms
            </Typography>
            <Typography variant="body2" color="GrayText">
              Privacy
            </Typography>
            <Typography variant="body2" color="GrayText">
              Cookies
            </Typography>
            <Typography variant="body2" color="GrayText">
              Licenses
            </Typography>
            <Typography variant="body2" color="GrayText">
              Settings
            </Typography>
          </Box>
          <Box className="footer-main-link">
            <Typography variant="body2">Contact</Typography>
            <Typography variant="body2" color="GrayText">
              info@funcmystartup.com
            </Typography>
            <Typography variant="body2" color="GrayText">
              +1 (555) 123-4567
            </Typography>
            <Typography variant="body2" color="GrayText">
              123 Main Street, <br />
              Suite 100, Anytown, USA
            </Typography>
          </Box>
        </Box>
        <Box className="footer-main-about">
          <Typography variant="h6">FundMyStartup.com</Typography>
          <Typography variant="body2" color="GrayText">
            Every great idea deserves a chance to succeed, <br /> and we're here
            to make that happen.
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box className="footer-copyRight">
        <Box className="footer-startupListCount">
          <Typography variant="subtitle2" color="black">
            {startupsRes?.data?.length}
          </Typography>
          <Typography variant="subtitle1" color="GrayText">
            Startups Listed
          </Typography>
        </Box>
        <Typography color="GrayText">
          &copy; 2023 Fund My Startup. All rights reserved.
        </Typography>
      </Box>
    </Box>
  );
};

export default Footer;
