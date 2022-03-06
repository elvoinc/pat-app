import { ChakraProvider } from "@chakra-ui/react";
import type { AppProps } from "next/app";
import Head from "next/head";
import Layout from "../components/Layout";
import theme from "../theme";

import Amplify, { Auth } from "aws-amplify";
import awsconfig from "../aws-exports";
import AuthContext from "../context/AuthContext";

Amplify.configure({ ...awsconfig, ssr: true });

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <AuthContext>
        <ChakraProvider theme={theme}>
          <Layout>
            <Component {...pageProps} />
          </Layout>
        </ChakraProvider>
      </AuthContext>
    </>
  );
}

export default MyApp;
