import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import NotFoundPage from './pages/NotFoundPage';
import SignIn from './pages/SignIn';
import Settings from './pages/Settings';
import Insert from './pages/Insert';
import Update from './pages/Update';
import SignUp from './pages/SignUp';
import ResetPassword from './pages/ForgetPass';

function App() {
  return (
    <Routes>
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/home" element={<Home />} />
      <Route path="/reset" element={<ResetPassword />} />
      <Route path="/settings" element={<Settings />} />
      <Route path="/insert" element={<Insert />} />
      <Route path="/update" element={<Update />} />
      <Route path='*' element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
