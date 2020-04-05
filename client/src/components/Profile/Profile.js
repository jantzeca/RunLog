import React from 'react';
import { Query } from 'react-apollo';
import { useParams } from 'react-router-dom';
import { getUserQuery } from '../../graphql/userQueries';
import ErrorAlert from '../Error/ErrorAlert';
import './styles/profile.scss';

const Profile = () => {
  let { id } = useParams();
  return (
    <div className='container'>
      <h1>Profile</h1>
      <Query query={getUserQuery} variables={{ id }}>
        {({ loading, error, data }) => {
          if (error) {
            alert(error);
            return <ErrorAlert message={'Error message to display'} />
          }
          const dataToReturn = loading ? (
            <h4>Loading...</h4>
            ) : (
              <>
              <h3 className='name'>
                {data.userById.fname} {data.userById.lname}
              </h3>
              <h3>{data.userById.age}</h3>
              <h4>{data.userById.email}</h4>
            </>
          );
          return dataToReturn;
        }}
      </Query>
    </div>
  );
};

export default Profile;
