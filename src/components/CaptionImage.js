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

class ClassCaptionImage extends React.Component {
  render() {
    return (
      <div>
        <img src={this.props.imgSrc} alt="로고"></img>
        <p>{this.props.caption}</p>
      </div>
    );
  }
}
