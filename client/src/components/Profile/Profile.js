import React, { useState /* , useEffect */ /*, useContext */ } from 'react';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import { getUserQuery } from '../../graphql/userQueries';
import './styles/profile.scss';

const Profile = props => {
  let [id, setId] = useState(props.match.params.id); // May not even need this

  // let [state, setState] = useState({
  //   email: '',
  //   fname: '',
  //   lname: '',
  //   age: 0,
  //   height: 0,
  //   weight: 0.0,
  //   measurementSystem: ''
  // });

  // useEffect(() => {
  //   const { id } = props.match.params;
  //   setId(id);
  // }, [props]);

  return (
    <div className='container'>
      <h1>Profile</h1>
      <Query query={getUserQuery} variables={{ id }}>
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
