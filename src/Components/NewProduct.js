//This component does the "create" functionality of the application, so wee add a new product as an authenticated user
import Navbar from "./Navbar";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import {
  Container,
  Paper,
  Box,
  Button,
  Grid,
  TextField,
  Typography,
  MenuItem,
} from "@mui/material";
//The styling is based on material ui

const NewProduct = () => {
  const navigate = useNavigate();
  //We use local state to get the product attributes that we want to send to the backend
  const [name, setName] = useState("");
  const [min_price, setMinPrice] = useState();
  const [description, setDescription] = useState();
  const [product_year, setProductYear] = useState();
  const [time_remaining, setTimeRemaining] = useState();
  const [quality, setQuality] = useState();
  const [image, setImage] = useState([]);

  const token = localStorage.getItem("token");

  const onImageChange = (e) => {
    setImage([btoa(...e.target.files)]);
  };

  //This function does the post request of the new product, with authentication and then we tell it to take use to the dashboard
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://127.0.0.1:8000/product/`,
        {
          name: name,
          min_price: min_price,
          description: description,
          time_remaining: time_remaining,
          product_year: product_year,
          quality: quality,
          image: image,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function () {
        navigate("/");
      })
      .catch(function () {
        alert("Something went wrong, please check your input data!");
      });
  };
  //We map this array to choose the quality of the product that is to be uploaded
  const qualities = [
    {
      value: "Good enough",
      label: "Good enough",
    },
    {
      value: "Good",
      label: "Good",
    },
    {
      value: "Very good",
      label: "Very good",
    },
    {
      value: "Excellent",
      label: "Excellent",
    },
  ];

  return (
    <>
      <Navbar />
      <Container
        maxWidth="xs"
        sx={{
          minHeight: "100vh",
          display: "grid",
          placeItems: "center",
          p: 2,
        }}
      >
        <Paper
          elevation={4}
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            p: 2,
          }}
        >
          <Typography variant="h5" component="h2">
            New Auction
          </Typography>
          <Box component="form" mt={2} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Product Name"
                  type="text"
                  value={name}
                  required
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Starting Bid"
                  type="number"
                  required
                  value={min_price}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Description"
                  type="text"
                  multiline
                  maxRows={4}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Product Year"
                  type="number"
                  required
                  value={product_year}
                  onChange={(e) => setProductYear(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  label="Time Remaining"
                  type="number"
                  required
                  value={time_remaining}
                  onChange={(e) => setTimeRemaining(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-select-qualities"
                  select
                  label="Select quality"
                  helperText="Select product quality"
                  onChange={(e) => setQuality(e.target.value)}
                >
                  {qualities.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.label}
                    </MenuItem>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} sm={6}>
                <input
                  encoding="base64"
                  type="file"
                  multiple
                  accept="image/*"
                  onChange={onImageChange}
                ></input>
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained">
                  Create Auction
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default NewProduct;
