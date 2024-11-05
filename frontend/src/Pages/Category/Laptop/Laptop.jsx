import React from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';

function Laptop() {
  // Sample laptop data
  const laptops = [
    { id: 1, name: 'Gaming Laptop', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.' },
    { id: 2, name: 'Ultrabook', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.' },
    { id: 3, name: 'Business Laptop', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.' },
    { id: 4, name: '2-in-1 Laptop', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.' },
    // Add more laptops as needed
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Laptop Page
      </Typography>
      <Typography gutterBottom>This is the Laptop page content.</Typography>
      <Grid container spacing={2}>
        {laptops.map((laptop) => (
          <Grid item xs={12} sm={6} md={4} key={laptop.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{laptop.name}</Typography>
                <Typography>{laptop.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Laptop;
