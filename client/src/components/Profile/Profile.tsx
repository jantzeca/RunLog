import React from 'react';
import { Query } from 'react-apollo';
import { useParams } from 'react-router-dom';
import { getUserQuery } from '../../graphql/userQueries';
import ErrorAlert from '../Error/ErrorAlert';
import Loading from '../Loading/Loading';
import './styles/profile.scss';

const Profile = () => {
  const { id } = useParams();
  return (
    <div className='container'>
      <h1>Profile</h1>
      <Query query={getUserQuery} variables={{ id }}>
        {({ loading, error, data }: {loading: any, error?: any, data: any}) => {
          if (error) {
            return <ErrorAlert message={error.message} />
          }
          return loading ? (
            <Loading />
          ) : (
            <>
              <h3 className='name'>
                {data.userById.fname} {data.userById.lname}
              </h3>
              <h3>{data.userById.age}</h3>
              <h4>{data.userById.email}</h4>
            </>
          );
        }}
      </Query>
    </div>
  );
};

export default Profile;
