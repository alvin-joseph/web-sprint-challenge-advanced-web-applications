import React, { useEffect, useState } from "react";
import axios from 'axios';

const initialValues = {
  username: "Lambda School",
  password: "i<3Lambd4"
}

const Login = (props) => {
  const [formValues, setFormValues] = useState(initialValues);
  const [error, setError] = useState([]);
  // make a post request to retrieve a token from the api
  // when you have handled the token, navigate to the BubblePage route
  
  const handleChange = e => {
    setFormValues({...formValues, [e.target.name]:[e.target.value]})
  }
  
  const handleLogin = e => {
    e.preventDefault();
    axios.post('http://localhost:5000/api/login', formValues)
      .then(res => {
        localStorage.setItem("token", res.data.payload);
        props.history.push('/bubble-page')
      })
      .catch(err => {
        //console.log({err});
        setError(err.response.data.error);
      })
  }

  useEffect(()=>{
    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route
  });
  
  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <div data-testid="loginForm" className="login-form">
        <form onSubmit={handleLogin}>
            <label htmlFor="username">Username</label>
            <input
              type="text"
              name="username"
              value={formValues.username}
              onChange={handleChange}
              data-testid="username"
            />
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              value={formValues.password}
              onChange={handleChange}
              data-testid="password"
            />
            <button>Log in</button>
          </form>
      </div>

      <p data-testid="errorMessage" className="error">{error}</p>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.