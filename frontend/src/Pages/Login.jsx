import React from 'react';
import { Typography, TextField, Button, Container, Box } from '@mui/material';

function Login() {
  return (
    <Box
      sx={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(to bottom, #E70002, #000000, #FCD201)',
        position: 'fixed',
        top: 0,
        left: 0,
        zIndex: -1,
      }}
    >
      <Box
        sx={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          backgroundColor: 'rgba(0, 0, 0, 0.8)',
        }}
      />
      <Box
        sx={{
          zIndex: 1,
          padding: 4,
          borderRadius: 2,
          width: '100%',
          maxWidth: '800px',
        }}
      >
        <Container sx={{ textAlign: 'center' }}>
          <Typography
            variant="h4"
            gutterBottom
            sx={{
              color: '#FFFFFF',
              fontFamily: 'Arial, sans-serif',
              fontWeight: 'bold',
            }}
          >
            ElectroVibe Inloggen
          </Typography>
          <form>
            <TextField
              label="Username/e-mailaddress"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{ sx: { color: '#FFFFFF', borderRadius: '5px' } }}
              InputLabelProps={{ sx: { color: '#FFFFFF' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#FFFFFF',
                    borderRadius: '5px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FFFFFF',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FFFFFF',
                  },
                },
              }}
            />
            <TextField
              label="Password"
              type="password"
              variant="outlined"
              fullWidth
              margin="normal"
              InputProps={{ sx: { color: '#FFFFFF', borderRadius: '5px' } }}
              InputLabelProps={{ sx: { color: '#FFFFFF' } }}
              sx={{
                '& .MuiOutlinedInput-root': {
                  '& fieldset': {
                    borderColor: '#FFFFFF',
                    borderRadius: '5px',
                  },
                  '&:hover fieldset': {
                    borderColor: '#FFFFFF',
                  },
                  '&.Mui-focused fieldset': {
                    borderColor: '#FFFFFF',
                  },
                },
              }}
            />
            <Button
              variant="contained"
              fullWidth
              sx={{
                backgroundColor: '#000000',
                color: '#FFFFFF',
                borderRadius: '5px',
                fontWeight: 'bold',
                mt: 4,
                p: 1.5,
                textTransform: 'none',
                border: 'white 1px solid',
              }}
            >
              Submit
            </Button>
          </form>
        </Container>
      </Box>
    </Box>
  );
}

export default Login;
