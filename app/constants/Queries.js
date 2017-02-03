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

export const UsersQuery = gql`
query Users {
  users {
    id,
    name,
    email,
    customer,
    agent,
    admin,
    created_at,
    updated_at,
  }
}`;

export const RegisterAdminMutation = gql`
mutation RegisterAdmin($input: RegisterAdminInput!) {
  registerAdmin(input: $input) {
    id,
    name,
    email,
    customer,
    agent,
    admin,
    registerd_at,
    updated_at,
  }
}`;

export const RegisterAgentMutation = gql`
mutation RegisterAgent($input: RegisterAgentInput!) {
  createAgent(input: $input) {
    id,
    name,
    email,
    customer,
    agent,
    admin,
    created_at,
    updated_at,
  }
}`;

export const RemoveUserMutation = gql`
mutation RemoveUser($input: RemoveUserInput!) {
  removeUser(input: $input) {
    removed
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
