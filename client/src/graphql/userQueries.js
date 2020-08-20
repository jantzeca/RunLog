import gql from 'graphql-tag';

// admin only
export const getAllUsers = gql`
  query users {
    users {
      id
      email
      fname
      lname
    }
  }
`;

export const getUserQuery = gql`
  query UserById($id: ID!) {
    userById(id: $id) {
      id
      email
      fname
      lname
      age
    }
  }
`;

export const addUser = gql`
  mutation AddUser(
    $email: String!
    $password: String!
    $isAdmin: Boolean!
  ) {
    addUser(email: $email, password: $password, isAdmin: $isAdmin) {
      id
      email
      password
      isAdmin
    }
  }
`;
