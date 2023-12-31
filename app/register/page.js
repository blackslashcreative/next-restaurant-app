'use client';
import { useState, useEffect } from "react";
import { useAppContext } from '../appContext';
import { registerUser } from "../utils/auth";
import { useRouter } from 'next/navigation';
import { Form, FormGroup, Input } from 'reactstrap';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { AiOutlineExclamationCircle } from "react-icons/ai";

export default function Register() {
  const [data, setData] = useState({ email:"", username:"", password:"" });
  const [loading, setLoading] = useState(false);
  const { error, setError } = useAppContext();
  const { user, setUser } = useAppContext();
  const { setSuccessMessage } = useAppContext();

  console.log(`error: ${JSON.stringify(error)}`);

  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/"); // redirect if you're already logged in
    }
  }, [user]);

  if (loading) return <Loader />;

  const searchParams = useSearchParams();
  let loginRedirectLink = "/login";
  if (searchParams) {
    loginRedirectLink += "?" + searchParams;    
  }

  return (
    <main className="form-page">
      <div className="paper form-wrapper">
        <div className="form">
          <div className="header">
            <h1>Register</h1>
          </div>
          <section className="wrapper">
            <Form>
              <fieldset disabled={loading}>
                <FormGroup>
                  <label>Username:</label>
                  <Input  
                    disabled={loading}
                    onChange={(e) => setData({ ...data, username: e.target.value })}
                    value={data.username}
                    type="text"
                    name="username"
                  />
                </FormGroup>
                <FormGroup>
                <label>Email:</label>
                  <Input  
                    disabled={loading}
                    onChange={(e) => setData({ ...data, email: e.target.value })}
                    value={data.email}
                    type="text"
                    name="email"
                  />
                </FormGroup>
                <FormGroup>
                <label>Password:</label>
                  <Input  
                    disabled={loading}
                    onChange={(e) => setData({ ...data, password: e.target.value })}
                    value={data.password}
                    type="password"
                    name="password"
                  />
                </FormGroup>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    registerUser(data.username, data.email, data.password)
                      .then ((res) => {
                        // set authed user in global context object
                        setSuccessMessage('Your account has been created!');
                        setUser(res.data.user);
                        setLoading(false);
                      })
                      .catch ((error) => {
                        setError(error.response.data);
                        setLoading(false);
                      });
                  }}
                >
                  {loading ? "Loading..." : "Submit"}
                </button>
              </fieldset>
            </Form> 
          </section>
        </div>
        <div className="form-footer-alert errors">
          {error && (
            <div className="errors-wrapper">
              <AiOutlineExclamationCircle size={20}/>
              <div
                className="error"
              >
                Uh oh! Something looks wrong. Please try again.
              </div>
            </div>
          )}
          Already have an account? <Link href={loginRedirectLink}>Log in</Link>
        </div>
      </div>
    </main>
  );
}