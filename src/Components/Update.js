import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
//The styling is based on material ui only

const Update = ({ product }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  //we use this component to update certain product details, according to the permission of that matching author. So we use the local states with the actual default values, to enter and upload
  const [name, setName] = useState(product?.name);
  const [min_price, setMinPrice] = useState(product?.min_price);
  const [description, setDescription] = useState(product?.description);
  const [product_year, setProductYear] = useState(product?.product_year);
  const [time_remaining, setTimeRemaining] = useState(product?.time_remaining);
  const [quality, setQuality] = useState(product?.quality);

  //getting the token from the local storage, we make an authenticated request to update certain details and send the payload to the backend
  const token = localStorage.getItem("token");
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .put(
        `http://127.0.0.1:8000/product/${id}/`,
        {
          name: name,
          min_price: min_price,
          description: description,
          time_remaining: time_remaining,
          product_year: product_year,
          quality: quality,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (res) {
        alert(res.data.message);
        navigate("/");
      })
      .catch(function (err) {
        console.log(err);
        let error = err.request.response.split('"');
        if (error.length > 5) {
          alert(error[5]);
        } else if (error.length > 3) {
          alert(error[3]);
        } else {
          alert(err);
        }
      });
  };

  //This is the same array used to the NewProduct component, to be maped for the quality selection
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
      <Container
        maxWidth="sm"
        sx={{
          minHeight: "90vh",
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
            Update Product Details
          </Typography>
          <Box component="form" mt={2} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  required
                  label="Product Name"
                  defaultValue={product?.name}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  required
                  label="Starting Bid"
                  defaultValue={product?.min_price}
                  value={min_price}
                  onChange={(e) => setMinPrice(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="text"
                  required
                  label="Description"
                  defaultValue={product?.description}
                  multiline
                  maxRows={4}
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  required
                  label="Production Year"
                  defaultValue={product?.product_year}
                  value={product_year}
                  onChange={(e) => setProductYear(e.target.value)}
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  type="number"
                  required
                  label="Time Remaining"
                  defaultValue={product?.time_remaining}
                  value={time_remaining}
                  onChange={(e) => setTimeRemaining(e.target.value)}
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  id="outlined-select-qualities"
                  required
                  select
                  label="Select quality"
                  defaultValue={product?.quality}
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
              <Grid item xs={12}>
                <Button type="submit" variant="contained">
                  Update
                </Button>
              </Grid>
            </Grid>
          </Box>
        </Paper>
      </Container>
    </>
  );
};

export default Update;
