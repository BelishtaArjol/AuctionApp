import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Grid, TextField, Button } from "@mui/material";
import axios from "axios";
import styled from "styled-components";
import Navbar from "./Navbar";
import Update from "./Update";
import DeleteConfirm from "./DeleteConfirm";
//The styling is based on material ui and styled components

const Container = styled.div`
  display: flex;
  flex-direction: row;
  padding: 20px 30px;
  justify-content: center;
  border-bottom: 1px solid lightgray;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 350px;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`;
const ProductName = styled.span`
  font-size: 22px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
  & span {
    opacity: 0.8;
  }
`;
const ProductInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  width: 100%;
  overflow: hidden;
  margin: 4px 0;
  text-transform: capitalize;
  text-overflow: ellipsis;

  & span {
    opacity: 0.5;
  }
`;

const ProductInfoComponent = () => {
  const navigate = useNavigate();
  const { id } = useParams(); //useParamas is used to retrieve the route parameters from the url, in our case the id

  const [productInfo, setProductInfo] = useState(null);
  const [offered_price, setOfferedPrice] = useState(0);
  const [isShown, setIsShown] = useState(false);

  //this function handles the state of a modal shown to update details of the product, always if you are the author that has uploaded that certain product
  const handleClick = () => {
    setIsShown((current) => !current);
  };

  const token = localStorage.getItem("token"); //as in some other components, we fill this variable with the token retrieved from the local storage

  //username is a variable filled with the username retrieved from local storage. It is used to determine if it is the author that has clicked to one of its certain products, or it is a random user
  let username = "";

  if (localStorage.getItem("username") !== null) {
    username = localStorage.getItem("username");
  }

  //useEffect hook is used to make a get request to retrieve information and details about the product. We use an empty dependency array to stop the infinite calls.
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/product/${id}/`)
      .then((response) => setProductInfo(response.data));
  }, []);

  const author = productInfo?.author;

  //this function handles the submit of a particular bid to a specific product by a particular owner, except from its author/owner. It makes an authenticated post request to post that bid/offered price
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .post(
        `http://127.0.0.1:8000/offer/`,
        {
          offered_price: offered_price,
          to_product: id,
        },
        {
          headers: {
            authorization: `Bearer ${token}`,
          },
        }
      )
      .then(function (response) {
        alert(response.data.message);
      })
      .catch(function (error) {
        if (error.response.data.non_field_errors) {
          console.log(error);
          alert(error.response.data.non_field_errors[0]);
        } else if (error.response.data.error) {
          alert(error.response.data.error);
        }
      });
  };

  return (
    <>
      <Navbar />
      <Container>
        {productInfo && (
          <>
            <CoverImage src={productInfo?.image} alt={productInfo?.title} />
            <InfoColumn>
              <ProductName>
                <em>{productInfo?.name}</em>
              </ProductName>
              <ProductInfo>
                Year: <em>{productInfo?.product_year}</em>
              </ProductInfo>
              <ProductInfo>
                Author: <em>{productInfo?.author}</em>
              </ProductInfo>
              <ProductInfo>
                Base Price: <em>{productInfo?.min_price}</em>
              </ProductInfo>
              <ProductInfo>
                Highest Bid: <em>{productInfo?.highest_bid}</em>
              </ProductInfo>
              <ProductInfo>
                First Time Remaining Given:{" "}
                <em>{productInfo?.time_remaining}</em>
              </ProductInfo>
              <ProductInfo>
                Time Left: <em>{productInfo?.time_left} Days</em>
              </ProductInfo>
              <ProductInfo>
                Quality: <em>{productInfo?.quality}</em>
              </ProductInfo>
              <ProductInfo>
                Description: <em>{productInfo?.description}</em>
              </ProductInfo>
              <br />
              {/*If the product author matches the username taken from local storage, that user has the author permisson to edit and delete that product*/}
              {author === username && (
                <>
                  <ProductInfo>
                    <DeleteConfirm />
                  </ProductInfo>

                  <ProductInfo>
                    <Button
                      variant="outlined"
                      style={{
                        cursor: "pointer",
                      }}
                      onClick={handleClick}
                    >
                      Update Details
                    </Button>
                  </ProductInfo>
                  {isShown && <Update product={productInfo} />}
                </>
              )}
              {/*This is the opposite case from that above. When the product author doesn't match the username taken from the local storage, that user has the permisson to enter a bid*/}
              {author !== username && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextField
                      type="number"
                      label="Your Bid Goes Here"
                      value={offered_price}
                      onChange={(e) => setOfferedPrice(e.target.value)}
                    />
                  </Grid>
                  <br />
                  <Grid item xs={12} sm={6}>
                    <Button
                      type="submit"
                      variant="contained"
                      onClick={handleSubmit}
                    >
                      Bid
                    </Button>
                  </Grid>
                </>
              )}
            </InfoColumn>
          </>
        )}
      </Container>
    </>
  );
};
export default ProductInfoComponent;
