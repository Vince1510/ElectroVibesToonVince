import React from 'react';
import {
  Typography,
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Card,
  CardContent,
  CardHeader,
  Grid,
} from '@mui/material';

function Admin() {
  const products = [
    {
      image: 'https://via.placeholder.com/50', // Placeholder image URL
      title: 'Product 1',
      number: 'P001',
      amount: 0, // Out of stock
      status: 'Out of Stock',
    },
    {
      image: 'https://via.placeholder.com/50', // Placeholder image URL
      title: 'Product 2',
      number: 'P002',
      amount: 50,
      status: 'In Stock',
    },
    {
      image: 'https://via.placeholder.com/50', // Placeholder image URL
      title: 'Product 3',
      number: 'P003',
      amount: 0, // Out of stock
      status: 'Out of Stock',
    },
    // Add more products as needed
  ];

  // Filter out products that are out of stock
  const outOfStockProducts = products.filter((product) => product.amount === 0);

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Admin Page
      </Typography>
      <Typography variant="body1" gutterBottom>
        Admin page comes here
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12} md={8}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Product Image</TableCell>
                  <TableCell>Product Title</TableCell>
                  <TableCell>Product Number</TableCell>
                  <TableCell>Amount</TableCell>
                  <TableCell>Status</TableCell>
                  <TableCell>Add Stock</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {products.map((product) => (
                  <TableRow key={product.number}>
                    <TableCell>
                      <img
                        src={product.image}
                        alt={product.title}
                        style={{ width: '50px', height: '50px' }}
                      />
                    </TableCell>
                    <TableCell>{product.title}</TableCell>
                    <TableCell>{product.number}</TableCell>
                    <TableCell>{product.amount}</TableCell>
                    <TableCell>{product.status}</TableCell>
                    <TableCell>
                      <Button variant="contained" color="primary">
                        Add Stock
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Grid>

        <Grid item xs={12} md={4}>
          <Card>
            <CardHeader title="Out of Stock Products" />
            <CardContent>
              {outOfStockProducts.length > 0 ? (
                outOfStockProducts.map((product) => (
                  <Typography key={product.number} variant="body2">
                    {product.title} (Product Number: {product.number})
                  </Typography>
                ))
              ) : (
                <Typography variant="body2">No products are out of stock.</Typography>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
}

export default Admin;
