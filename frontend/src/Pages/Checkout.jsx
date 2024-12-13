import React, { useState } from "react";
import {
  Box,
  Typography,
  Button,
  TextField,
  RadioGroup,
  FormControlLabel,
  Radio,
} from "@mui/material";
import { useCart } from "../components/CartContext.jsx";

function Checkout() {
  const { cartItems } = useCart();
  const [paymentMethod, setPaymentMethod] = useState("");
  const [userData, setUserData] = useState({
    fullName: "",
    email: "",
    address: "",
    cardNumber: "",
    expirationDate: "",
    cvv: "",
    bankAccount: "",
  });
  const [success, setSuccess] = useState(false);

  const handleInputChange = (e) => {
    setUserData({ ...userData, [e.target.name]: e.target.value });
  };

  const handlePaymentChange = (e) => {
    setPaymentMethod(e.target.value);
  };

  const handleSubmit = () => {
    if (
      !userData.fullName ||
      !userData.email ||
      !userData.address ||
      !paymentMethod ||
      (paymentMethod !== "ideal" &&
        (!userData.cardNumber || !userData.expirationDate || !userData.cvv)) ||
      (paymentMethod === "ideal" && !userData.bankAccount)
    ) {
      alert("Please fill in all required fields.");
    } else {
      setSuccess(true);
    }
  };

  if (success) {
    return (
      <Box sx={{ padding: 4, textAlign: "center" }}>
        <Typography variant="h4" sx={{ color: "white" }}>
          Bought!
        </Typography>
        <Typography variant="body2" sx={{ marginTop: 2, color: "white" }}>
          Thank you for your purchase, {userData.fullName}!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ padding: 4 }}>
      <Typography variant="h4" gutterBottom sx={{ color: "white" }}>
        Checkout
      </Typography>

      <Typography variant="h6" sx={{ color: "white" }}>
        Billing Information
      </Typography>
      <TextField
        label="Full Name"
        name="fullName"
        value={userData.fullName}
        onChange={handleInputChange}
        fullWidth
        sx={textFieldStyles}
      />
      <TextField
        label="Email"
        name="email"
        value={userData.email}
        onChange={handleInputChange}
        fullWidth
        sx={textFieldStyles}
      />
      <TextField
        label="Address"
        name="address"
        value={userData.address}
        onChange={handleInputChange}
        fullWidth
        sx={{ ...textFieldStyles, marginBottom: 4 }}
      />

      <Typography variant="h6" sx={{ color: "white" }}>
        Payment Method
      </Typography>
      <RadioGroup value={paymentMethod} onChange={handlePaymentChange}>
        <FormControlLabel
          value="ideal"
          control={<Radio sx={radioStyles} />}
          label="iDEAL"
          sx={labelStyles}
        />
        <FormControlLabel
          value="visa"
          control={<Radio sx={radioStyles} />}
          label="Visa"
          sx={labelStyles}
        />
        <FormControlLabel
          value="amex"
          control={<Radio sx={radioStyles} />}
          label="American Express"
          sx={labelStyles}
        />
        <FormControlLabel
          value="mastercard"
          control={<Radio sx={radioStyles} />}
          label="MasterCard"
          sx={labelStyles}
        />
      </RadioGroup>

      {paymentMethod !== "ideal" && paymentMethod && (
        <>
          <TextField
            label="Card Number"
            name="cardNumber"
            value={userData.cardNumber}
            onChange={handleInputChange}
            fullWidth
            sx={textFieldStyles}
          />
          <TextField
            label="Expiration Date (MM/YY)"
            name="expirationDate"
            value={userData.expirationDate}
            onChange={handleInputChange}
            fullWidth
            sx={textFieldStyles}
          />
          <TextField
            label="CVV"
            name="cvv"
            value={userData.cvv}
            onChange={handleInputChange}
            fullWidth
            sx={textFieldStyles}
          />
        </>
      )}

      {paymentMethod === "ideal" && (
        <TextField
          label="Bank Account Number"
          name="bankAccount"
          value={userData.bankAccount}
          onChange={handleInputChange}
          fullWidth
          sx={textFieldStyles}
        />
      )}

      <Button
        variant="contained"
        fullWidth
        sx={{
          marginTop: 4,
          backgroundColor: "transparent",
          border: "white 1px solid",
          color: "white",
        }}
        onClick={handleSubmit}
      >
        Complete Purchase
      </Button>
    </Box>
  );
}

export default Checkout;

const textFieldStyles = {
  marginBottom: 2,
  "& label": {
    color: "white",
  },
  "& input": {
    color: "white",
  },
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "white",
    },
    "&:hover fieldset": {
      borderColor: "white",
    },
    "&.Mui-focused fieldset": {
      borderColor: "white",
    },
  },
};

const radioStyles = {
  color: "white",
  "&.Mui-checked": {
    color: "white",
  },
};

const labelStyles = {
  color: "white",
};
