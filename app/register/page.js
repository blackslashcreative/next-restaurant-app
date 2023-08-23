'use client';
import { useState, useEffect } from "react";
import { useAppContext } from '../appContext';
import { registerUser } from "../utils/auth";
import { useRouter } from 'next/navigation';
import { Form, FormGroup, Input } from 'reactstrap';    

export default function Register() {
  const [data, setData] = useState({ email:"", username:"", password:"" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const { user, setUser } = useAppContext();

  const router = useRouter();
  useEffect(() => {
    if (user) {
      router.push("/"); // redirect if you're already logged in
    }
  }, [user]);

  if (loading) return <Loader />;

  return (
    <main className="form-page">
      <div className="paper form">
        <div className="header">
          <h1>Register</h1>
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
            })
          }
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
    </main>
  );
}