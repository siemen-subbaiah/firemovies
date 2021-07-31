import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { SiGmail } from 'react-icons/si';

const Footer = () => {
  return (
    <footer className='text-center p-2'>
      <div className='connect'>
        <a href='https://github.com/siemen-subbaiah'>
          <FaGithub className='social-icons' />
        </a>
        <a href='https://www.linkedin.com/in/siemen-subbaiah/'>
          <FaLinkedin className='social-icons' />
        </a>
        <a href='mailto:siemensubbaiah1@gmail.com'>
          <SiGmail className='social-icons' />
        </a>
      </div>
      <p>{new Date().getFullYear()} Made by siemen subbaiah</p>
    </footer>
  );
};

export default Footer;
