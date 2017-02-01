import gql from 'graphql-tag';

// Initialize GraphQL queries or mutations with the `gql` tag
export const RequestsQuery = gql`query Requests { requests { id, title, content, open } }`;
export const SignInMutation = gql`
  mutation signIn($input: SignInInput!) {
    signIn(input: $input) { data { token, user { id, name, email, customer, agent, admin } } }
  }`;
