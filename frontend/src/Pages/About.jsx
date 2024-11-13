import React from "react";
import { Typography, Avatar, Link, Box } from "@mui/material";
import LinkedInIcon from "@mui/icons-material/LinkedIn";

function About() {
  return (
    <Box
      sx={{
        padding: "20px",
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        justifyContent: "space-between",
      }}
    >
      {/* Left side: Main About Text */}
      <Box
        sx={{
          textAlign: "justify",
          lineHeight: 1.6,
          flexBasis: { xs: "100%", md: "60%" },
          marginBottom: { xs: "20px", md: 0 },
        }}
      >
        <Typography variant="h4" gutterBottom>
          About ElectroVibe
        </Typography>
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
        </Typography>
      </Box>

      {/* Right side: Information about Vince and Toon */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          flexBasis: { xs: "100%", md: "35%" },
        }}
      >
        <Typography variant="h5" gutterBottom>
          Our Team
        </Typography>

        {/* Vince van Apeldoorn */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            marginBottom: "16px",
          }}
        >
          <Avatar
            alt="Vince van Apeldoorn"
            sx={{
              width: 56,
              height: 56,
              marginRight: { xs: 0, sm: "16px" },
              marginBottom: { xs: "8px", sm: 0 },
            }}
          />
          <Box>
            <Typography variant="body1">
              Vince van Apeldoorn is a passionate front-end developer who has
              been working on various tech projects, contributing his deep
              knowledge in React and modern web technologies.
            </Typography>
            <Link
              href="https://www.linkedin.com/in/vince-van-apeldoorn/"
              target="_blank"
              sx={{
                marginTop: "8px",
                color: "#0077b5",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <LinkedInIcon />
            </Link>
          </Box>
        </Box>

        {/* Toon van Berkel */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            marginBottom: "16px",
          }}
        >
          <Avatar
            alt="Toon van Berkel"
            sx={{
              width: 56,
              height: 56,
              marginRight: { xs: 0, sm: "16px" },
              marginBottom: { xs: "8px", sm: 0 },
            }}
          />
          <Box>
            <Typography variant="body1">
              Toon van Berkel specializes in project management and back-end
              development. He has a knack for optimizing processes and
              delivering high-quality digital solutions.
            </Typography>
            <Link
              href="https://www.linkedin.com/in/toon-van-berkel/"
              target="_blank"
              sx={{
                marginTop: "8px",
                color: "#0077b5",
                display: "inline-flex",
                alignItems: "center",
              }}
            >
              <LinkedInIcon />
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default About;