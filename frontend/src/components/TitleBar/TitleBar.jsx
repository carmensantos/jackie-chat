import React from 'react';

import '../Styling/styling.css';

function TitleBar({ room }) {
  return (
    <div className="infoBar">
      <div className="leftInnerContainer">
        <h3>{room}</h3>
      </div>
    </div>
  );
}

export default TitleBar;
