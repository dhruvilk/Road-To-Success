import { updateUser } from 'src/services/users'

import { encrypt } from './crypto'

export const authCallback = async ({ code }) => {
  if (code === null) {
    return { result: 'invalid request' }
  }
  const { google } = require('googleapis')
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  )
  try {
    let { tokens } = await oauth2Client.getToken(code)
    const userId = context.currentUser.id //TODO: security check

    const res = await updateUser({
      id: userId,
      input: {
        tokens: JSON.stringify(encrypt(JSON.stringify(tokens))),
      },
    }) //TODO: encrypt tokens

    return { result: 'success' }
  } catch (error) {
    return { result: 'error' }
  }
}
