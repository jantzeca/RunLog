import React, { useEffect, useState } from 'react';
import { ajaxRequest } from '../../utils/utils';
// import { Query } from 'react-apollo';
// import { NavLink } from 'react-router-dom';
// import { getAllUsers } from '../../graphql/userQueries';

import './styles/dashboard.scss';

const AdminDashboard = props => {
  return (
    <div className='dashboard'>
      <h1>Admin Dashboard</h1>
      <Query history={props.history} />
    </div>
  );
};

const Query = history => {
  let [userInfo, setUserInfo] = useState({});
  useEffect(() => {
    const fetchData = async () => {
      // let res = await fetch('/api', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //     Accept: 'application/json'
      //   },
      //   body: JSON.stringify({
      //     query: `
      //       query users {
      //         users {
      //           id
      //           email
      //           fname
      //           lname
      //         }
      //       }
      //     `,
      //     variables: {}
      //   })
      // });
      // console.log(res);
      // res = await res.json();
      // console.log(res);
      // setUserInfo(res);
      const body = JSON.stringify({
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json'
        },
        body: JSON.stringify({
          query: `
            query users {
              users {
                id
                email
                fname
                lname
              }
            }
          `,
          variables: {}
        })
      });
      const requestBody = { body, headers: {}, method: 'POST' };
      let res = ajaxRequest(requestBody);
      console.log(res);
    };
    fetchData();
  }, []);

  return (
    <div className='users-container'>
      {userInfo ? (
        <div className='loading-container'>
          <div className='loading'></div>
        </div>
      ) : (
        userInfo.users.map(user => {
          return (
            <div
              className='user-card'
              key={user.id}
              onClick={() => history.push(`/profile/${user.id}`)}
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
        })
      )}
    </div>
  );
};

// TODO: make this admin dashboard later
// const Dashboard = props => {
//   return (
//     <div className='dashboard'>
//       <h1>Admin Dashboard</h1>
//       <Query query={getAllUsers}>
//         {({ loading, error, data }) => {
//           if (error) {
//             alert(error);
//           }
//           return loading ? (
//             <div className='loading-container'>
//               <div className='loading'></div>
//             </div>
//           ) : (
//             <div className='users-container'>
//               {data.users.map(user => {
//                 return (
//                   <div
//                     className='user-card'
//                     key={user.id}
//                     onClick={() => props.history.push(`/profile/${user.id}`)}
//                   >
//                   <p>
//                     <span className='user-name'>
//                       {user.fname} {user.lname}
//                     </span>
//                   </p>
//                   <p>
//                     <span className='user-email'>{user.email}</span>
//                   </p>
//                 </div>
//                 );
//               })}
//             </div>
//           );
//         }}
//       </Query>
//     </div>
//   );
// };

export default AdminDashboard;
