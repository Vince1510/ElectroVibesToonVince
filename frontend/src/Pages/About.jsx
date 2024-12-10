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
          flexBasis: { xs: "100%", md: "46%" },
          marginBottom: { xs: "20px", md: 0 },
          marginRight: 5,
        }}
      >
        <Typography variant="h4" gutterBottom>
          About
        </Typography>
        <Typography sx={{ marginBottom: 1 }}>
          Welcome to ElectroVibe, your trusted partner in the world of consumer electronics! We are passionate about innovation and dedicated to delivering not just products, but valuable experiences that enhance your digital life. Founded by a team of tech enthusiasts, ElectroVibe combines a love for technology with a deep understanding of consumer needs.
        </Typography> 
        <Typography sx={{ marginBottom: 1 }}>
          At ElectroVibe, you’ll find a comprehensive range of electronics, from laptops and PCs to specialized gaming accessories and microphones. Each product we offer is carefully selected to meet our high quality standards and the expectations of our customers.
        </Typography>
        <Typography sx={{ marginBottom: 1 }}>
          Our website is designed to provide you with a user-friendly and informative shopping experience. Easily search for products via our integrated search bar, compare specifications and prices, read and write reviews, and explore alternative options that suit your needs. We also offer a dynamic overview of all products with convenient filters like brand and RAM size, so you can quickly find what you’re looking for.
        </Typography>
        <Typography sx={{ marginBottom: 1 }}>
          Innovation at ElectroVibe doesn’t stop at our products. We feature a vibrant blog and news section where you can read all about the latest developments and research in the tech industry. Additionally, our special discount codes and price alerts make shopping even more advantageous.
        </Typography>
      </Box>

      {/* Right side: Information about Vince and Toon */}
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
          flexBasis: { xs: "100%", md: "54%" },
          flexGrow: 1,
        }}
      >

        {/* Vince van Apeldoorn */}
        <Box
          sx={{
            display: "flex",
            flexDirection: { xs: "column", sm: "row" },
            alignItems: { xs: "flex-start", sm: "center" },
            marginBottom: "16px",
          }}
        >
          <Link href="https://vince1510.github.io/portfolio_v3/" target="_blank">
            <Avatar
              alt="Vince van Apeldoorn"
              src="https://media.licdn.com/dms/image/v2/D4E03AQFfTdpM9hTzvQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1729536010670?e=1737590400&v=beta&t=PpYKVnCNmDcAo7w3sKbW9Yg0cEl2ygPkuaVqtV0riVg"
              sx={{
                width: 200,
                height: 200,
                marginRight: { xs: 0, sm: "16px" },
                marginBottom: { xs: "8px", sm: 0 },
              }}
            />
          </Link>
          <Box>
              <Link
                href="https://www.linkedin.com/in/vince-van-apeldoorn-52997a248/"
                target="_blank"
                sx={{
                  marginTop: "8px",
                  color: "#0077b5",
                  display: "inline-flex",
                  alignItems: "center",
                  textDecoration: 'none',
                }}
              >
              <Typography variant="h4">
                Vince van Apeldoorn
                  <LinkedInIcon sx={{ marginLeft: 1 }} />
              </Typography>
            </Link>
            <Typography variant="body1">
            I’m Vince, a passionate and dedicated professional with a background in IT. With 3 years of experience, I specialize in React and am committed to leveraging my skills to drive success and innovation. I thrive in dynamic environments and am always eager to tackle new challenges and contribute positively to organizational goals.
            </Typography>
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
          <Link href="https://www.toonvb.com" target="_blank">
            <Avatar
              alt="Toon van Berkel"
              src="https://media.licdn.com/dms/image/v2/D5603AQEyoBgQdvgbAQ/profile-displayphoto-shrink_400_400/profile-displayphoto-shrink_400_400/0/1727362421653?e=1737590400&v=beta&t=Rxk92Bcv8PTOgYSofA5yLC_SKRiFQBbCItzhSxHPjzw"
              sx={{
                width: 200,
                height: 200,
                marginRight: { xs: 0, sm: "16px" },
                marginBottom: { xs: "8px", sm: 0 },
              }}
            />
          </Link>
          <Box>
            <Link href="https://www.linkedin.com/in/toon-van-berkel-a9112628b/"
              target="_blank"
              sx={{
                marginTop: "8px",
                color: "#0077b5",
                display: "inline-flex",
                alignItems: "center",
                textDecoration: 'none',
              }}>
              <Typography variant="h4">
                Toon van Berkel
                  <LinkedInIcon sx={{ marginLeft: 1 }}  />
              </Typography>
            </Link>
            <Typography variant="body1">
            I'm Toon van Berkel, a 17-year-old aspiring education software developer with a keen interest in creative media. From a young age, I've been fascinated by both programming and design, which has driven me to pursue this unique and dynamic field. I am currently advancing my skills in HTML, CSS/SCSS, JavaScript, React, Pyhton and tools like Gimp, Github and Visual Studio.
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default About;