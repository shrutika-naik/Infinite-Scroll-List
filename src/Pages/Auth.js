import React, { useContext } from 'react';

import Card from '../shared/components/UIElements/Card';
import Button from '../shared/components/FormElements/Button';
import { AuthContext } from '../shared/context/auth-context';
import './Auth.css';

const Auth = () => {
  const auth = useContext(AuthContext);

  const authSubmitHandler = event => {
    event.preventDefault();
    auth.login();
  };

  return (
    <Card className="authentication">
      <h2>Login Required</h2>
      <hr />
      <form onSubmit={authSubmitHandler}>
        <div className='form-control' >
          <label htmlFor="email">E-Mail</label>
          <input type="text" />
          <label htmlFor="password">Password</label>
          <input type="password" />
        </div>
        <Button type="submit">LOGIN</Button>
      </form>
    </Card>
  );
};

export default Auth;
