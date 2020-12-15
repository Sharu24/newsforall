import React from "react";
import spinner from "./Spinner.gif";

function Loading() {
  return <img src={spinner} alt="spinning" style={{ width: "333px", display: "block", margin: " 0 auto"}} />;
}

export default Loading;
