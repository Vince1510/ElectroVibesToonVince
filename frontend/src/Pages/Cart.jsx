import React from "react";
import { useCart } from "../components/CartContext";
import { Box, Typography, Button, Card, CardMedia, Divider } from "@mui/material";

function Cart() {
  const { cartItems, removeFromCart } = useCart();

  if (cartItems.length === 0) {
    return (
      <Box sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h4">Your Cart is Empty</Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.map((item) => (
        <Card key={item.id} sx={{ display: "flex", marginBottom: 2, padding: 2 }}>
          <CardMedia
            component="img"
            image={item.image}
            alt={item.name}
            sx={{ width: 100, height: 100, marginRight: 2 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body1">Color: {item.color}</Typography>
            <Typography variant="body1">Model: {item.model}</Typography>
            <Typography variant="body1">Price: €{item.price}</Typography>
            <Typography variant="body1">Quantity: {item.quantity}</Typography>
          </Box>
          <Button
            variant="outlined"
            color="error"
            onClick={() => removeFromCart(item.id)}
          >
            Remove
          </Button>
        </Card>
      ))}
      <Divider sx={{ marginY: 4 }} />
      <Typography variant="h5">
        Total: €
        {cartItems.reduce((total, item) => total + item.price * item.quantity, 0).toFixed(2)}
      </Typography>
      <Button
        variant="contained"
        sx={{ marginTop: 2 }}
        onClick={() => alert("Proceed to Checkout")}
      >
        Checkout
      </Button>
    </Box>
  );
}

export default Cart;
