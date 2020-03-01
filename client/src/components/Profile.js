import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';

const getUserQuery = gql`
  query user($id: ID) {
    user(id: $id) {
      id
      email
      fname
      lname
      age
    }
  }
`;

class Profile extends Component {
  state = {
    id: '', // temp
    email: '',
    fname: '',
    lname: '',
    age: 0,
    height: 0,
    weight: 0.0,
    measurementSystem: ''
  };

  async componentDidMount() {
    const { id } = this.props.match.params;
    await this.setState({ id: id });
    await this.doQuery();
  }

  doQuery = () => {
    fetch('/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        query: `query user($id: ID) {
            user(id: $id) {
              id
              email
              fname
              lname
              age
            }
          }`,
        variables: {
          id: this.state.id
        }
      })
    })
      .then(r => r.json())
      .then(data => {
        const { id, email, fname, lname, age } = data.data.user;
        this.setState({
          id,
          email,
          fname,
          lname,
          age
        });
      })
      .catch(err => console.error(err));
  };

  render() {
    const { fname, lname, email, age } = this.state;
    return (
      <>
        <h1>Profile</h1>
        <Query query={getUserQuery} variables={{id: this.state.id}}>
          {({loading, error, data}) => {
            if (error) {
              console.log(error);
              return <Redirect to="/" />
            }
            const dataToReturn = loading ? (
              <h4>Loading...</h4>
            ) : (
              <>
                <h3>{data.user.fname} {data.user.lname}</h3>
                <h3>{data.user.age}</h3>
                <h4>{data.user.email}</h4>
              </>
            );
            return dataToReturn;
          }}
        </Query>
        {/* <h2>
          {fname} {lname}
        </h2>
        <h3>{age}</h3>
        <h4>{email}</h4> */}
      </>
    );
  }
}

export default Profile;
