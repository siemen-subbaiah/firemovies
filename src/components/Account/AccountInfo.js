import React from 'react';
import { MdModeEdit, MdCancel } from 'react-icons/md';
import { useState } from 'react';
import { Col, Row, Toast } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase';
import profile from '../../images/profile.svg';

const AccountInfo = () => {
  const user = useSelector(({ auth }) => auth.user);

  const theUser = auth.currentUser;

  const [message, setMessage] = useState('');
  const [toggle, setToggle] = useState(false);
  const [name, setName] = useState(user?.displayName);
  const [email, setEmail] = useState(user?.email);

  const [showToast, setShowToast] = useState(true);

  const handlePasswordReset = async () => {
    try {
      await auth.sendPasswordResetEmail(user.email);
      setMessage(
        'Email sent successfully, follow the mail for further instructions'
      );
    } catch (error) {
      alert(error);
    }
  };

  const handleUsernameUpdate = async () => {
    try {
      await theUser.updateProfile({
        displayName: name,
      });
      console.log('successful!');
      setToggle(false);
    } catch (error) {
      alert(error);
    }
  };
  const handleEmailUpdate = async () => {
    try {
      await theUser.updateEmail(email);
      console.log('successful!');
      setToggle(false);
    } catch (error) {
      alert(
        'Session expired! please logout and login again to change the email address!'
      );
    }
  };

  return (
    <Row>
      <Col lg={6} className='order-2 order-lg-1'>
        <div className='ac-det'>
          {user.displayName && (
            <h4 className='my-4'>
              Hello {user.displayName}, hope you're doing good!{' '}
            </h4>
          )}

          <div className='user-details'>
            <div className='edit-det'>
              {toggle ? (
                <MdCancel
                  className='edit-icon'
                  color='#fff'
                  onClick={() => setToggle(false)}
                />
              ) : (
                <MdModeEdit
                  className='edit-icon'
                  color='#fff'
                  onClick={() => setToggle(true)}
                />
              )}
            </div>
            {toggle ? (
              <>
                <div className='my-4 d-block d-md-flex align-items-center edit-user'>
                  <span className='h5'>
                    <strong>username</strong>
                  </span>
                  <input
                    type='text'
                    name='name'
                    className='ms-0 ms-md-3 my-2 my-md-0'
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                </div>

                <div className='my-4 d-block d-md-flex align-items-center edit-user '>
                  <span className='h5'>
                    <strong>Email</strong>
                  </span>
                  <input
                    type='text'
                    name='name'
                    className='ms-0 ms-md-5 my-2 my-md-0'
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>

                <div className='d-flex align-items-center'>
                  <button
                    className='my-3 btn my-btn me-3'
                    onClick={handleEmailUpdate}
                  >
                    Update email
                  </button>
                  <button
                    className='my-3 btn my-btn'
                    onClick={handleUsernameUpdate}
                  >
                    Update username
                  </button>
                </div>
              </>
            ) : (
              <>
                <h5 className='my-4'>
                  <strong>username</strong> : {name}
                </h5>
                <h5 className='my-4 fsize'>
                  <strong>Email</strong> : {email}
                </h5>
              </>
            )}
          </div>

          <div className='d-flex'>
            <button
              className='my-3 btn my-sec-btn me-3'
              onClick={handlePasswordReset}
            >
              Reset Password
            </button>

            <button className='my-3 btn my-btn' onClick={() => auth.signOut()}>
              Log out
            </button>
          </div>
          {message.length > 1 && (
            <Toast show={showToast} onClose={() => setShowToast(false)}>
              <Toast.Header>
                <img
                  src='holder.js/20x20?text=%20'
                  className='rounded me-2'
                  alt=''
                />
                <strong className='me-auto'>Alert</strong>
              </Toast.Header>
              <Toast.Body>{message}</Toast.Body>
            </Toast>
          )}
        </div>
      </Col>
      <Col lg={6} className='order-1 order-lg-2 mb-5 mb-lg-0'>
        <img src={profile} alt='profile' className='img-fluid' />
      </Col>
    </Row>
  );
};

export default AccountInfo;
