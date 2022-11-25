import { Container, Typography } from "@mui/material";
import React, { useState } from "react";
import LoginCard from "../../components/LoginCard/LoginCard";
import SignupCard from "../../components/SignupCard/SignupCard";
import styles from "./login.module.scss";

const Login = () => {
  const [haveAccount, setHaveAccount] = useState(false);

  const showSignupoLogin = () => {
    setHaveAccount(!haveAccount);
  };
  return (
    <div className={styles.background}>
      <div className={styles.container}>
        <Typography
          variant="h2"
          className={styles.title}
          sx={{ marginBottom: "4rem" }}
        >
          WELCOME
        </Typography>
        {haveAccount ? (
          <LoginCard showsignup={showSignupoLogin} />
        ) : (
          <SignupCard showlogin={showSignupoLogin} />
        )}

        {/**/}
      </div>
    </div>
  );
};

export default Login;
