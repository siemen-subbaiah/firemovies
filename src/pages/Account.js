import React from 'react';
import { Container } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import AccountIntro from '../components/Account/AccountIntro';
import AccountInfo from '../components/Account/AccountInfo';

const Account = () => {
  const user = useSelector(({ auth }) => auth.user);

  return (
    <Container className='account'>
      {user ? <AccountInfo /> : <AccountIntro />}
    </Container>
  );
};

export default Account;
