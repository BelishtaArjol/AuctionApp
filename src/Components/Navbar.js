//this is the component that renders the navbar
import styled from "styled-components";
import TemporaryDrawer from "./Sidebar";
import { useNavigate } from "react-router-dom";
//The styling is based on material ui, styled components and inline styling 

const Header = styled.div`
  background-color: orange;
  z-index: 100;
  color: white;
  display: flex;
  justify-content: space-between;
  flex-direction: row;
  align-items: center;
  position: sticky;
  top: 1px;
  padding: 10px;
  font-size: 25px;
  font-weight: bold;
  box-shadow: 0 3px 6px 0 #555;
`;
const AppName = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const AuctionIcon = styled.img`
  width: 48px;
  height: 48px;
  margin: 15px;
`;

const Navbar = () => {
  const navigate = useNavigate();

  const Navigate = () => {
    navigate("/");
  };
  
  return (
    <Header>
      <AuctionIcon
        src="/auction-app/auction-icon.svg"
        onClick={Navigate}
        style={{ cursor: "pointer" }}
      ></AuctionIcon>
      <AppName>
        <div
          style={{
            alignItems: "center",
            fontFamily: "cursive",
          }}
        >
          Auction App
        </div>
      </AppName>
      <TemporaryDrawer />
    </Header>
  );
};

export default Navbar;
