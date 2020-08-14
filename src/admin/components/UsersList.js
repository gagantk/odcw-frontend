import React from 'react';

import Card from '../../shared/components/UIElements/Card';
import UserItem from './UserItem';
import './UsersList.css';

const UsersList = (props) => {
  if (props.items.length === 0) {
    return (
      <div className='center'>
        <Card>
          <h2>No users found.</h2>
        </Card>
      </div>
    );
  }

  return (
    <Card className='users-list'>
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Age</th>
            <th>User Type</th>
          </tr>
        </thead>
        <tbody>
          {props.items.map((user) => (
            <UserItem
              key={user._id}
              id={user._id}
              name={user.name}
              email={user.email}
              age={user.age}
              userType={user.userType}
              onDelete={props.onDeleteUser}
            />
          ))}
        </tbody>
      </table>
    </Card>
  );
};

export default UsersList;
