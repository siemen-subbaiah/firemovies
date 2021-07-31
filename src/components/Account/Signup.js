import React, { useState } from 'react';
import { Card, Form } from 'react-bootstrap';
import { auth } from '../../firebase';

const Signup = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSignup = async (e) => {
    e.preventDefault();
    if (email && password && name) {
      try {
        setLoading(true);
        const user = await auth.createUserWithEmailAndPassword(email, password);
        user.user.updateProfile({
          displayName: name,
        });
        setLoading(false);
      } catch (error) {
        alert(error.message);
      }
    } else {
      alert('fill in all the fields!');
      setLoading(false);
    }
  };

  return (
    <Card className='p-2 p-lg-3'>
      <Card.Body>
        <Form onSubmit={handleSignup}>
          <Form.Group className='mb-3' controlId='formBasicEmail'>
            <Form.Label>Name</Form.Label>
            <Form.Control
              type='name'
              name='name'
              placeholder='Enter name'
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>

          <Form.Group className='mb-3' controlId='formBasicEmail2'>
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
              Signup
            </button>
          </div>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default Signup;
