import gql from 'graphql-tag';

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
