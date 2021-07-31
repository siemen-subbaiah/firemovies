import React from 'react';
import { useSelector } from 'react-redux';
import { auth } from '../../firebase';

const AccountInfo = () => {
  const user = useSelector(({ auth }) => auth.user);

  return (
    <div>
      <h2>{user.email}</h2>
      {user.displayName && (
        <h5 className='mt-3'>
          Hello {user.displayName}! hope you're doing good!{' '}
        </h5>
      )}
      <h6>This page is under construction and here are the future plans : </h6>
      <p> - user can edit his/her email ,username and password</p>
      <p> - user can send a password reset request from this page</p>
      <p> - user can upload a profile picture</p>
      <button className='my-3 btn my-btn' onClick={() => auth.signOut()}>
        Log out
      </button>
    </div>
  );
};

export default AccountInfo;
