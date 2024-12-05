import React from 'react';

function Dashboard(props) {
  const user = JSON.parse(localStorage.getItem('twitter_user'));

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] w-[500px] bg-gray-100">
      <h1 className="text-4xl font-bold mb-4">Welcome to Twitter Auth</h1>
      {user && (
        <div className="text-center">
          <p className="text-lg text-gray-700">Welcome, {user.name || 'User'}!</p>
          <p className="text-lg text-gray-700">You have successfully logged in.</p>
        </div>
      )}
    </div>
  );
}

export default Dashboard;