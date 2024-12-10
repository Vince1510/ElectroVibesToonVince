import React from "react";
import { useCart } from "../components/CartContext.jsx";
import {
  Box,
  Typography,
  Button,
  Card,
  CardMedia,
  Divider,
  IconButton,
  TextField,
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  if (cartItems.length === 0) {
    return (
      <Box sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h4" sx={{ color: "#888" }}>
          Your Cart is Empty
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom>
        Your Cart
      </Typography>
      {cartItems.map((item) => (
        <Card
          key={item.id}
          sx={{
            display: "flex",
            alignItems: "center",
            marginBottom: 2,
            padding: 2,
            border: "1px solid #D9D9D9",
            borderRadius: 2,
            backgroundColor: "transparent",
          }}
        >
          <CardMedia
            component="img"
            image={item.image}
            alt={item.name}
            sx={{ width: 100, height: 100, marginRight: 2 }}
          />
          <Box sx={{ flex: 1 }}>
            <Typography variant="h6">{item.name}</Typography>
            <Typography variant="body2">Color: {item.color}</Typography>
            <Typography variant="body2">Model: {item.model}</Typography>
            <Typography variant="body2">Price: €{item.price}</Typography>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                marginTop: 1,
              }}
            >
              <IconButton
                size="small"
                onClick={() =>
                  updateQuantity(item.id, Math.max(item.quantity - 1, 1))
                }
              >
                <Remove />
              </IconButton>
              <TextField
                value={item.quantity}
                size="small"
                sx={{ width: 50, textAlign: "center" }}
                inputProps={{
                  style: { textAlign: "center" },
                  type: "number",
                  min: 1,
                }}
                onChange={(e) =>
                  updateQuantity(item.id, Math.max(Number(e.target.value), 1))
                }
              />
              <IconButton
                size="small"
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
              >
                <Add />
              </IconButton>
            </Box>
          </Box>
          <Button
            variant="outlined"
            color="error"
            onClick={() => removeFromCart(item.id)}
            sx={{ marginLeft: 2 }}
          >
            Remove
          </Button>
        </Card>
      ))}
      <Divider sx={{ marginY: 4 }} />
      <Typography variant="h5">
        Total: €
        {cartItems
          .reduce((total, item) => total + item.price * item.quantity, 0)
          .toFixed(2)}
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