import React from "react";

export default class Blink extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showText: true,
    };

    setInterval(() => {
      this.setState({ showText: !this.state.showText });
    }, 3000);
  }

  render() {
    return (
      <div>
        {this.state.showText || this.props.isBlink ? this.props.text : ""}
      </div>
    );
  }
}
