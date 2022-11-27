import { Box, Typography, Button } from "@mui/material";
import React, { useState } from "react";
import styles from "./signupCard.module.scss";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../../hooks/useAuth";

const baseURL = "http://localhost:4000/users";

const SignupCard = (props: any) => {
  const navigate = useNavigate();
  const {token, setToken} = useAuth()
  const [signUpError, setsignUpError] = useState(false);
  const [signUpInfo, setSignUpInfo] = useState<{
    email: string;
    name: string;
    password: string;
  }>({
    email: "",
    name: "",
    password: "",
  });

  const signUp = async () => {
    await axios
      .post(`${baseURL}`, {
        email: signUpInfo.email,
        name: signUpInfo.name,
        password: signUpInfo.password,
      })
      .then((response) => {
        if (response?.data?.token) {
          setToken(response.data.token)
          navigate("/products");
          setsignUpError(false);
        } else {
          console.log(response);
          console.log(" ya se encuentra registrado");
          setsignUpError(true);
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
        SIGNUP
      </Typography>
      {signUpError && (
        <p className={styles.error_text}>Acoount already created</p>
      )}
      <Box className={styles.input_container}>
        <Typography variant="h6" className={styles.input_label}>
          EMAIL
        </Typography>
        <input
          className={styles.input_field}
          onChange={(e) => {
            setSignUpInfo((curr) => ({ ...curr, email: e.target.value }));
          }}
        />
      </Box>
      <Box className={styles.input_container}>
        <Typography variant="h6" className={styles.input_label}>
          NAME
        </Typography>
        <input
          className={styles.input_field}
          onChange={(e) => {
            setSignUpInfo((curr) => ({ ...curr, name: e.target.value }));
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
            setSignUpInfo((curr) => ({ ...curr, password: e.target.value }));
          }}
        />
      </Box>
      <p className={styles.login_text}>
        alredy have an account, login
        <p className={styles.login_link} onClick={props?.showlogin}>
          HERE
        </p>
      </p>
      <Button variant="contained" className={styles.button} onClick={signUp}>
        SIGNUP
      </Button>
    </Box>
  );
};

export default SignupCard;
