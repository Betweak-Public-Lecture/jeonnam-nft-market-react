import React from "react";
import logo from "../logo.svg";

export default function CaptionImage(props) {
  return (
    <div>
      <img src={props.imgSrc} alt="로고"></img>
      <p>{props.caption}</p>
    </div>
  );
}
