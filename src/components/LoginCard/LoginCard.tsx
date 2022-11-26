import { Box, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import styles from "./loginCard.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

const baseURL = "http://localhost:4000/users";

const LoginCard = (props: any) => {
  const navigate = useNavigate();
  const {token, setToken} = useAuth()
  const [loginError, setLoginError] = useState(false);
  const [logginInfo, setLogginInfo] = useState<{
    email: string;
    password: string;
  }>({
    email: "",
    password: "",
  });
  const loggedin = async () => {
    await axios
      .post(`${baseURL}/login`, {
        email: logginInfo.email,
        password: logginInfo.password,
      })
      .then((response) => {
        if (response?.data?.token) {
          setToken(response.data.token)
          navigate("/products");
          setLoginError(false);
        } else {
          console.log(response);
          console.log(
            "no se ecnontro usuario registrado o contraseña incorrecta"
          );
          setLoginError(true);
        }
      });
  };
  return (
    <Box className={styles.card_container}>
      <Typography
        variant="h4"
        className={styles.title}
        sx={{ marginBottom: "2rem" }}
      >
        LOGIN
      </Typography>
      {loginError && (
        <p className={styles.error_text}>
          Account not found or incorrect password
        </p>
      )}

      <Box className={styles.input_container}>
        <Typography variant="h6" className={styles.input_label}>
          EMAIL
        </Typography>
        <input
          className={styles.input_field}
          onChange={(e) => {
            setLogginInfo((curr) => ({ ...curr, email: e.target.value }));
          }}
        />
      </Box>
      <Box className={styles.input_container}>
        <Typography variant="h6" className={styles.input_label}>
          PASSWORD
        </Typography>
        <input
          className={styles.input_field}
          onChange={(e) => {
            setLogginInfo((curr) => ({ ...curr, password: e.target.value }));
          }}
        />
      </Box>
      <p className={styles.signup_text}>
        Dont have an account, signup
        <p className={styles.signup_link} onClick={props?.showsignup}>
          HERE
        </p>
      </p>
      <Button variant="contained" className={styles.button} onClick={loggedin}>
        LOGIN
      </Button>
    </Box>
  );
};

export default LoginCard;
