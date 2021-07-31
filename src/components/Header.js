import React, { useEffect, useRef, useState } from 'react';
import logo from '../images/logo.png';
import { HiOutlineMenu } from 'react-icons/hi';
import { Link, useHistory } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { auth } from '../firebase';

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const user = useSelector(({ auth }) => auth.user);

  const navLinksRef = useRef(null);
  const navContainerRef = useRef(null);

  const history = useHistory();

  useEffect(() => {
    if (window.innerWidth < 600) {
      const linksHeight = navLinksRef.current.getBoundingClientRect().height;

      toggle
        ? (navContainerRef.current.style.height = `${linksHeight}px`)
        : (navContainerRef.current.style.height = '0px');
    }
  }, [toggle]);

  const handleSignOut = () => {
    setToggle(!toggle);
    auth.signOut();
    history.push('/');
  };

  return (
    <nav className='navs'>
      <Container>
        <div className='my-nav'>
          <Link to='/'>
            <img src={logo} alt='logo' className='logo' />
          </Link>
          <HiOutlineMenu className='ham' onClick={() => setToggle(!toggle)} />
          <div className='link-container' ref={navContainerRef}>
            <ul className='my-navlinks' ref={navLinksRef}>
              <li onClick={() => setToggle(!toggle)}>
                <Link to='/'>Home</Link>
              </li>
              <li onClick={() => setToggle(!toggle)}>
                <Link to='/search'>Search</Link>
              </li>
              <li onClick={() => setToggle(!toggle)}>
                <Link to='/favourites'>Favourites</Link>
              </li>
              <li onClick={() => setToggle(!toggle)}>
                <Link to='/account'>Account</Link>
              </li>
              <li onClick={() => setToggle(!toggle)}>
                <Link to='/about'>About</Link>
              </li>
              {user && (
                <li>
                  <button className='btn my-btn' onClick={handleSignOut}>
                    Logout
                  </button>
                </li>
              )}
            </ul>
          </div>
        </div>
      </Container>
    </nav>
  );
};

export default Header;
