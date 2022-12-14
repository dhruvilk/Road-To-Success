// Define your own mock data here:
export const standard = () => {
  return {
    //Each task has a status, a title, an Urgency value (High, Medium, or Low), and a Priority value
  tasks: [
    {status_id: '1', title: 'Task 1', details: 'Task 1 Details', urgency: 1, priority: 1, date: '2022-12-20T19:00:00.000Z'},
    {status_id: '2', title: 'Task 2', details: 'Task 2 Details', urgency: 2, priority: 2, date: '2022-12-21T19:00:00.000Z'},
    {status_id: '3', title: 'Task 3', details: 'Task 3 Details', urgency: '', priority: 3, date: '2022-12-22T19:00:00.000Z'},
    {status_id: '4', title: 'Task 4', details: 'Task 4 Details', urgency: 1, priority: 4, date: '2022-12-23T19:00:00.000Z'},
    {status_id: '5', title: 'Task 5', details: 'Task 5 Details', urgency: 2, priority: 5, date: '2022-12-24T19:00:00.000Z'},
  ],
}}
