import * as React from "react";
import {SubmitHandler, useForm} from "react-hook-form";
import {createUseStyles} from "react-jss";

type Inputs = {
  email: string,
  username: string,
  password: string
}

const useStyles = createUseStyles({
  loginFormContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
  loginForm: {
    display: 'flex',
    flexDirection: 'column'
  }
});

export default function LoginPage() {

  const {
    register,
  } = useForm<Inputs>()
  const styles = useStyles();

  return (
    <div className={styles.loginFormContainer}>
      <form className={styles.loginForm} action="/login" method="POST">
        <input {...register("username", { required: true })} placeholder="Username" />
        <input {...register("password", { required: true })} placeholder="Password" type="password" />
        <input type="submit" />
      </form>
    </div>
  )
}