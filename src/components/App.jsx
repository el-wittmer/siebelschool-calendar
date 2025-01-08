import React from "react";
import Header from "./Header";
import Event from "./Event";
import axios from "axios";
import convert from "xml-js";

export default function App() {

  const [post, setPost] = React.useState(null);

  const CALENDAR_URL = import.meta.env.VITE_CALENDAR_URL

  axios.get(`${CALENDAR_URL}`)
   .then(function (response) {
       const data = JSON.parse(
        convert.xml2json(response.data, { compact: true, spaces: 2 })
      );
      let events = data.responseWS.publicEventWS;
      setPost({ events });
   })
   .catch(function (error) {
       console.log(error);
   });  

  if (!post) return (
    <div>
    <Header />
    <div>...Loading...</div>
    </div>
  )

  function dateFormat(int){
    var date = new Date();
    date.setDate(date.getDate() + int);
    const day = date.getDate();
    const month = date.getMonth() + 1;
    const year = date.getFullYear();
    return month + '/' + day + '/' + year
  }

  const today = dateFormat(0);
  const tomorrow = dateFormat(1);
  const filteredToday = post.events.filter(item => item.startDate._text == today);
  const filteredTomorrow = post.events.filter(item => item.startDate._text == tomorrow);
  const filteredWeek = post.events.filter(item => Date.parse(item.startDate._text) > Date.parse(tomorrow));

  return (
    <div>
      <Header />
      <div class="note-container">
        <div id="today" class="note-column">
        <h2>Today</h2>
        {filteredToday.map((event) => (
              <Event key={event.eventId._text}
              title={event.title._text}
              startTime={event.startTime._text}
              startDate={event.startDate._text}
              location={event.location._text}
              virtualEvent={event.virtualEvent._text}/>
            ))}
        </div>
        <div id="tomorrow" class="note-column">
        <h2>Tomorrow</h2>
        {filteredTomorrow.map((event) => (
              <Event key={event.eventId._text}
              title={event.title._text}
              startTime={event.startTime._text}
              startDate={event.startDate._text}
              location={event.location._text}
              virtualEvent={event.virtualEvent._text}/>
            ))}
        </div>
        <div id="tomorrow" class="note-column">
        <h2>Upcoming</h2>
        {filteredWeek.slice(0, 4).map((event) => (
              <Event key={event.eventId._text}
              title={event.title._text}
              startTime={event.startTime._text}
              startDate={event.startDate._text}
              location={event.location._text}
              virtualEvent={event.virtualEvent._text}/>
            ))}
        </div>
      </div>
    </div>
  );
};