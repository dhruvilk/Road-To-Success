export const schema = gql`
  type Task {
    id: Int!
    user_id: Int!
    status_id: Int!
    title: String
    details: String
    urgency: Int!
    priority: Int!
    date: DateTime
    createdAt: DateTime
  }

  type Query {
    tasks: [Task!]! @requireAuth
    task(id: Int!): Task @requireAuth

    getUserTasksOfUrgency(user_id: Int!, urgency: Int!): [Task!]! @requireAuth
    getUserTasksOfPriority(user_id: Int!, priority: Int!): [Task!]! @requireAuth
    allTasks: [Task!]! @requireAuth
    getByDate( date: DateTime!): [Task!]! @requireAuth
  }

  input CreateTaskInput {
    user_id: Int
    status_id: Int!
    title: String
    details: String
    urgency: Int!
    priority: Int!
    date: DateTime
  }

  input UpdateTaskInput {
    user_id: Int
    status_id: Int
    title: String
    details: String
    urgency: Int
    priority: Int
    date: DateTime
  }

  type Mutation {
    createTask(input: CreateTaskInput!): Task! @skipAuth
    updateTask(id: Int!, input: UpdateTaskInput!): Task! @requireAuth
    deleteTask(id: Int!): Task! @requireAuth
  }
`
