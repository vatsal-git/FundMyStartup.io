import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import { userSelector } from "../../store/user";
import image1 from "../../assets/images/homepage-img-1.svg";
import image2 from "../../assets/images/homepage-img-2.svg";
import image3 from "../../assets/images/homepage-img-3.svg";

import "./index.css";
import { Box, Button, Divider, Typography } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useSelector(userSelector);

  return (
    <Box className="home-container">
      <Box className="home-container-hero-section">
        <Box className="home-container-section-hero-text">
          <Typography variant="h1">Welcome to FundMyStartup.com 👋</Typography>
          <Typography component="p">
            We are a platform dedicated to helping entrepreneurs like you turn
            your dreams into reality. Our mission is to make it easier for you
            to get the funding you need to start and grow your business.
          </Typography>
          <Box className="home-container-section-hero-btn-container">
            <Button variant="outlined" onClick={() => navigate("/startups")}>
              Explore Startups ✈️
            </Button>
            {user?.role === "ENTREPRENEUR" && (
              <Button
                variant="contained"
                onClick={() => navigate("/startups/" + user?._id)}
              >
                Create Startup 🧠
              </Button>
            )}
          </Box>
        </Box>
        <Box className="home-container-section-hero-image">
          <img src={image1} alt="startup" height="100%" width="100%" />
        </Box>
      </Box>
      <Divider />
      <Box className="home-container-hero-section">
        <Box className="home-container-section-hero-image">
          <img src={image2} alt="startup" height="100%" width="100%" />
        </Box>
        <Box className="home-container-section-hero-text">
          <Typography variant="h2">
            Fuel Your Startup Dreams☁️ with Our Funding💵 Platform
          </Typography>
          <Typography component="p">
            Whether you're just starting out or looking to take your business to
            the next level, we're here to help. With our easy-to-use platform,
            you can connect with investors, pitch your ideas, and get the
            funding you need to bring your vision to life.
          </Typography>
        </Box>
      </Box>
      <Divider />
      <Box className="home-container-info-section">
        <Box className="home-container-info-section-text">
          <Typography variant="h2">How It Works📐</Typography>
          <Typography>
            Our platform is designed to be simple, intuitive, and user-friendly,
            so you can focus on what you do best – building your business.
            <br /> We offer a range of features and tools to help you succeed.
          </Typography>
        </Box>
        <Box className="home-container-info-cards-container">
          <Box className="home-container-info-card">
            <Typography variant="h5">Create Startups 🧠</Typography>
            <Typography variant="body2" color="GrayText">
              Our platform provides an easy way to create your own startup, with
              step-by-step guidance and helpful resources to ensure your success
            </Typography>
          </Box>
          <Box className="home-container-info-card">
            <Typography variant="h5">Meet Investors 💵</Typography>
            <Typography variant="body2" color="GrayText">
              With Fund My Startup, you can easily connect with investors who
              are interested in your business and help take your startup to the
              next level
            </Typography>
          </Box>
          <Box className="home-container-info-card">
            <Typography variant="h5">Collaborate Startups🤝</Typography>
            <Typography variant="body2" color="GrayText">
              Our community of entrepreneurs is the perfect place to collaborate
              and network with other startups, sharing ideas, expertise, and
              resources to help each other grow
            </Typography>
          </Box>
          <Box className="home-container-info-card">
            <Typography variant="h5">Access Resources 📚</Typography>
            <Typography variant="body2" color="GrayText">
              We offer a wealth of valuable resources to help you succeed,
              including expert advice, educational content, and tools to help
              you manage and grow your startup
            </Typography>
          </Box>
        </Box>
      </Box>
      <Divider />
      <Box className="home-container-hero-section">
        <Box className="home-container-section-hero-text">
          <Typography variant="h2">Start Now! 🚀</Typography>
          <Typography component="p">
            At Fund My Startup, we believe that every great idea deserves a
            chance to succeed. So whether you're building the next big thing or
            just getting started, we're here to help you make it happen. Join
            our community today and start turning your dreams into reality!
          </Typography>
          <Box className="home-container-section-hero-btn-container">
            <Button variant="outlined" onClick={() => navigate("/startups")}>
              Explore Startups ✈️
            </Button>
            {user?.role === "ENTREPRENEUR" && (
              <Button
                variant="contained"
                onClick={() => navigate("/startups/" + user?._id)}
              >
                Create Startup 🧠
              </Button>
            )}
          </Box>
        </Box>
        <Box className="home-container-section-hero-image">
          <img src={image3} alt="startup" height="100%" width="100%" />
        </Box>
      </Box>
    </Box>
  );
};

export default Home;
