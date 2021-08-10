import React from "react";

import Blink from "./Blink";

export default function BlinkBox(props) {
  /**
   * activated: state
   * setActivated: state핸들러(class형의 setState)
   */
  const [activated, setActivated] = React.useState(false);

  return (
    <div>
      <button
        onClick={(e) => {
          e.preventDefault();
          setActivated(!activated);
        }}
      >
        {activated ? "활성" : "비활성"}
      </button>
      <Blink text={props.text} isBlink={activated} />
    </div>
  );
}
