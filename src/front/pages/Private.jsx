import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Private() {
  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) return navigate('/login');

    fetch('/api/private', {
      headers: { 'Authorization': token }
    })
      .then(res => {
        if (res.status !== 200) {
          navigate('/login');
          return;
        }
        return res.json();
      })
      .then(data => {
        if (data) setUserData(data.user);
      })
      .catch(() => {
        navigate('/login');
      });
  }, [navigate]);

  if (!userData) return <div>Loading...</div>;

  return (
    <div className="private-dashboard">
      <h1>Welcome to Your Private Dashboard</h1>
      <div className="user-info">
        <h2>Your Profile</h2>
        <p>Email: {userData.email}</p>
      </div>
    </div>
  );
}

export default Private;
