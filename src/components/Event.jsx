import React from "react";

export default function Event(props) {

  const [virtual, setVirtual] = React.useState(props.virtualEvent);

  return (
    <div class="note">
        <h1>{props.title}</h1>
        <br />
        {virtual === "true" ? <p>Online via Zoom</p> : <p>{props.location}</p>}
        <p>{props.startDate}</p>
        <p>{props.startTime}</p>
        <br />
    </div>
  );
};