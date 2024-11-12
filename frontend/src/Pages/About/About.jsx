import React from "react";
import { Typography, Grid, Avatar, Link } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import "./About.css";

function About() {
  return (
    <div className="about-container">
      {/* Left side: Main About Text */}
      <div className="about-left">
        <Typography variant="h4">About ElectroVibe</Typography>
        <Typography>
          Welcome to ElectroVibe, your trusted partner in the world of consumer
          electronics! We are passionate about innovation and dedicated to
          delivering not just products, but valuable experiences that enhance
          your digital life. Founded by a team of tech enthusiasts, ElectroVibe
          combines a love for technology with a deep understanding of consumer
          needs. At ElectroVibe, you’ll find a comprehensive range of
          electronics, from laptops and PCs to specialized gaming accessories
          and microphones. Each product we offer is carefully selected to meet
          our high-quality standards and the expectations of our customers.
          {/* [Additional text truncated for brevity] */}
        </Typography>
      </div>

      {/* Right side: Information about Vince and Toon */}
      <div className="about-right">
        <Typography variant="h5">Our Team</Typography>

        {/* Vince van Apeldoorn */}
        <div className="about-team-member">
          <Avatar
            alt="Vince van Apeldoorn"
            className="about-team-member-avatar"
          />
          <Typography variant="body1">
            Vince van Apeldoorn is a passionate front-end developer who has been
            working on various tech projects, contributing his deep knowledge in
            React and modern web technologies.
          </Typography>
          <Link
            href="https://www.linkedin.com/in/vince-van-apeldoorn/"
            target="_blank"
            className="about-linkedin"
          >
            <LinkedInIcon />
          </Link>
        </div>

        {/* Toon van Berkel */}
        <div className="about-team-member">
          <Avatar alt="Toon van Berkel" className="about-team-member-avatar" />
          <Typography variant="body1">
            Toon van Berkel specializes in project management and back-end
            development. He has a knack for optimizing processes and delivering
            high-quality digital solutions.
          </Typography>
          <Link
            href="https://www.linkedin.com/in/toon-van-berkel/"
            target="_blank"
            className="about-linkedin"
          >
            <LinkedInIcon />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default About;
