import React from "react";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";
//The styling is based on styled components

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px;
  width: 280px;
  box-shadow: 0 3px 10px 0 #aaa;
  cursor: pointer;
`;
const CoverImage = styled.img`
  object-fit: cover;
  height: 362px;
`;
const ProductName = styled.span`
  font-size: 18px;
  font-weight: 600;
  color: black;
  margin: 15px 0;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;
const InfoColumn = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;
const ProductInfo = styled.span`
  font-size: 16px;
  font-weight: 500;
  color: black;
  white-space: nowrap;
  overflow: hidden;
  text-transform: capitalize;
  text-overflow: ellipsis;
`;

const ProductComponent = (props) => {
  const navigate = useNavigate();

  const { name, time_left, highest_bid, image, id } = props.product; //here we deconstruct the properties of the product we get from the backend  

  //This component displays a product as a card, to be shown on the dashboard
  //After being clicked, the card leads to a separate page, showing some more details about the product clicked. 
  return (
    <ProductContainer
      onClick={() => {
        navigate(`/info/${id}`);
      }}
    >
      <CoverImage src={image} />
      <ProductName>{name}</ProductName>
      <InfoColumn>
        <ProductInfo>Highest Bid : {highest_bid} $</ProductInfo>
        <ProductInfo>Time Left: {time_left} days </ProductInfo>
      </InfoColumn>
    </ProductContainer>
  );
};

export default ProductComponent;
