import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "./styles/App.scss";
import { faHeart as regularHeart } from "@fortawesome/free-regular-svg-icons";
import { faHeart as solidHeart } from "@fortawesome/free-solid-svg-icons";

function App() {
  return (
    <div className="App">
      {/* This is how we should use the icons */}
      <FontAwesomeIcon
        className="heart-icon"
        icon={false ? regularHeart : solidHeart}
      />
      <p className="logo">cottage core</p>
    </div>
  );
}

export default App;
