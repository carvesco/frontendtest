import React, { useState } from "react";
import {
  Container,
  Typography,
  Paper,
  Modal,
  Box,
  Button,
} from "@mui/material";
import styles from "./productItem.module.scss";
import axios from "axios";

const modalStyle = {
  position: "absolute" as "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid",
  borderColor: "primary.main",
  borderRadius: 3,
  boxShadow: 24,
  p: 4,
};
const baseURL = "http://localhost:4000/products";

const ProductItem = (props: any) => {
  const [detailsModal, setDetailsModal] = useState<boolean>(false);
  console.log(props);

  const closeDetailsModal = () => {
    setDetailsModal(false);
  };

  const openDetailsModal = () => {
    setDetailsModal(true);
  };

  const deleteProduct = async () => {
    await axios
      .delete(
        `${baseURL}/props._id`
      )
      .then((response) => {
        console.log(response);
      });
  };
  return (
    <>
      <Paper
        onClick={openDetailsModal}
        elevation={6}
        sx={{
          width: "300px",
          height: "300px",
          padding: 3,
          backgroundColor: "#76bd2e",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          margin: "auto",
          cursor: "pointer",
          ":hover": {
            width: "350px",
            height: "350px",
          },
        }}
      >
        <Typography variant="h2" sx={{ color: "#476528", marginBottom: 2 }}>
          {props.prdct.name}
        </Typography>
        <img
          className={styles.product_image}
          src={props.prdct.image}
          alt="product"
        />
        <Typography variant="h3" sx={{ color: "#c1f58d" }}>
          {props.prdct.price}
        </Typography>
        <Modal
          open={detailsModal}
          onClose={closeDetailsModal}
          aria-labelledby="create-modal-title"
          aria-describedby="create-modal-description"
        >
          <Box sx={modalStyle}>
            <Typography variant="h2" sx={{ color: "#476528", marginBottom: 2 }}>
              {props.prdct.name}
            </Typography>
            <img
              className={styles.product_image_details}
              src={props.prdct.image}
              alt="product"
            />
            <Typography variant="h4" sx={{ color: "#476528", marginBottom: 2 }}>
              {props.prdct.description}
            </Typography>
            <Typography variant="h3" sx={{ color: "#476528", marginBottom: 2 }}>
              {props.prdct.price}
            </Typography>
            <Box sx={{ }}>
              <Button
                variant="outlined"
                sx={{ mt: 5 }}
                onClick={closeDetailsModal}
              >
                ClOSE
              </Button>
              <Button
                variant="contained"
                sx={{ mt: 5, ml: 3 }}
                onClick={deleteProduct}
              >
                DELETE
              </Button>
            </Box>
          </Box>
        </Modal>
      </Paper>
    </>
  );
};

export default ProductItem;
