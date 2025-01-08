import React from "react";

function Header() {
  var time = new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'});

  return (
    <header>
      <h1>Siebel School for Computing and Data Science</h1>
      <h2>Current Time: {time}</h2>
    </header>
  );
}

export default Header;
