import React, { useState } from 'react';
import axios from 'axios';
import '../assets/css/SignUp.css';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import config from "../config";
const SignUp = () => {
    const navigate = useNavigate()
    const [user, setUser] = useState({
        username: '',
        email: '',
        password: '',
        user_phone: '',
        user_city: '',
        user_address: '',
        user_image: null
  });

  const InputData = (e) => {
    if (e.target.files) {
      setUser({ ...user, [e.target.name]: e.target.files[0] });
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const addUser = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`${config.BASE_URL}/register`, user, {
        headers: {
          'Content-Type': 'multipart/form-data'
        }
      });
      alert('User added successfully!');
      navigate('/signin')
    } catch (error) {
      console.error(error);
      alert('Something went wrong!');
    }
  };

  return (
    <div className="signup-page">
      <form className="signup-form" onSubmit={addUser}>
      <h2 style={{ fontSize: '25px', textAlign: 'center' }}>Sign Up</h2>
        <div className="form-group1">
          <label htmlFor="username">Username</label>
          <input type="text" id="username" name="username" placeholder="Enter username" onChange={InputData} />
        </div>

        <div className="form-group1">
          <label htmlFor="email">Email</label>
          <input type="email" id="email" name="email" placeholder="Enter email" onChange={InputData} />
        </div>

        <div className="form-group1">
          <label htmlFor="password">Password</label>
          <input type="password" id="password" name="password" placeholder="Enter password" onChange={InputData} />
        </div>

        <div className="form-group1">
          <label htmlFor="phoneNumber">Phone Number</label>
          <input type="text" id="phoneNumber" name="user_phone" placeholder="Enter phone number" onChange={InputData} />
        </div>

        <div className="form-group1">
          <label htmlFor="address">Address</label>
          <input type="text" id="address" name="user_address" placeholder="Enter address" onChange={InputData} />
        </div>

        <div className="form-group1">
          <label htmlFor="city">City</label>
          <input type="text" id="city" name="user_city" placeholder="Enter city" onChange={InputData} />
        </div>

        <div className="form-group1">
          <label htmlFor="image">Upload Image</label>
          <input type="file" id="image" name="user_image" onChange={InputData} />
        </div>

        <p className="para2">
          By signing up, you agree to our <span style={{ color: 'green', fontWeight: 'bold' }}>Terms & Conditions</span>
        </p>

        <button type="submit" className="submit-btn1">Sign Up</button>
      

      <p className="para3">
        Already have an account?{' '}
        <Link to="/signin" style={{ color: 'green', fontWeight: 'bold' }}>
          Sign In
        </Link>
      </p>
      </form>
    </div>
  );
};

export default SignUp;
