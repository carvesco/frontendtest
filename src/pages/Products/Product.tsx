import {
  Container,
  Typography,
  Button,
  Grid,
  Modal,
  Box,
  TextField,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import LogoutIcon from '@mui/icons-material/Logout';
import styles from "./product.module.scss";
import { useAuth } from "../../hooks/useAuth";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import ProductItem from "../../components/ProductItem/productItem";
import { useNavigate } from "react-router-dom";

const baseURL = "http://localhost:4000/products";

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

const Product = () => {
  const navigate = useNavigate();
  const { token, setToken } = useAuth();
  const [products, setProducts] = useState([]);
  const [createModal, setCreateModal] = useState<boolean>(false);
  const [createData, setCreateData] = useState({
    name: "",
    description: "",
    price: "",
    image: "",
  });
  const closeCreateModal = () => {
    setCreateModal(false);
  };
  const openCreateModal = () => {
    setCreateModal(true);
  };
  //console.log("jwt:", token);
  const addProduct = async () => {
    await axios
      .post(
        `${baseURL}`,
        {
          name: createData.name,
          price: Number(createData.price),
          description: createData.description,
          image: createData.image,
        },
        { headers: { "auth-token": token } }
      )
      .then((response) => {
        console.log(response);
        /*if (response?.data) {
          setProducts(response?.data);
        }*/
      });
  };

  const getProducts = async () => {
    await axios
      .get(`${baseURL}`, { headers: { "auth-token": token } })
      .then((response) => {
        console.log(response);
        if (response?.data) {
          setProducts(response?.data);
        }
      });
  };

  useEffect(() => {
    getProducts();
  }, [token]);

  const handleSubmit = () => {
    addProduct();
    closeCreateModal();
    getProducts();
  };

  return (
    <>
      <div className={styles.background}>
        <div className={styles.container}>
          <Typography
            variant="h2"
            className={styles.title}
            sx={{ marginBottom: "4rem" }}
          >
            PRODUCTS
          </Typography>
          <div className={styles.buttons}>
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              sx={{
                backgroundColor: "#76bd2e",
                width: "150px",
                height: "40px",
              }}
              onClick={openCreateModal}
            >
              NEW
            </Button>
            <Button
              variant="contained"
              startIcon={<LogoutIcon />}
              sx={{
                backgroundColor: "#76bd2e",
                width: "150px",
                height: "40px",
                marginLeft:5
              }}
              onClick={()=>{
                setToken("");
                navigate("/");
              }}
            >
              LOG OUT
            </Button>
          </div>
          {products && (
            <Grid container rowSpacing={10}>
              {products.map((item, i) => (
                <Grid item xs={4}>
                  <ProductItem prdct={item} key={i} />
                </Grid>
              ))}
            </Grid>
          )}
        </div>
      </div>
      {/** Modal for creating  groups */}
      <Modal
        open={createModal}
        onClose={closeCreateModal}
        aria-labelledby="create-modal-title"
        aria-describedby="create-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography
            id="create-modal-title"
            variant="h6"
            component="h2"
            color={"primary"}
          >
            New Product
          </Typography>
          <TextField
            id="outlined-multiline-flexible"
            label="Name"
            sx={{ width: "100%", mt: 3 }}
            multiline
            maxRows={4}
            value={createData?.name}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCreateData((prev: any) => ({
                ...prev,
                name: e.target.value,
              }));
            }}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Price"
            sx={{ width: "100%", mt: 3 }}
            multiline
            maxRows={4}
            value={createData?.price}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCreateData((prev: any) => ({
                ...prev,
                price: e.target.value,
              }));
            }}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Description"
            sx={{ width: "100%", mt: 3 }}
            multiline
            rows={8}
            value={createData?.description}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCreateData((prev: any) => ({
                ...prev,
                description: e.target.value,
              }));
            }}
          />
          <TextField
            id="outlined-multiline-flexible"
            label="Image Url"
            sx={{ width: "100%", mt: 3 }}
            multiline
            maxRows={4}
            value={createData?.image}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              setCreateData((prev: any) => ({
                ...prev,
                image: e.target.value,
              }));
            }}
          />
          <Box sx={{ position: "relative", left: "60%" }}>
            <Button
              variant="outlined"
              sx={{ mt: 5 }}
              onClick={closeCreateModal}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              sx={{ mt: 5, ml: 3 }}
              onClick={handleSubmit}
            >
              Confirm
            </Button>
          </Box>
        </Box>
      </Modal>
    </>
  );
};

export default Product;
