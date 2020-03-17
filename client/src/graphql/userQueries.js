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

export const SignIn = gql`
  query signin($email: String, $password: String) {
    signin(email: $email, password: $password) {
      id
      token
    }
  }
`;
