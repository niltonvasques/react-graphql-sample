import gql from 'graphql-tag';

// Initialize GraphQL queries or mutations with the `gql` tag
export const RequestsQuery = gql`
query Requests {
  requests {
    id,
    title,
    content,
    open,
    created_at,
    updated_at,
  }
}`;

export const RequestQuery = gql`query RequestQuery($id: ID!) {
  request(id: $id) {
    id,
    comments {
      id,
      comment,
      user { name },
      created_at,
      updated_at
    }
  }
}`;

export const SignInMutation = gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) { data { token, user { id, name, email, customer, agent, admin } } }
  }`;

export const SignupMutation = gql`
mutation registerUser($input: RegisterUserInput!) {
  registerUser(input: $input) {
    user {
      id,
      name,
      email,
      customer,
      agent,
      admin
    }
  }
}`;
