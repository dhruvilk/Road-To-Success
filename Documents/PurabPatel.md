# 490 Project: Road to Success <!-- omit in toc -->
**Project Manager**
- [Progress Updates](#progress-updates)
  - [*10/22/22*](#102222)
  - [*10/23/22*](#102322)
  - [*10/25/22*](#102522)
  - [*10/26/22*](#102622)
  - [*10/30/22*](#103022)
  - [*11/02/22*](#110222)
  - [*11/06/22*](#110622)
  - [*11/07/22*](#110722)
  - [*11/17/22*](#111722)
  - [*11/22/22*](#112222)
  - [*11/28/22*](#112822)
  - [*11/30/22*](#113022)
  - [*12/1/22*](#12122)
  - [*12/2/22*](#12222)
  - [*12/3/22*](#12322)
  - [*12/5/22*](#12522)
  - [*12/9/22*](#12922)
- [Current Status](#current-status)
- [Completed Tasks](#completed-tasks)

# Progress Updates
## *10/22/22*
- Created War-Room thread
  - Meant as a distraction free chat for everyone in team kenny to discuss general design and consensus.
  - Announced plans of new team assignments based on preferences, didn't change teams around that much. Most important change was that I asked Raymond to do UI and he agreed.
  - Asked 4 different team specific questions so everyone could get started deciding how they would work on their part of the project.
  - Team UI - Discuss design for landing page, how will users be able to see calendar, todo list, profile, login/signup. You can use Figma to prototype a website layout.
  - Team API - Discuss design for database schema, what will be stored for user credentials, what information will be required for Appointments and Tasks?
  - Team Security - How will users Authenticate (In-House username/password auth? Google Identity services? Firebase? oAuth?) and access personal calendar and todo list.
  - Team DevOps/QA - Discuss schedules/strategies for testing current  build. Look into CI/CD for GitHub.

- Created TODO thread
  - Meant to provide the relevant teams with a concise description with what they need to get done for the week
  - Assigned everyone to provide Dhruv with their Github usernames
  - Assigned everyone to create their markdown files in the documents folder.
- Created Stand Ups thread
  - Meant to give the team, myself, and the professor updates on what everyone else is doing, so they can pace accordingly
- Created Resources thread
  - Meant to provide quick access to relevant information regarding the project, and current design plans.
-
## *10/23/22*
- Added link to Figma (Cool UI designing tool I found that allows people to collaborate on a site to quickly protype UI pages and outlines)
- Gave a quick update on StandUp thread to encourage others to use the StandUp thread as well

## *10/25/22*
- Created separate threads for each team to discuss team specific challenges and design choices.
- Set hard deadline for Team UI to create a basic outline for several pages on Figma and post on UI thread
- Set hard deadline for Team Security to decide on an authentication method
- Set hard deadline for Team API to come up with a database schema
- Set hard deadline for Team DevOps/QA to decide whether or not github CI/CD was worth implementing at this stage of the project.

## *10/26/22*
- Gave feedback on UI, Security, and API design decisions

## *10/30/22*
- Created TaskView
  - Will have a date picker at the top and name of the component "Todo list"
  - Will have TaskCell at the bottom, displaying all the relevant tasks for the selected date as a passed prop
- Created TaskCell
  - Will query the DB to fetch all tasks from selected date and display them using the TaskCard component
- Created TaskCard
  - Will have states to store the passed in status, urgency, priority
  - Will display them inline
  - Will allow user to change the variables for each task interactively, without a save button.
- [Related Commit](https://github.com/dhruvilk/Road-To-Success/commit/c4f7570e0017287c5dddf53b89f6a2dbf623c4e8)

## *11/02/22*
- Helped guide security team with OAuth implementation.

## *11/06/22*
- Got consensus on task display functionality, how we want the task items to be rolled over if at all.
  - Agreed that a task will expire on the day of creation, but the user will have the option to renew the task when looking at past dates and tasks for those days
- Fixed date selection feature on task view. [Related Commit](https://github.com/dhruvilk/Road-To-Success/commit/66a804fb6ec2fa521a6a66040e1b7221dedb05ad)
  - The problem was that the html input type date would be of format yyyy-mm-dd but the format for on screen display and api use is mm-dd-yyyy
  - The input type for html is also in string, so the left and right button for incrementing and decrementing date would need to go through string manipulation, and adjust the html input element also.
  - The left and right buttons are separate from the html element, so changing the date using the buttons would need to change the date variable, and the html input element to reflect currently selected date.
  - This would mean a conversion would need to be made between the html format and the mm-dd-yyyy format.

## *11/07/22*
- Added status cycling functionality [Related Commit](https://github.com/dhruvilk/Road-To-Success/commit/4c3596f119823739e8c04f0fd25f6d65119ca12d)
  - The status on a task item needs to change without a save or ok button to confirm. I decided the best way to do this would be to make the displayed status a button, when clicked would change the status and go from Not Started -> Started -> Completed -> rolled over
  - This was unexpectedly hard because I was trying to use the useEffect hook to initialize a status variable on load using the status prop from cells. This would cause the component to do an infinite loop, updating the the status variable, refreshing the page, updating the status variable. Had no idea why this was happening.
  - Realized an easier way to do it using useState hook. I will use this method for updating urgency
  - Will use the same method to update urgency and priority

## *11/17/22*
- Started changing the format of Appointments Cell to have parameters for start date, end date, and view type [Related Commit](https://github.com/dhruvilk/Road-To-Success/commit/3d1aea2264dfe6e934e7dbe2945e8c6419bce0a4#diff-106476b57a0cce028efacd29c2b45ee08d31b641f0e10a24474e943d12c65e50)
  - for viewtype of daily, end date will be one day ahead of start date, and will fetch all appointments for one day
  - for viewtype of weekly, start date and end date will fetch 7 days worth of events
  - for viewtype of monthly, start date and end date will fetch that month's number of days worth of events
  - for all views, the return will be different because depending on each view the style of display and visual will change

## *11/22/22*
[Related Commit](https://github.com/dhruvilk/Road-To-Success/commit/b74e9c807dae30fba4a9aada3eaaa6c0a7a7cbbf)
- Added Mock data for appointments cell to fetch from
- Appointment item returns different looking cards for what type of view it is.
- get duration function gets the amount of time an event will take and scale the event accordingly
- Appointments cell now fetches all events, and sorts and filters the events
- daily view return for appointmentscell has basic string dump functionality, also appointmentitem for view type daily scales based on duration.

## *11/28/22*
- Helped merge 3 major branches into a test branch, now the functionality of the test branch allows the user to register, login, and sync with the google calendar api. The fetched events are displayed on the landing page
- Related Commits:
  - [Commit 1](https://github.com/dhruvilk/Road-To-Success/commit/46a13b070cc1a4dc71a8c61d0b0fcd3631a39e84)
  - [Commit 2](https://github.com/dhruvilk/Road-To-Success/commit/a60a7162ae02e720cc62b701a4e7b71ab2ce45f3)
  - [Commit 3](https://github.com/dhruvilk/Road-To-Success/commit/304361e21b2b8db803b803c4d16a1968771b8b6f)


## *11/30/22*
- Fixed bug issues with getting rid of homepage page, the correct page is landingpage.
- Started revamping Abby's css file with new colors and styles that don't disrupt elements globally
- Related Commits:
  - [Commit 1](https://github.com/dhruvilk/Road-To-Success/commit/6601b4641b11e822b12f34b2e424e3fb28d6d894)
  - [Commit 2](https://github.com/dhruvilk/Road-To-Success/commit/65f2b63b659cecbcb2a0e896ec29c63486643149)

## *12/1/22*
- Added new css styling to reorganize styles.css
- New color theme and slightly different styling
- Related Commits:
  - [Commit 1](https://github.com/dhruvilk/Road-To-Success/commit/64b69e8695cb4389084dd77c661439949f042188)
  - [Commit 2](https://github.com/dhruvilk/Road-To-Success/commit/2e7ea8ed6e99d293d96b2278cf0681e65f3b9860)
- Right after this change, I tried to merge progress with Tasks_api branch because the API team notified me that the api functions for task components were done. This is where I messed up and merged the wrong way, reverted, got confused, and ended up cherry picking commits from the tasks_api branch.
- Cleaned up some of the test task components/pages the API team had set up to see if the api calls worked. Started implementing the api into TasksCell and TaskView [Related Commit](https://github.com/dhruvilk/Road-To-Success/commit/7a0eb86e10b45b5e655c9b1b01a43293aaff78f0)
- Made a task input form to allow user to create a new task. I started trying to implement the api functionality to taskview. This has basic styling and I couldn't figure out why it wasn't updating the task db with the new task. Handed it off to Mike B. to finish. [This is my progress with it](https://github.com/dhruvilk/Road-To-Success/commit/4a56d895df0960664c949cdcf8886ed83c0fd724)

## *12/2/22*
- Abby started working on putting the logo into the nav and finished, so I merged into the branch I was working out of. I had to fix the styling again because the logo wasn't centered and was pushing the name of the app upwards.
  - [Related Commit](https://github.com/dhruvilk/Road-To-Success/commit/1db78590eb78d9573c6735530fe79b827fcf4398)
- Added Particles.js to the project to spice up the background of the landing page.
  - [Related Commit](https://github.com/dhruvilk/Road-To-Success/commit/d19d47f105f012f8c33a3963867234ab5b633708)

## *12/3/22*
- Fixed Particle.js plugin glitches as they weren't showing up sometimes, and didn't initiate others.
  - [Related Commit](https://github.com/dhruvilk/Road-To-Success/commit/e8942d1b84f544c94ef803be97abf749f2811c27)
- I started working on adding api support to the update functionality. Since I added cycling of status, priority, and urgency with button clicks, I needed the update on the db to happen on click. I did this with a useEffect hook listening for changes to the states I assigned to each variable. I then used useRef to make sure it was't updating the db on mount, and all the rendered tasks. That would break the db from how many times it updated.
- I also added a delete button to set the task's status to 5, which is our code for deleted, and updates the task on the db to have a status of 5 as well. 5 as a status prevents tasks from being displayed.
  - [Related Commit](https://github.com/dhruvilk/Road-To-Success/commit/657aeb2f9994d427566a368701c97c647b9bcd06)
- With these changes, TaskView is almost complete, it just needs to fetch by the date picker in taskview and not all tasks. Another thing was the sorting of the tasks by priority and urgency. These two things I assigned the API team to do, as Mike and the API team have been very responsive and been able to meet deadlines while outputting good code quality.

## *12/5/22*
- Had set up a meeting with UI to assign an alternative method to the calendar view, since the calendar view would not be done in time. Just before the meeting Evelyn had committed a static MonthlyView page with no functionality. It was styled well and would have been great to have 3 weeks prior to the 5th of December. Aleyna had a clock built into the frame of the daily view, said she would be done by the 4th, but no commits or updates on that day. Monthly and daily were assigned very early, so I was shocked to see that was all the progress that was done. Raymod was assigned to weekly view sometime before around 11/18, there was no mention of progress or update, just a promise it would be done before 12/4. All deadlines were missed for the calendar views, and I had to scrap my appointmentsCell work because it wouldn't have mattered if there was no supporting view that used it. So I decided to switch to FullCalendar as it would be easier and quicker to implement. I was experimenting with FullCalendar to make sure I could guide UI team if any problems came up, and realized implementing FullCalendar is super simple. I was done with it before the meeting even started, and I would have given them credit for it by not committing my work, but they couldn't make the meeting we agreed on for 12/5. Aleyna gave me an early headsup before the meeting at 3, that she would be able to join at 4:30. The others had no mention of what time they would be available, until the day was almost already over. I ended up committing the FullCalendar work I did, because we needed to move forward and could not afford anymore delays. [Commit for FullCalendar Implementation](https://github.com/dhruvilk/Road-To-Success/commit/693e3376dd9bedb69f0786cc3c18a9e2b82fa30a)

## *12/9/22*
- Had a meeting with Dhruv to go through all the stale branches and unnessessary components/pages
  - Appointmentlistcell
  - Appointmentscell
  - Calendarview
  - Dailyview
  - Monthlyview
  - Mainylayout
  - Taskspage

# Current Status
- Working on adding the date picker component to the FullCalendar.

# Completed Tasks
- Task View
- Task Cell
- Task Card
- The whole Calendar View

