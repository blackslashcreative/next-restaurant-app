'use client'
import React from 'react';
import Head from 'next/head';
import Layout from '../layout.js';
import { useAppContext } from '../context/appContext';


export default function Login() {
  const { isAuthenticated, setIsAuthenticated } = useAppContext();

  return (
    <Layout>
      <main>
        <h1>Login</h1>
        {isAuthenticated === false ? <p>login form here</p> : <p>You're already logged in!</p>}
      </main>
    </Layout>
  )
}
