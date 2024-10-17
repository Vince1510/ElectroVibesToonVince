import React from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';

function SmartPhone() {
  // Sample smartphone data
  const smartphones = [
    { id: 1, name: 'SmartPhone A', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.' },
    { id: 2, name: 'SmartPhone B', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.' },
    { id: 3, name: 'SmartPhone C', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.' },
    { id: 4, name: 'SmartPhone D', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.' },
    // Add more smartphones as needed
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        SmartPhone Page
      </Typography>
      <Typography gutterBottom>This is the SmartPhone page content.</Typography>
      <Grid container spacing={2}>
        {smartphones.map((smartphone) => (
          <Grid item xs={12} sm={6} md={4} key={smartphone.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{smartphone.name}</Typography>
                <Typography>{smartphone.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default SmartPhone;
