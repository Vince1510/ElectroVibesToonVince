import React from 'react';
// react router to navigate
import { Link, useLocation } from 'react-router-dom';
// MUI Breadcrumbs
import { Breadcrumbs, Typography } from '@mui/material';
// Arrow icon
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const BreadCrumb = () => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{ margin: '20px 0', color: 'white' }} // Set breadcrumbs color to white
      separator={<ArrowForwardIosIcon sx={{ color: 'white' }} fontSize="small" />} // Arrow as a separator with white color
    >
      <Link to="/" style={{ color: 'white', textDecoration: 'none' }}>Home</Link> {/* Home link styled white */}
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        const isLast = index === pathnames.length - 1;

        return isLast ? (
          <Typography key={to} sx={{ color: 'white' }}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Typography>
        ) : (
          <Link key={to} to={to} style={{ color: 'white', textDecoration: 'none' }}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumb;
