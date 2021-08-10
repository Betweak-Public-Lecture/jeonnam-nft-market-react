import React from "react";

import Blink from "./Blink";

export default function BlinkBox(props) {
  /**
   * activated: state
   * setActivated: state핸들러(class형의 setState)
   */
  const [activated, setActivated] = React.useState(false);

  React.useEffect(() => {
    console.log("activated가 변화");
    fetch("http://localhost:3001");
  }, [activated]);

  const onClick = React.useCallback(
    (e) => {
      e.preventDefault();
      setActivated(!activated);
    },
    [activated]
  );

  return (
    <div>
      <button onClick={onClick}>{activated ? "활성" : "비활성"}</button>
      <Blink text={props.text} isBlink={activated} />
    </div>
  );
}
