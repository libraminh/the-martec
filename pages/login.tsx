import { NextPage } from "next";
import Head from "next/head";
import React from "react";

interface Props {}

const Login: NextPage = (props: Props) => {
  return (
    <div>
      <Head>
        <title>Login - The Martec</title>
      </Head>
      Login Page
    </div>
  );
};

export default Login;
