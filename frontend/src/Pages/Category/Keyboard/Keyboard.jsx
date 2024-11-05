import React from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';

function Keyboard() {
  // Sample keyboard data
  const keyboards = [
    { id: 1, name: 'Mechanical Keyboard', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.' },
    { id: 2, name: 'Wireless Keyboard', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.' },
    { id: 3, name: 'Ergonomic Keyboard', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.' },
    { id: 4, name: 'Compact Keyboard', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.' },
    // Add more keyboards as needed
  ];

  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Keyboard Page
      </Typography>
      <Typography gutterBottom>This is the Keyboard page content.</Typography>
      <Grid container spacing={2}>
        {keyboards.map((keyboard) => (
          <Grid item xs={12} sm={6} md={4} key={keyboard.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{keyboard.name}</Typography>
                <Typography>{keyboard.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Keyboard;
