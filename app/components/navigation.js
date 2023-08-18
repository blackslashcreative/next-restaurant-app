'use client'
import { Container, Nav, NavItem } from 'reactstrap';
import Link from 'next/link'
import { useAppContext } from '../context/appContext';


function Navigation() {
  const { user, setUser } = useAppContext();
  
  return (
    <Nav className="navbar navbar-dark bg-dark">
      <Container>
        <NavItem>
          <Link href="/" className="navbar-brand">
            Home
          </Link>
        </NavItem>
        <NavItem className="ml-auto">
          {user ? (
            <h5>{user.username}</h5>
          ) : (
            <Link href="/register" className="nav-link">
              Sign Up
            </Link>
          )}
        </NavItem>
        <NavItem>
          {user ? (
            <Link
              href="/"
              className="nav-link"
              onClick={() => {
                logout();
                setUser(null);
              }}
            >
              Logout
            </Link>
          ) : (
            <Link href="/login" className="nav-link">
              Login
            </Link>
          )}
        </NavItem>
      </Container>
    </Nav>
  )
}

export default Navigation;