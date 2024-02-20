import React, { useState } from "react";
import { Calendar, momentLocalizer } from "react-big-calendar";
import moment from "moment";
import "react-big-calendar/lib/css/react-big-calendar.css";

const TeamCalendar = () => {
  const localizer = momentLocalizer(moment);
  const [events, setEvents] = useState([
    {
      title: "Team Meeting",
      start: new Date(2024, 1, 15, 10, 0), // year, month, day, hour, minute
      end: new Date(2024, 1, 15, 11, 0),
    },
    // Add more events as needed
  ]);

  return (
    <div style={{ height: "500px" }}>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ margin: "20px" }}
      />
    </div>
  );
};

export default TeamCalendar;
