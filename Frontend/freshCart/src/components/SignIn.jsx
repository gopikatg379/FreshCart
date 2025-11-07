import { useState, useEffect, useContext } from 'react';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../assets/css/SignIn.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import config from "../config";
const SignIn = () => {
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext); 

  const [user, setUserInput] = useState({
    username: '',
    password: '',
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  const InputData = (e) => {
    setUserInput({ ...user, [e.target.name]: e.target.value });
  };

  const loginUser = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${config.BASE_URL}/login`, user);
      console.log('Login successful, tokens:', res.data);
      localStorage.setItem('access', res.data.access);
      localStorage.setItem('refresh', res.data.refresh);

      setUser({ token: res.data.access });

      console.log('Tokens stored and context updated');
      navigate('/');
    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="signin-page">
      <form className="signin-form" onSubmit={loginUser}>
        <h2 style={{ fontSize: '25px', textAlign: 'center' }}>Sign In</h2>
        <div className="form-group2">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter username"
            onChange={InputData}
          />
        </div>
        <div className="form-group2">
          <label htmlFor="password">Password</label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter password"
            onChange={InputData}
          />
        </div>
        <button type="submit" className="submit-btn2">Sign In</button>
        <p className="para3">
          Are you a new User?{' '}
          <Link to="/signup" style={{ color: 'green', fontWeight: 'bold' }}>
            Sign Up
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
