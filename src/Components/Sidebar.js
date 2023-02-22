import * as React from "react";
import { useState } from "react";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import InboxIcon from "@mui/icons-material/MoveToInbox";
import { useNavigate } from "react-router-dom";
//The styling is based on material ui and inline style

export default function TemporaryDrawer() {
  const navigate = useNavigate();

  const [state, setState] = useState({
    right: false,
  });

  //in this function we determine the way we open the sidebar, so by pressing certain buttons on our keyboard
  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setState({ ...state, [anchor]: open });
  };

  //the functions above are used to determine the navigatin url, based on certain actions and buttons, also handles the logout functionality
  const navigateTo = () => {
    navigate("/login");
  };

  const goLogin = () => {
    navigate("/login");
  };

  const goRegister = () => {
    navigate("/register");
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    alert("You successfully logged out!");
    navigateTo();
  };

  //in the rendering below we determine which buttons are to be shown, according to the fact of a user being logged in or not. The control we make for this is the token that exist or not in the local storage
  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <List>
        {["Sell a product"].map((text, index) => (
          <ListItem key={text} disablePadding>
            <ListItemButton>
              <ListItemIcon>
                <InboxIcon />
              </ListItemIcon>
              <ListItemText
                primary={text}
                onClick={() => {
                  if (localStorage.getItem("token")) {
                    navigate("/newproduct");
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  } else {
                    navigate("/login");
                  }
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {!localStorage.getItem("token") && (
          <ListItem key={"Login"} disablePadding>
            <ListItemButton>
              <ListItemText primary={"Login"} onClick={goLogin} />
            </ListItemButton>
          </ListItem>
        )}
        {!localStorage.getItem("token") && (
          <ListItem key={"Register"} disablePadding>
            <ListItemButton>
              <ListItemText primary={"Register"} onClick={goRegister} />
            </ListItemButton>
          </ListItem>
        )}
        {localStorage.getItem("token") &&
          ["Logout"].map((text, index) => (
            <ListItem key={text} disablePadding>
              <ListItemButton>
                <ListItemText primary={text} onClick={handleLogout} />
              </ListItemButton>
            </ListItem>
          ))}
      </List>
    </Box>
  );

  return (
    <div>
      {["right"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button
            sx={{ fontSize: 20, fontFamily: "cursive", color: "white" }}
            onClick={toggleDrawer(anchor, true)}
          >
            Profile
          </Button>
          <Drawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
          >
            {/*Here we render the list of buttons determined above*/}
            {list(anchor)}
          </Drawer>
        </React.Fragment>
      ))}
    </div>
  );
}
