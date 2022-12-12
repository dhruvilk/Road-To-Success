# Readme

Sergio Acevedo, security team (08) readme file.
Teammates include Dhruvil Kansara, and Thomas Bethea.

Worked with Dhruv and Tom to get account creations/logins working properly. Doing research together/on our own, but most of the coding we did from Dhruv's computer. We went from trying Auth0, to oAUth, trying out different ways of authenticating, and finally decided on Redwood's own dbAuth.

I created a forgot-password feature where the user can input his/her e-mail. If the e-mail is in the database, a link with a reset token will be sent to the user to create a new password. If the inputed e-mail is not in the database, a 'user does not exist' error will be prompted to the user. The user will click on the link via e-mail, which contains a token prompting the user to enter a new password. Upon inputing the new password, the change will be saved, and the user will be logged in to the calendar app.

Originally, the changes to user password were going to be implemented from scratch. With manual coding of database queries and writes, but after enough attempts/research on RedwoodJS, I discovered that there are some functions already packaged with Redwood that, with some tweaking and additions, could allow for this feature to get implemented more seamlessly using dbAuth.

First attempt to merge forgot-password feature resulted in login page not properly leading to the signup page. And so, a second attempt was done "from scratch" where using my old code as reference, I only made the changes necessary that resulted in a working password. As if the previous changes that were done trying to get the feature to work never happened. This fixed the issue. It's possible that a branch update in the middle of working on this feature broke something. So doing it from scratch with the correct solution fixed it.
