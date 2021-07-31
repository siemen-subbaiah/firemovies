import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { auth } from '../../firebase';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    if (email && password) {
      try {
        setLoading(true);
        await auth.signInWithEmailAndPassword(email, password);
        setLoading(false);
      } catch (error) {
        alert(error.message);
        setLoading(false);
      }
    } else {
      alert('fill all the fields!');
    }
  };

  return (
    <Card className='p-2 p-lg-3'>
      <Card.Body>
        <Form onSubmit={handleLogin}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              name='email'
              placeholder='Enter email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
          <Form.Group className='mb-3' controlId='formBasicPassword'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              name='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
          <div className='d-grid gap-2'>
            <button className='btn my-btn' type='submit' disabled={loading}>
              Login
            </button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Login;
