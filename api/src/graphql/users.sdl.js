export const schema = gql`
  type User {
    id: Int
    firstName: String!
    lastName: String!
    createdAt: DateTime
  }

  type Query {
    users: [User!]! @requireAuth
    user(id: Int!): User @requireAuth
  }

  input CreateUserInput {
    lastName: String!
    firstName: String!
  }

  input UpdateUserInput {
    lastName: String!
  }

  type Mutation {
    createUser(input: CreateUserInput!): User! @skipAuth
    updateUser(id: Int!, input: UpdateUserInput!): User! @requireAuth
    deleteUser(id: Int!): User! @requireAuth
    emailUser(id: String!): User! @requireAuth
  }
`
