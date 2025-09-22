'use client';

import { useState } from 'react';
import { signOut } from 'firebase/auth';
import { auth } from '@/firebaseConfig';
import { OperatorMainDashboard } from '@/components/operator';
import Login from '@/components/Login';

export default function Home() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    signOut(auth).catch((err) => {
      console.error('Logout error', err);
    });
    setIsLoggedIn(false);
  };





  // Show login page if not logged in
  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />;
  }

  // Always show operator dashboard as main page
  return <OperatorMainDashboard onLogout={handleLogout} userRole="operator" />;
}
