import { Box, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import styles from "./loginCard.module.scss";
import { useNavigate } from "react-router-dom";

const LoginCard = (props:any) => {
  const navigate = useNavigate()
  const loggedin = () =>{
    navigate("/products")
  }
  return (
    <Box className={styles.card_container}>
         <Typography variant="h4" className={styles.title}>LOGIN</Typography>
      <Box className={styles.input_container}>
        <Typography variant="h6" className={styles.input_label}>
          EMAIL
        </Typography>
        <input className={styles.input_field} />
      </Box>
      <Box className={styles.input_container}>
        <Typography variant="h6" className={styles.input_label}>
          PASSWORD
        </Typography>
        <input className={styles.input_field} />
      </Box>
      <p className={styles.signup_text}>
        Dont have an account, signup<p className={styles.signup_link} onClick={props?.showsignup}>HERE</p>
      </p>
      <Button variant="contained" className={styles.button} onClick={loggedin}>
        LOGIN
      </Button>
    </Box>
  );
};

export default LoginCard;
