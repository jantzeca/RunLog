import React from 'react';
import { Query } from 'react-apollo';
import { useHistory, useLocation } from 'react-router-dom';
import { getAllUsers } from '../../graphql/userQueries';

import './styles/dashboard.scss';

// TODO: make this admin dashboard later
const AdminDashboard = props => {
  let history = useHistory();
  let location = useLocation();

  return (
    <div className='dashboard'>
      <h1>Admin Dashboard</h1>
      <Query query={getAllUsers}>
        {({ loading, error, data }) => {
          if (error) {
            alert(error);
          }
          return loading ? (
            <div className='loading-container'>
              <div className='loading'></div>
            </div>
          ) : (
            <div className='users-container'>
              {data.users.map(user => {
                return (
                  <div
                    className='user-card'
                    key={user.id}
                    onClick={() => {
                      const { from } = location.state || {
                        from: { pathname: `user/profile/${user.id}` }
                      };
                      history.replace(from);
                      // props.history.push(`/profile/${user.id}`)
                    }}
                  >
                  <p>
                    <span className='user-name'>
                      {user.fname} {user.lname}
                    </span>
                  </p>
                  <p>
                    <span className='user-email'>{user.email}</span>
                  </p>
                </div>
                );
              })}
            </div>
          );
        }}
      </Query>
    </div>
  );
};

export default AdminDashboard;
