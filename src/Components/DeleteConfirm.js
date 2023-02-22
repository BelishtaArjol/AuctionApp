//This is the component that does the delete funcionality of a specific product
import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
//All the styling is based on material-ui

export default function AlertDialog() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const token = localStorage.getItem("token"); // here we take the of the authenticated user from the local storage, to make authenticated requests
  
  // here we use axios library to make this delete authenticated request
  const handleDelete = () => {
    axios
      .delete(`http://127.0.0.1:8000/product/${id}/`, {
        headers: {
          authorization: `Bearer ${token}`,
        },
      })
      .then(navigate("/"), navigate(0));
  };

  return (
    <div>
      <Button variant="outlined" onClick={handleClickOpen}>
        Delete Product
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            Are you sure you want to delete this product?
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          {/*This modal will ask us if we're sure about the delete action*/}
          <Button onClick={handleClose}>Disagree</Button>
          <Button onClick={handleDelete} autoFocus>
            Agree
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
