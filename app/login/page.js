import React from 'react';
import Head from 'next/head';
import Layout from '../layout.js';

export default function Login() {
  return (
    <Layout>
      <main>
        <h1>Login</h1>
        <p>Is authenticated? = {isAuthenticated}</p>
      </main>
    </Layout>
  )
}
