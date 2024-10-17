import React from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';

function Mouse() {
  // Sample mouse data
  const mice = [
    { id: 1, name: 'Gaming Mouse', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.' },
    { id: 2, name: 'Wireless Mouse', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.' },
    { id: 3, name: 'Vertical Mouse', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.' },
    { id: 4, name: 'Bluetooth Mouse', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.' },
    // Add more mice as needed
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Mouse Page
      </Typography>
      <Typography gutterBottom>This is the Mouse page content.</Typography>
      <Grid container spacing={2}>
        {mice.map((mouse) => (
          <Grid item xs={12} sm={6} md={4} key={mouse.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{mouse.name}</Typography>
                <Typography>{mouse.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Mouse;
