Oct
  30 - Researched github ci/cd workflows. Spoke to my sister who does qa for a living.
Nov
  2 - Figured out an approach to QA testing. Discussed with groupmates about how we would work together on coming up with brainstorming problems and keeping organized via google sheets. Working on figuring out how to get the automated tests working.
  22 - Tested the Login Component (on the security jawn branch, not yet implemented into main) pushed by Security Team.
  The component worked for the most part. Only issues were non-persistant login and the profile pictures not being displayed upon login.
  23 - Started work on getting the jest file for login setup.
  28 - Continued work on login test file. Ran into issues with rw jest not liking the gapi google login script that we use.
Dec
  1 - Started work on SignUpPage and ForgotPasswordPage jest files. Ran into issues with onSubmit not being called.
  3 - Continued work on SignUpPage and ForgotPasswordPage jest files. Tested other finished components on main branch. Discovered issue of no character limit on any of the textboxes. Tested by spamming 50 or so characters in each of the task view boxes. This broke the display. Alerted purab of this.
  7 - Continued work on Continued work on SignUpPage and ForgotPasswordPage jest files. Ran into the same issues, but got a step closer to progress. One of the problems was Jest disliking toast and calls to another file. Had to remove some code on the test branch and implement literal workaround code supplied by the rw devs.
  8 - Still ran into similar issues. Asked another professor for insight on the onSubmit problem. We troubleshooted for 40 min and gave up. Worked on it the whole day and made 0 progress.
  9 - Finally got stuff working. Used a workaround and solved the errors toast was giving jest.
  10 - Finished tests for SignUpPage, FatalErrorPage, LandingPage, and ForgotPasswordPage.
