import React from 'react';
import { Typography, Card, CardContent, Grid } from '@mui/material';

function Games() {
  const games = [
    { id: 1, title: 'Game 1', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.' },
    { id: 2, title: 'Game 2', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.' },
    { id: 3, title: 'Game 3', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.' },
    { id: 4, title: 'Game 4', description: 'Lorem, ipsum dolor sit amet consectetur adipisicing elit. Iste exercitationem, consequatur fuga sunt fugiat vero, veritatis doloremque omnis nulla officia, dolorum laudantium commodi reprehenderit voluptatibus? Iste reiciendis excepturi iusto id.' },
  ];
  return (
    <div>
      <Typography variant="h4" gutterBottom>
        Games Page
      </Typography>
      <Typography gutterBottom>This is the Games page content.</Typography>
      <Grid container spacing={2}>
        {games.map((game) => (
          <Grid item xs={12} sm={6} md={4} key={game.id}>
            <Card>
              <CardContent>
                <Typography variant="h5">{game.title}</Typography>
                <Typography>{game.description}</Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </div>
  );
}

export default Games;
