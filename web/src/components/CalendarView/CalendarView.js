
import FullCalendar, { getEventClassNames } from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import React, { useEffect, useState, useRef } from 'react'
import { useLazyQuery } from '@apollo/client'
//@apollo/client/react/hooks/useLazyQuery.js

const GET_EVENTS = gql`
  query calendar_demo($start: String!, $end: String!) {
    getEvents(start: $start, end: $end) {
      events {
        title:summary
        start
        end
      }
    }
  }
`

//export const Loading = () => <div>Loading...</div>

///export const Empty = () => <div>Empty</div>

//export const Failure = ({ error }) => (
//  <div style={{ color: 'red' }}>Error: {error?.message}</div>
//)

const getEvents = () => {

}

export const CalendarView = () => {
  //const [dataRange, setDateRange] = useState({startStr: null, endStr: null});
  const [events, setEvents] = useState(null);

  const [getEvents, { loading, error, data }] = useLazyQuery(GET_EVENTS,{
    onCompleted: () => {
      setEvents(data.getEvents.events)
    }
  });


  const handleDateRangeChange = (dataInfo) => {
    const start = new Date(dataInfo.startStr)
    const end  = new Date(dataInfo.endStr)
    // query larger daterange to prevent loading
    start.setMonth(start.getMonth()-2)
    end.setMonth(end.getMonth()+2)

    getEvents({variables: { start: start.toISOString(), end: end.toISOString()}});
  }

  return (
    <div style={{background:"rgb(255,255,255)"}}>
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        weekends={true}
        events={events}
        expandRows={true}
       //
        contentHeight= {window.innerHeight-194}
        windowResizeDelay={100}
        stickyHeaderDates={true}
        headerToolbar={{
          left: 'prev,next today',
          center: 'title',
          right: 'dayGridMonth,timeGridWeek,timeGridDay'
        }}
        datesSet={handleDateRangeChange}
      />
    </div>
  )
}

export default CalendarView

