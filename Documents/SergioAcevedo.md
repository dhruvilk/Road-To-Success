# Readme


Sergio Acevedo, security team (08) readme file. Teammates include Dhruvil Kansara, and Thomas Bethea.

Worked with Dhruv and Tom to get account creations/logins working properly. Doing research together/on our own, but most of the coding was done on Dhruv's computer. We went from trying to use Auth0 for the authenticaion, to OAuth, since Auth0 would require for the user to log in twice. After doing enough research, and trying to get the creation of account feature working properly, we ended up on Redwoods on dbAuth, which has some skeletons for more features to be coded into the app.

I created a forgot-password feature where the user can input his/her e-mail. If the e-mail is in the database, a link with a reset token will be sent to the user to create a new password. If the inputed e-mail is not in the database, a 'user does not exist' error will be prompted to the user. Upon successful e-mail submission, an e-mail will be sent to the user's...e-mail. There will be a link with a reset-password token taking the user back to the app. The user will enter a new password, and be logged into the account afterwards. The e-mail sending service uses Send in Blue. An e-mail service that allows up to 300 e-mail sends for free per day. This requires an extra environmental variable which has the SMTP key from the Send in Blue account.
The feature seemed to cause signup pages and login pages not work properly with each other. This may have been from updating the branch in the middle of working on this feature, or some residue from a previous attempt at implementing the feature. Upon doing the forgot password service again from scratch, the problem seem to be resolved. 
