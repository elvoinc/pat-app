import React, { useState } from "react";
import { Button, Input, VStack } from "@chakra-ui/react";
import { Form, Formik } from "formik";
import { TextField } from "../components/TextField";
import { useUser } from "../context/AuthContext";
import { useRouter } from "next/router";
import { Auth } from "aws-amplify";
import { CognitoUser } from "@aws-amplify/auth";

interface IFormInput {
  username: string;
  email: string;
  password: string;
  code: string;
}

export default function Signup() {
  const { user, setUser } = useUser();
  const router = useRouter();
  const [open, setOpen] = useState(false);
  const [signUpError, setSignUpError] = useState<string>("");
  const [showCode, setShowCode] = useState<boolean>(false);

  const handleClose = (event?: React.SyntheticEvent, reason?: string) => {
    if (reason === "clickaway") {
      return;
    }
    setOpen(false);
  };

  async function signUpWithEmailAndPassword(
    data: IFormInput
  ): Promise<CognitoUser> {
    const { username, password, email } = data;
    try {
      const { user } = await Auth.signUp({
        username,
        password,
        attributes: {
          email,
        },
      });
      console.log("Signed up a user:", user);
      return user;
    } catch (error) {
      throw error;
    }
  }

  async function confirmSignUp(data: IFormInput) {
    const { username, password, code } = data;
    try {
      await Auth.confirmSignUp(username, code);
      const amplifyUser = await Auth.signIn(username, password);
      console.log("Successs, singed in a user", amplifyUser);
      if (amplifyUser) {
        router.push(`/`);
      } else {
        throw new Error("Something went wrong :'(");
      }
    } catch (error) {
      console.log("error confirming sign up", error);
    }
  }

  console.log("The value of the user from the hook is:", user);

  return (
    <Formik
      initialValues={{
        username: "",
        password: "",
        email: "",
        code: "",
      }}
      onSubmit={async (data) => {
        try {
          if (showCode) {
            confirmSignUp(data);
          } else {
            await signUpWithEmailAndPassword(data);
            setShowCode(true);
          }
        } catch (err) {
          console.error(err);
          setSignUpError(err.message);
          setOpen(true);
        }
      }}
    >
      {({ handleSubmit }) => (
        <Form onSubmit={handleSubmit} autoComplete="off">
          <VStack spacing={4}>
            <TextField
              name="username"
              placeholder="Enter Username"
              label="Username"
            />
            <TextField
              name="password"
              placeholder="Enter Password"
              label="Password"
              type="password"
            />
            <TextField name="email" placeholder="Enter Email" label="Email" />
            {showCode && (
              <TextField name="code" placeholder="Enter Code" label="Code" />
            )}
            <Button type="submit">submin</Button>
          </VStack>
        </Form>
      )}
    </Formik>
  );
}
