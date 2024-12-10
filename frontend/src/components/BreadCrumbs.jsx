import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Breadcrumbs, Typography } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';

const BreadCrumb = ({ productName }) => {
  const location = useLocation();
  const pathnames = location.pathname.split("/").filter((x) => x);

  const categories = ["laptops", "keyboards", "phones", "games", "mice", "monitors"];

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{ margin: '20px 0', color: 'white' }}
      separator={<Typography sx={{ color: 'white', fontSize: 'small' }}> / </Typography>}
    >
      <Link to="/" style={{ color: 'white', textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
        <HomeIcon fontSize="small" sx={{ marginRight: '5px' }} /> Home
      </Link>

      {pathnames.map((value, index) => {
        const isDetailPage = value.toLowerCase() === "detail";
        const isCategory = categories.includes(value.toLowerCase());
        const isLast = index === pathnames.length - 1;

        // Display text for the breadcrumb
        const displayValue = isDetailPage
          ? "Product"
          : value.charAt(0).toUpperCase() + value.slice(1);

        const finalValue = isLast && productName ? productName : displayValue;

        // Generate dynamic links
        const to = isDetailPage
          ? "/product"
          : isCategory
          ? `/product?category=${value.charAt(0).toUpperCase() + value.slice(1)}`
          : `/${pathnames.slice(0, index + 1).join("/")}`;

        return isLast ? (
          // Render the last breadcrumb as plain text
          <Typography key={to} sx={{ color: 'white' }}>
            {finalValue}
          </Typography>
        ) : (
          // Render intermediate breadcrumbs as links
          <Link key={to} to={to} style={{ color: 'white', textDecoration: 'none' }}>
            {finalValue}
          </Link>
        );
      })}
    </Breadcrumbs>
  );
};

export default BreadCrumb;
