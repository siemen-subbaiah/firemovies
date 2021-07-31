import React, { useState } from 'react';
import { Col, Row } from 'react-bootstrap';
import Login from './Login';
import Signup from './Signup';
import logo from '../../images/logo.png';

const AccountIntro = () => {
  const [toggle, setToggle] = useState(false);

  return (
    <Row className='justify-content-center align-items-center'>
      <Col lg={6}>
        <img src={logo} alt='logo' />
        <p className='my-3'>
          Login/signup to add your favourite movies to a favourites list
        </p>
      </Col>
      <Col lg={6}>
        {toggle ? <Signup /> : <Login />}
        <p className='my-3 text-center'>
          {' '}
          <span
            style={{ cursor: 'pointer', color: '#f66902' }}
            onClick={() => setToggle(!toggle)}
          >
            {toggle ? 'Login' : 'Signup'}
          </span>{' '}
          if you {toggle ? 'already' : `don't`} have an account
        </p>
      </Col>
    </Row>
  );
};

export default AccountIntro;
