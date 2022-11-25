import { Container, Typography } from "@mui/material";
import React from "react";
import styles from "./product.module.scss";

const Product = () => {
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
