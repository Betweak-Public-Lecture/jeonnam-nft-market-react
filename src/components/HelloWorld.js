import React from "react";

/**
 * 1. style 속성을 이용한다. (inline - css )
 *      - style={{margin-right}} (x) ==> style={{marginRight:10}}
 * 2. class를 사용한다.(css class)
 *      - class="<class1> <class2>" (x) ==> className=""
 */
export default function HelloWorld() {
  return (
    <div style={{ textAlign: "center" }} className="textCenter">
      <h1>Hello World</h1>
      <p>This is my first react app</p>
    </div>
  );
}
