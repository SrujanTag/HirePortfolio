import React from 'react';
import IllustrationPanel from '../components/IllustrationPanel';
import LoginForm from '../components/LoginForm';

const LoginPage = () => (
  <div className="min-h-screen flex items-center justify-center bg-gray-950 w-full">
    <div className="w-full max-w-7xl flex flex-col lg:flex-row min-h-[600px]">
      <IllustrationPanel />
      <LoginForm />
    </div>
  </div>
);

export default LoginPage;

