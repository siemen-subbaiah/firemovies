import React from 'react';
import { Col, Row } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { auth } from '../../firebase';
import profile from '../../images/profile.svg';

const AccountInfo = () => {
  const user = useSelector(({ auth }) => auth.user);

  return (
    <Row>
      <Col lg={6} className='order-2 order-lg-1'>
        <div className='ac-det'>
          <h2>{user.email}</h2>
          {user.displayName && (
            <h5 className='my-4'>
              Hello {user.displayName}! hope you're doing good!{' '}
            </h5>
          )}
          <h6>
            This page is under construction and here are the future plans :{' '}
          </h6>
          <p> - user can edit his/her email ,username and password</p>
          <p> - user can send a password reset request from this page</p>
          <p> - user can upload a profile picture</p>
          <p className='my-3'>
            Untill that you can enjoy the app, here are some quick links:
          </p>
          <div className='add-links d-flex flex-column flex-lg-row'>
            <p>
              <Link to='/'>Home</Link>
            </p>
            <p className='ms-0 ms-lg-3'>
              <Link to='/search'>Search</Link>
            </p>
            <p className='ms-0 ms-lg-3'>
              <Link to='/favourites'>Favourites</Link>
            </p>
          </div>
          <button className='my-3 btn my-btn' onClick={() => auth.signOut()}>
            Log out
          </button>
        </div>
      </Col>
      <Col lg={6} className='order-1 order-lg-2 mb-5 mb-lg-0'>
        <img src={profile} alt='profile' className='img-fluid' />
      </Col>
    </Row>
  );
};

export default AccountInfo;
