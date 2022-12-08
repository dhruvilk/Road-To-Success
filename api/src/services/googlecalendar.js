import { user } from 'src/services/users'

import { decrypt } from './crypto'

export const getEvents = async ({ start, end }) => {
  const { google } = require('googleapis')
  const oauth2Client = new google.auth.OAuth2(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    process.env.REDIRECT_URL
  )

  const userId = context.currentUser.id // TODO: security check
  const usr = await user({ id: userId })

  let tokens = JSON.parse(usr.tokens)
  tokens = decrypt(tokens)
  tokens = JSON.parse(tokens)

  oauth2Client.setCredentials(tokens)

  const calendar = google.calendar({ version: 'v3', auth: oauth2Client })
  const res = await calendar.events.list({
    calendarId: 'primary',
    timeMin: start,
    timeMax: end,
    // maxResults: 100,
    singleEvents: true,
    orderBy: 'startTime',
  })

  const calendarEvents = res.data.items
  if (!calendarEvents || calendarEvents.length === 0) {
    return
  }

  const events = calendarEvents.map((item, i) => {
    const start = item.start.dateTime || item.start.date
    const end = item.end.dateTime || item.end.date
    const event = {
      summary: item.summary || '(No Title)',
      description: item.description,
      start: start,
      end: end,
      id: item.id,
    }
    return event
  })

  return { events }
}
