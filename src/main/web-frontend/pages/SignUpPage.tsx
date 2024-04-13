import * as React from "react";
import {useState} from "react";
import {createUseStyles} from "react-jss";
import PrimaryButton from "../components/PrimaryButton";
import {graphql, useMutation} from "react-relay";
import {SignUpPageMutation} from "../__generated__/SignUpPageMutation.graphql";
import {useNavigate} from "react-router-dom";

const useStyles = createUseStyles({
  signupPage: {
    display: 'flex',
    justifyContent: 'center'
  },
  formContainer: {
    display: 'flex',
    flexDirection: 'column',
    maxWidth: '320px',
    padding: '12px',
    border: '1px solid black'
  }
})

export default function SignUpPage() {
  const navigation = useNavigate();
  const [commitMutation, isMutationInFlight] = useMutation<SignUpPageMutation>(
    graphql`
      mutation SignUpPageMutation($input: CreateUserInput!) {
        createUser(input: $input) {
          success
          errors {
            ... on CreateUserError {
              type
            }
            message
          }
          user {
            email
          }
        }
      }
    `
  )
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null)
  const styles = useStyles();
  return (
    <div className={styles.signupPage}>
      {
        error && <div>{error}</div>
      }
      <div className={styles.formContainer}>
        <input placeholder="Email" onChange={(e) => setEmail(e.target.value)} />
        <input placeholder="Username" onChange={(e) => setUsername(e.target.value)} />
        <input placeholder="Password" type="password" onChange={(e) => setPassword(e.target.value)} />
        <input placeholder="Confirm Password" type="password" onChange={(e) => setConfirmPassword(e.target.value)} />
        <PrimaryButton
          text={"Submit"}
          onClick={() => {
            commitMutation({
              variables: {
                input: {
                  username,
                  email,
                  password,
                  confirmPassword
                }
              },
              onCompleted: (response) => {
                const result = response.createUser
                if (result == null) {
                  setError("Something went wrong. Please try again.")
                }
                else {
                  const { success, errors } = result
                  if (!success) {
                    if (errors != null && errors.length > 0) {
                      setError(errors[0].message || "Something went wrong. Please try again.")
                    }
                    else {
                      setError("Something went wrong. Please try again.")
                    }
                  }
                  else {
                    navigation("/login?success=true")
                  }
                }
              }
            })
          }}
          enabled={isMutationInFlight} />
      </div>
    </div>
  )
}