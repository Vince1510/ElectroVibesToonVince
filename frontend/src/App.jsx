import React from 'react';
import { Button, Typography, Container } from '@mui/material';

function App() {
  return (
    <Container>
      <Typography variant="h2" component="h1" gutterBottom>
        Welcome to My MUI App!
      </Typography>
      <Button variant="contained" color="primary">
        Click Me
      </Button>
    </Container>
  );
}

export default App;
