import React from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { getUserQuery } from '../../graphql/userQueries';
import './styles/profile.scss';

const Profile = props => {
  console.log(props);

  return (
    <div className='container'>
      <h1>Profile</h1>
      <Query query={getUserQuery} variables={{ id: props.match.params.id }}>
        {({ loading, error, data }) => {
          if (error) {
            alert(error);
            // Custom error popup alert
            return <Redirect to='/' />;
          }
          const dataToReturn = loading ? (
            // Some kind of spinner animation or something
            <h4>Loading...</h4>
          ) : (
            <>
              <h3 className='name'>
                {data.user.fname} {data.user.lname}
              </h3>
              <h3>{data.user.age}</h3>
              <h4>{data.user.email}</h4>
            </>
          );
          return dataToReturn;
        }}
      </Query>
    </div>
  );
};

export default Profile;
