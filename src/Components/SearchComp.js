import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import ProductComponent from "./ProductComponent";
//This is the component that renders the product cards on the dashbaord.
//The styling is based on styled components

const SearchBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: 10px 10px;
  border-radius: 6px;
  margin: 1rem auto;
  border: 2px solid black;
  width: 22%;
  background-color: white;
`;

const SearchIcon = styled.img`
  width: 32px;
  height: 32px;
`;

const SearchInput = styled.input`
  color: black;
  font-size: 16px;
  font-weight: bold;
  border: none;
  outline: none;
  margin-left: 15px;
`;
const ProductListContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  padding: 30px;
  gap: 25px;
  justify-content: space-evenly;
`;

const SearchComp = () => {
  const token = localStorage.getItem("token");
  const [money, setMoney] = useState(null);

  //here we make an authenticated request to retrieve the logged in user wallet
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/get-money/`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setMoney(response.data.money))
      .then(console.log(money));
  }, []);

  //in this piece of code we retrieve the products and sort them ascending to the time_left, also filter them to show only those products with the time left greater than 0
  const [products, setProducts] = useState([]);
  useEffect(() => {
    axios
      .get(`http://127.0.0.1:8000/product/`)
      .then((response) => setProducts(response.data));
  }, []);

  products.sort((a, b) => {
    return a.time_left - b.time_left;
  });

  const prods = products.filter((prod) => prod.time_left > 0);

  //this is the function used to implement the search funcionality, and then called when we map the list of products to be shown on the dashboard
  const [searchQuery, updateSearchQuery] = useState("");
  const [searchParam] = useState(["name"]);
  const search = (products) => {
    return products.filter((item) => {
      return searchParam.some((newItem) => {
        return (
          item[newItem]
            .toString()
            .toLowerCase()
            .indexOf(searchQuery.toLowerCase()) > -1
        );
      });
    });
  };
  // let a = -1;

  // let offers = [];

  // for (let i = 0; i < products.length; i++) {
  //   offers.push(products[i].offers);
  // }

  // let max = [];

  // for (let j = 0; j < offers.length; j++) {
  //   let max1 = offers[j][0]?.offered_price ? offers[j][0]?.offered_price : 0;
  //   for (let i = 1; i < offers[j].length; i++) {
  //     if (max1 < offers[j][i].offered_price) {
  //       max1 = offers[j][i].offered_price;
  //     }
  //   }
  //   max.push(max1);
  // }

  return (
    <>
      <div
        style={{
          fontSize: 20,
          fontWeight: "bold",
          fontFamily: "cursive",
          margin: 15,
        }}
      >
        Your Current Wallet: {money}
      </div>
      <SearchBox style={{ color: "black" }}>
        <SearchIcon src="/auction-app/search-icon.svg" />
        <SearchInput
          placeholder="Search Product"
          style={{ fontFamily: "cursive" }}
          value={searchQuery}
          onChange={(e) => updateSearchQuery(e.target.value)}
        />
      </SearchBox>
      <ProductListContainer>
        {search(prods).map((product, index) => (
          <ProductComponent
            key={index}
            product={product}
            // max={max}
            // index={++a}
          />
        ))}
      </ProductListContainer>
    </>
  );
};

export default SearchComp;
