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
  Grid,
} from "@mui/material";
import { Add, Remove, Delete } from "@mui/icons-material";

function Cart() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const postageCost = 10;
  const totalPrice = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const finalAmount = totalPrice + postageCost;

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
    <Box>
      <Typography variant="h4" gutterBottom>
        Shopping Cart
      </Typography>
      <Grid container spacing={4}>
        {/* Left Section: Products */}
        <Grid item xs={12} md={7}>
          {cartItems.map((item) => (
            <Card
              key={`${item.id}-${item.color}-${item.model}`}
              sx={{
                display: "flex",
                alignItems: "center",
                marginBottom: 2,
                padding: 1,
                border: "1px solid #D9D9D9",
                borderRadius: 2,
                backgroundColor: "transparent",
                height: 155,
              }}
            >
              <CardMedia
                component="img"
                image={item.image}
                alt={item.name}
                sx={{ width: 80, height: 80, marginRight: 2 }}
              />
              <Box sx={{ flex: 1 }}>
                <Typography variant="h6" sx={{ fontSize: "1.1rem" }}>
                  {item.name}
                </Typography>
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
                  updateQuantity(
                    item.id,
                    item.color,
                    item.model,
                    Math.max(item.quantity - 1, 1)
                  )
                }
                sx={{ color: "white" }}
              >
                <Remove />
              </IconButton>
              
              <TextField
                value={item.quantity}
                size="small"
                sx={{
                  width: 70,
                  "& input": {
                    textAlign: "center",
                    color: "white",      // Ensures the input text is white
                  },
                  "& .MuiOutlinedInput-root": {
                    "& fieldset": {
                      borderColor: "white", // Normal border
                    },
                    "&:hover fieldset": {
                      borderColor: "white", // Hover border
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "white", // Focused border
                    },
                  },
                }}
                inputProps={{
                  type: "number",
                  min: 1,
                }}
                onChange={(e) =>
                  updateQuantity(
                    item.id,
                    item.color,
                    item.model,
                    Math.max(Number(e.target.value), 1)
                  )
                }
              />
              
              <IconButton
                size="small"
                onClick={() =>
                  updateQuantity(
                    item.id,
                    item.color,
                    item.model,
                    item.quantity + 1
                  )
                }
                sx={{ color: "white" }}
              >
                <Add />
              </IconButton>              
              </Box>
              </Box>
              <IconButton
                onClick={() => removeFromCart(item.id, item.color, item.model)}
                sx={{ color: "white" }}
              >
                <Delete />
              </IconButton>
            </Card>
          ))}
        </Grid>

        {/* Right Section: Overview */}
        <Grid item xs={12} md={5}>
          <Box
            sx={{
              padding: 3,
              border: "1px solid #D9D9D9",
              borderRadius: 2,
              backgroundColor: "transparent",
            }}
          >
            <Typography variant="h6" gutterBottom>
              Overview
            </Typography>
            {cartItems.map((item) => (
              <Box
                key={`${item.id}-${item.color}-${item.model}`}
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                }}
              >
                <Typography variant="body2">
                  {item.quantity}x {item.name}
                </Typography>
                <Typography variant="body2">
                  €{(item.price * item.quantity).toFixed(2)}
                </Typography>
              </Box>
            ))}
            <Typography
              variant="body2"
              sx={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: 1,
              }}
            >
              <span>Postage Cost:</span>
              <span>€{postageCost.toFixed(2)}</span>
            </Typography>
            <Divider sx={{ my: 2 }} />
            <Typography
              variant="h6"
              sx={{
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              <span>Still to be paid:</span>
              <span>€{finalAmount.toFixed(2)}</span>
            </Typography>
            <Button
              variant="contained"
              fullWidth
              sx={{ marginTop: 2, backgroundColor: 'transparent', border: 'white 1px solid'}}
              onClick={() => alert("Purchase completed!")}
            >
              Buy
            </Button>
            <Box
              sx={{ display: "flex", justifyContent: "center", marginTop: 2, gap: 2 }}
            >
              <CardMedia
                component="img"
                image="https://www.cardgate.com/wp-content/uploads/iDEAL-302x266.png"
                alt="iDEAL"
                sx={{ width: 50, height: 40 }}
              />
              <CardMedia
                component="img"
                image="https://www.emerce.nl/content/uploads/2022/06/logo-500x500-1.jpeg"
                alt="Visa"
                sx={{ width: 50, height: 30 }}
              />
              <CardMedia
                component="img"
                image="https://webshoptiger.com/wp-content/uploads/2023/09/American-Express-Color.png"
                alt="American Express"
                sx={{ width: 50, height: 30 }}
              />
              <CardMedia
                component="img"
                image="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTd7WTi09ocb0cv81W-PvbGbxbdfQVZJ7eGAA&s"
                alt="MasterCard"
                sx={{ width: 50, height: 30 }}
              />
            </Box>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

export default Cart;