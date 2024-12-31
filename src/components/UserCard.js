import React from 'react';
import '../styles/userCard.css';

const UserCard = ({ user }) => {
  return (
    <div className="user-card">
      <div className="gradient-border" />
      
      <div className="card-content">
        <div className="avatar-container">
          <div className="avatar-ring" />
          <img 
            src={user.avatar} 
            alt={`${user.first_name}'s avatar`}
            className="user-avatar"
          />
        </div>
        
        <div className="user-info">
          <h3 className="user-name">
            {user.first_name} {user.last_name}
          </h3>
          <p className="user-email">
            {user.email}
          </p>
        </div>
      </div>
    </div>
  );
};

export default UserCard;