import React, { useContext, useEffect, useState } from 'react';

import Card from '../../shared/components/UIElements/Card';
import LoadingSpinner from '../../shared/components/UIElements/LoadingSpinner';
import { useHttpClient } from '../../shared/hooks/http-hook';
import { AuthContext } from '../../shared/context/auth-context';

import './Profile.css';

const Profile = () => {
  const auth = useContext(AuthContext);
  const { isLoading, error, sendRequest, clearError } = useHttpClient();
  const [profile, setProfile] = useState({});

  useEffect(() => {
    const getProfile = async () => {
      const responseData = await sendRequest(
        `${process.env.REACT_APP_USER_SERVICE}/profile`,
        undefined,
        undefined,
        { Authorization: `Bearer ${auth.token}` }
      );
      setProfile(responseData);
    };
    getProfile();
  }, []);

  return (
    <React.Fragment>
      {isLoading && <LoadingSpinner asOverlay />}
      <h2 className='profile-title'>Profile</h2>
      {!isLoading && (
        <Card className='profile'>
          <div className='profile__content'>
            <h4>Name:</h4>
            <p>{profile.name}</p>
            <hr />
            <h4>Email ID:</h4>
            <p>{profile.email}</p>
            <hr />
            <h4>Age:</h4>
            <p>{profile.age}</p>
            <hr />
            <h4>User Type:</h4>
            <p>{profile.userType}</p>
          </div>
        </Card>
      )}
    </React.Fragment>
  );
};

export default Profile;
