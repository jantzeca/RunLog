import React, { Component } from 'react';
import gql from 'graphql-tag';
import { Query } from 'react-apollo';
import { Redirect } from 'react-router-dom';
import './styles/profile.scss';

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
    id: '',
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
  }

  render() {
    const { fname, lname, email, age } = this.state;
    return (
      <div className="container">
        <h1>Profile</h1>
        <Query query={getUserQuery} variables={{id: this.state.id}}>
          {({loading, error, data}) => {
            if (error) {
              alert(error)
              // Custom error popup alert
              return <Redirect to="/" />
            }
            const dataToReturn = loading ? (
              <h4>Loading...</h4>
            ) : (
              <>
                <h3 className="name">{data.user.fname} {data.user.lname}</h3>
                <h3>{data.user.age}</h3>
                <h4>{data.user.email}</h4>
              </>
            );
            return dataToReturn;
          }}
        </Query>
      </div>
    );
  }
}

export default Profile;
