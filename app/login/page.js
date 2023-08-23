'use client';
import React, { useState, useEffect } from "react";
import { useAppContext } from '../appContext';
import { useRouter } from 'next/navigation';
import { Form, FormGroup, Label, Input } from "reactstrap";
import { login } from "../utils/auth";
import { useSearchParams } from 'next/navigation';
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function Login() {
  const { user, setUser } = useAppContext();

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

  // build login redirect link
  const searchParams = useSearchParams();
  const redirect = searchParams.get('redirect');
  let loginRedirectLink = "/";
  if (redirect) {
    loginRedirectLink = redirect;    
  }

  return (
    <main className="form-page">
      <div className="paper form-wrapper">
        <div className="form">
          <div className="header">
            <h1>Login</h1>
          </div>
          <section className="wrapper">
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
                          // Redirect to previous page
                          router.push(loginRedirectLink);
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
        <div className="form-footer-alert errors">
          {error && <AiOutlineExclamationCircle size={20}/>}
          {error && (
            error.error.details.errors.map((error) => {
              return (
                <div
                  className="error"
                  key={error.message}
                >
                  {error.message + "."}
                </div>
              );
            })
          )}
        </div>
      </div>
    </main>
  );
}
