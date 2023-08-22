'use client';
import React, { useState, useEffect } from "react";
import { useAppContext } from '../appContext';
import { useRouter } from 'next/navigation';
import { Form, FormGroup, Label, Input } from "reactstrap";
import { login } from "../utils/auth";
import Image from 'next/image';

export default function Login() {
  const { user, setUser } = useAppContext();
  console.log(`Current user: ${JSON.stringify(user)}`);

  const [data, updateData] = useState({ identifier: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  
  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/"); // redirect if you're already logged in
    }
  }, [user]);

  function onChange(event) {
    updateData({ ...data, [event.target.name]: event.target.value });
  }

  return (
    <main>
      <div className="paper form">
        <div className="header">
          <Image
            src="img/logo.svg"
            className="form-logo"
            width={100}
            height={100}
            alt="Restaurant App Logo"
          />
          <h1>Login</h1>
        </div>
        <section className="wrapper">
          {Object.entries(error).length !== 0 &&
            error.constructor === Object &&
            error.message.map((error) => {
              return (
                <div key={error.messages[0].id}>
                  <small className="text-danger">
                    {error.messages[0].message}
                  </small>
                </div>
              );
            })}
          <Form>
            <fieldset disabled={loading}>
              <FormGroup>
                <Label>Email:</Label>
                <Input
                  onChange={(event) => onChange(event)}
                  name="identifier"
                />
              </FormGroup>
              <FormGroup>
                <Label>Password:</Label>
                <Input
                  onChange={(event) => onChange(event)}
                  type="password"
                  name="password"
                />
              </FormGroup>

              <FormGroup>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setLoading(true);
                    login(data.identifier, data.password)
                      .then((res) => {
                        setLoading(false);
                        // set authed User in global context to update header/app state
                        setUser(res.data.user);
                      })
                      .catch((error) => {
                        setError(error.response.data);
                        setLoading(false);
                      });
                  }}
                >
                  {loading ? "Loading... " : "Submit"}
                </button>
              </FormGroup>
            </fieldset>
          </Form>
        </section>
      </div>
    </main>
  );
}
