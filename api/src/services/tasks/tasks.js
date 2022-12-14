import { prismaVersion } from '@redwoodjs/api'

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

  let dayOne = new Date(date)
  let dayTwo = new Date(date)
  dayTwo.setDate(dayTwo.getDate() + 1)
  dayOne = dayOne.toISOString()
  dayTwo = dayTwo.toISOString()

  console.log('Day one: ' + dayOne + ' || Day two: ' + dayTwo)
  return db.task.findMany({
    where: {
      user_id,
      date: {
        gte: dayOne,
        lt: dayTwo,
      },
    },
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

export const rollTasksOver = async ({ date }) => {
  //================================================================
  //===================== WHAT THIS DOES ===========================
  //================================================================
  //| this function will first determine if the day is a "new day".|
  //| a "new day" is defined as a day with a date matching the cu- |
  //| rent date and with no tasks - e.g. it's not a new day if you |
  //| have already used the app and tasks exist. Similarly, it is  |
  //| not a new day if tasks are completed or deleted. Then, it    |
  //| will roll tasks forward from the last date with tasks being  |
  //| present, up to six days in the immediate past.               |
  //|                                                              |
  //| * note all debug consoles are preceded by this comment:      |
  //|                          //DBC                               |
  //================================================================

  //DBC
  //console.log('beginning query procedure with algorithm payload!')
  //console.log(date)
  //console.log('above is input date!')
  var user_id = context.currentUser.id //to ensure correct lists

  //checking if it is a new day:
  var newDay = false

  //setting up date range
  var today = new Date(date)
  var tomorrow = new Date(date)

  var trueToday = new Date()
  tomorrow.setDate(tomorrow.getDate() + 1)

  //DBC
  //console.log(today)
  //console.log('is today')

  var todate = new Date(
    today.getFullYear(),
    today.getMonth(),
    today.getDate(),
    0,
    0,
    0
  )
  var tomate = new Date(
    tomorrow.getFullYear(),
    tomorrow.getMonth(),
    tomorrow.getDate(),
    0,
    0,
    0
  )

  //DBC
  /*
  console.log(todate)
  console.log('was today at midnight (todate)')

  console.log(tomate)
  console.log('is tomorrow at midnight (tomate)')
  */

  //================================================================
  //====================== TASK HANDLING ===========================
  //================================================================
  //| Tasks are defined to be "on some day" if tasks have a        |
  //| date field that falls in the range of 05:00:00 on a certain  |
  //| day (inclusive) to 05:00:00 on the next day (exclusive). Any |
  //| task which is marked as either 4 (Completed) or 5 (Deleted)  |
  //| will not be rolled over. However, for the purposes of decid- |
  //| ing a new day, we can assume that if tasks exist, *even if   |
  //| they are of status 4 or 5, it is not a new day*. This is     |
  //| because this function would have already run prior to the    |
  //| creation of those tasks.                                     |
  //================================================================

  //now we check if tasks exist today, the first day. if they don't,
  //then it's a new day
  //because rollover has not occurred yet nor has the user made
  //any new tasks and/or completed/deleted them
  var checkList = await db.task.findMany({
    where: {
      user_id,
      date: {
        gte: todate,
        lt: tomate,
      },
    },
  })

  //DBC
  //console.log(checkList)

  todate.setDate(todate.getDate() - 1)
  tomate.setDate(tomate.getDate() - 1)

  //DBC
  //console.log(todate)
  //console.log(tomate)

  //if the list of tasks for the day is empty, and the real, actual date today is between
  //the two boundary stamps (todate and tomate), then
  //it is a new day. therefore, we can go ahead.
  if (checkList.length == 0 && trueToday > todate && trueToday < tomate) {
    newDay = true
    //DBC
    //console.log('its a brand new day')
  } else {
    //this more of just an exit signal. the returned list isn't
    //actually going to be doing anything, so we leave and just return
    //also if we're here it means the datepicker gave us a date that's
    //in the future, in the past, or that the current day has tasks already
    //(which means this function has run before, as it must)

    //DBC
    //console.log('YOU HAVE BEEN HERE BEFORE')
    return checkList
  }

  var counter = 7
  counter--
  //here's the main event - if it is a new day, let's get started!
  //(i know this newday is redundant but its for readability promise)
  if (newDay) {
    //first, we want to make sure that we account for possible days of being away.
    //we do this by going back at most *six days* in the past to look for
    //any tasks. if no tasks are present within seven days in the past, including today,
    //then we simply have nothing to roll over.
    //
    //If you leave for a over a week, just put that stuff back in again bruh

    //creating necessary variables
    counter = 6 //we only go back a week maximum

    //let's do the time warp again
    while (checkList.length == 0 && counter > 0) {
      //shift our bounds by one day back
      todate.setDate(todate.getDate() - 1)
      tomate.setDate(tomate.getDate() - 1)

      //get list of tasks on THIS day now
      var checkList = await db.task.findMany({
        where: {
          user_id,
          date: {
            gte: todate,
            lt: tomate,
          },
        },
      })

      //================================================================
      //====================== TASK NICENESS ===========================
      //================================================================
      //| Tasks are nice because it's impossible for tasks that you    |
      //| want to rollover to be behind a day that contains a nonzero  |
      //| number of tasks of which none need to be rolled over. This   |
      //| is impossible because if you made tasks that day which were  |
      //| marked as completed or deleted, this algorithm would have    |
      //| already run. Therefore, that list would contain the tasks    |
      //| you want behind it, too, because they'd have been caught     |
      //| already by this algorithm. Free will isn't real.             |
      //================================================================

      //if we've found a list of tasks, retroactively it must be the one containing
      //what we need. so let's stop here and start pulling them back up based
      //on how much our counter has gone back
      if (checkList.length != 0) {
        break
      }

      counter--
    }

    //real meat and potato hours start here, buckle up bucko. i wonder where the word bucko comes from
    while (counter < 7) {
      //now that we have our first date, we can begin to section out our list of tasks
      //into three groups, based on urgency, so we can preserve relative priority

      //doing aList
      var aList = await db.task.findMany({
        where: {
          user_id,
          AND: [
            {
              date: {
                gte: todate,
                lt: tomate,
              },
            },
          ],
          AND: [{ urgency: 1 }],
        },

        orderBy: {
          priority: 'asc',
        },
      })

      //doing bList
      var bList = await db.task.findMany({
        where: {
          user_id,
          AND: [
            {
              date: {
                gte: todate,
                lt: tomate,
              },
            },
          ],
          AND: [{ urgency: 2 }],
        },

        orderBy: {
          priority: 'asc',
        },
      })

      //doing cList
      var cList = await db.task.findMany({
        where: {
          user_id,
          AND: [
            {
              date: {
                gte: todate,
                lt: tomate,
              },
            },
          ],
          AND: [{ urgency: 3 }],
        },

        orderBy: {
          priority: 'asc',
        },
      })

      //end of list making

      //aList, bList, and cList may contain tasks of certain urgencies and priorities

      //now we will go through each list, moving them
      //to the next day using the upper bound
      //as it is exclusive from today.

      var holTitle = new String()
      var holUse = 0

      //==================================
      //=======BEGIN REINDEX BLOCK========
      //==================================

      var prioCount = 1 //for re-indexing tasks

      let zyx = 0
      //INDEXING A
      for (let k = 0; k < aList.length; k++) {
        if (aList[k].status_id == 4 || aList[k].status_id == 5) {
          zyx = 1
        } else {
          holUse = aList[k].user_id
          holTitle = aList[k].title

          const MakeTask = await db.task.create({
            data: {
              user_id: holUse,
              status_id: 4,
              title: holTitle,
              urgency: 1,
              priority: prioCount,
              date: tomate,
            },
          })

          prioCount++
        }
      }

      prioCount = 1
      //INDEXING B
      for (let k = 0; k < bList.length; k++) {
        if (bList[k].status_id == 4 || bList[k].status_id == 5) {
          zyx = 1
        } else {
          holUse = bList[k].user_id
          holTitle = bList[k].title

          const MakeTask = await db.task.create({
            data: {
              user_id: holUse,
              status_id: 4,
              title: holTitle,
              urgency: 2,
              priority: prioCount,
              date: tomate,
            },
          })

          prioCount++
        }
      }

      prioCount = 1
      //INDEXING C
      for (let k = 0; k < cList.length; k++) {
        if (cList[k].status_id == 4 || cList[k].status_id == 5) {
          zyx = 1
        } else {
          holUse = cList[k].user_id
          holTitle = cList[k].title

          const MakeTask = await db.task.create({
            data: {
              user_id: holUse,
              status_id: 4,
              title: holTitle,
              urgency: 3,
              priority: prioCount,
              date: tomate,
            },
          })

          prioCount++
        }
      }
      //==================================
      //========END REINDEX BLOCK=========
      //==================================

      //now our dates march forward
      todate.setDate(todate.getDate() + 1)
      tomate.setDate(tomate.getDate() + 1)
      counter++
      //these will keep going until counter is 7. if we have tasks left over then
      //cycle will repeat
    }

    return checkList
  }
}
