import React, { useState } from 'react';
import logo from '../images/logo.png';
import { HiOutlineMenu } from 'react-icons/hi';
import { Link } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { auth } from '../firebase';

const Header = () => {
  const [toggle, setToggle] = useState(false);
  const user = useSelector(({ auth }) => auth.user);

  return (
    <nav className='navs'>
      <Container>
        <div className='my-nav'>
          <Link to='/'>
            <img src={logo} alt='logo' className='logo' />
          </Link>
          <HiOutlineMenu className='ham' onClick={() => setToggle(!toggle)} />
          <ul className={`${toggle ? 'my-navlinks show' : 'my-navlinks'}`}>
            <li>
              <Link to='/'>Home</Link>
            </li>
            <li>
              <Link to='/search'>Search</Link>
            </li>
            <li>
              <Link to='/favourites'>Favourites</Link>
            </li>
            <li>
              <Link to='/account'>Account</Link>
            </li>
            <li>
              <Link to='/about'>About</Link>
            </li>
            {user && (
              <li>
                <button className='btn my-btn' onClick={() => auth.signOut()}>
                  Logout
                </button>
              </li>
            )}
          </ul>
        </div>
      </Container>
    </nav>
  );
};

export default Header;
