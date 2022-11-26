import { Container, Typography } from "@mui/material";
import React,{useContext} from "react";
import styles from "./product.module.scss";
import { useAuth } from "../../hooks/useAuth"; 

const Product = () => {
  const {token, setToken} = useAuth()
  console.log("jwt:",token)
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <Typography variant="h2" className={styles.title} sx={{marginBottom:"4rem"}}>
          PRODUCTS
        </Typography>
      </div>
    </div>
  );
};

export default Product;
