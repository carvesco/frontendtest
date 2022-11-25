import { Box, Typography, Button } from "@mui/material";
import React from "react";
import styles from "./signupCard.module.scss";

const SignupCard = (props: any) => {
  return (
    <Box className={styles.card_container}>
      <Typography variant="h4" className={styles.title}>SIGNUP</Typography>
      <Box className={styles.input_container}>
        <Typography variant="h6" className={styles.input_label}>
          EMAIL
        </Typography>
        <input className={styles.input_field} />
      </Box>
      <Box className={styles.input_container}>
        <Typography variant="h6" className={styles.input_label}>
          NAME
        </Typography>
        <input className={styles.input_field} />
      </Box>
      <Box className={styles.input_container}>
        <Typography variant="h6" className={styles.input_label}>
          PASSWORD
        </Typography>
        <input className={styles.input_field} />
      </Box>
      <p className={styles.login_text}>
        alredy have an account, login
        <p className={styles.login_link} onClick={props?.showlogin}>
          HERE
        </p>
      </p>
      <Button variant="contained" className={styles.button}>
        SIGNUP
      </Button>
    </Box>
  );
};

export default SignupCard;
