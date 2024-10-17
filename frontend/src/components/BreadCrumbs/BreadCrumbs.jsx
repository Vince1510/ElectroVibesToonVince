import React from 'react';
//react router to navigate
import { Link, useLocation } from 'react-router-dom';
//mui breadcrumb
import { Breadcrumbs } from '@mui/material';
//arrow 
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

const BreadCrumb = () => {
  const location = useLocation(); 
  const pathnames = location.pathname.split("/").filter((x) => x);

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{ margin: '20px 0' }}
      separator={<ArrowForwardIosIcon fontSize="small" />} //Arrow as a separator
    >
      <Link to="/">Home</Link>
      {pathnames.map((value, index) => {
        const to = `/${pathnames.slice(0, index + 1).join("/")}`;
        return (
          <Link key={to} to={to}>
            {value.charAt(0).toUpperCase() + value.slice(1)}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumb;
