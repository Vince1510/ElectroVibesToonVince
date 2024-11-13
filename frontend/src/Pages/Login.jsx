import React from 'react';
import { Typography, TextField, Button, Container } from '@mui/material';

function Login() {
  return (
    <Container>
      <Typography variant="h4" gutterBottom>Login</Typography>
      <form>
        <TextField label="Username" variant="outlined" fullWidth margin="normal" />
        <TextField label="Password" type="password" variant="outlined" fullWidth margin="normal" />
        <Button variant="contained" color="primary" fullWidth>Login</Button>
      </form>
    </Container>
  );
}

export default Login;
