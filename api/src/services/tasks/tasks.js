import { db } from 'src/lib/db'

export const tasks = () => {
  const user_id = context.currentUser.id
  return db.task.findMany({
    where: { user_id },
  })
}

export const task = ({ id }) => {
  return db.task.findUnique({
    where: { id },
  })
}
export const allTasks = () => {
  return db.task.findMany()
}
export const getByDate = ({ date }) => {
  const user_id = context.currentUser.id

    let dayOne = new Date(date);
    let dayTwo = new Date(date);
    dayTwo.setDate(dayTwo.getDate() + 1);
    dayOne = dayOne.toISOString();
    dayTwo = dayTwo.toISOString();

    console.log("Day one: " + dayOne + " || Day two: " + dayTwo);
  return db.task.findMany({
    where: { user_id, date:{
      gte: dayOne,
      lt: dayTwo
    } },
  })
}

export const createTask = ({ input }) => {
  input.user_id = context.currentUser.id
  return db.task.create({
    data: input,
  })
}

export const updateTask = ({ id, input }) => {
  return db.task.update({
    data: input,
    where: { id },
  })
}

export const deleteTask = ({ id }) => {
  return db.task.delete({
    where: { id },
  })
}

export const Task = {
  User: (_obj, { root }) => {
    return db.task.findUnique({ where: { id: root?.id } }).User()
  },
}


export const getUserTasksOfUrgency = ({ user_id, urgency }) => {
  return db.task.findMany({
    where: { user_id, urgency },
  })
}

export const getUserTasksOfPriority = ({ user_id, priority }) => {
  return db.task.findMany({
    where: { user_id, priority },
  })
}

