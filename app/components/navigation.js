'use client';
import { Container, Nav, NavItem } from 'reactstrap';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import Logo from '../../public/img/logo-white.svg';
import Image from 'next/image';
import { useAppContext } from '../appContext';
import Cookie from "js-cookie";


function Navigation() {
  const { user, setUser } = useAppContext();
  const { resetCart } = useAppContext();

  const router = useRouter();
  function handleLogout() {
    setUser(null);
    Cookie.remove("token");
    resetCart(true);
    router.push("/");
  }
  
  return (
    <Nav className="navbar bs-bg-dark">
      <Container>
        <NavItem>
          <Link href="/" className="navbar-brand">
            <Image
              src={Logo}
              width={50}
              height={50}
              alt="Restaurant App Logo"
            /> nybble
          </Link>
        </NavItem>
        <NavItem className="ml-auto">
          {user ? (
            <span className="text-green-400">Hi, {user.username}!</span>
          ) : (
            <Link href="/register" className="nav-link">
              Sign Up
            </Link>
          )}
        </NavItem>
        <NavItem>
          {user ? (
            <Link
              href=""
              className="nav-link"
              onClick={handleLogout}
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