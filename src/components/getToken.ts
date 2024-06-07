'use client';

import { useState, useEffect } from 'react';

// todo : 서버만들면 쿠키로 변경
export default function getToken() {
  const [auth, setAuth] = useState<string | null>(null);

  useEffect(() => {
    if (localStorage.getItem('auth')) {
      setAuth(localStorage.getItem('auth'));
    }
  }, [localStorage]);

  return auth;
}
