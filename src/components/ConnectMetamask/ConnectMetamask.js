import React from "react";
import metamaskIcon from "./metamask.svg";
import { Button } from "react-bootstrap";

// Metamask 연결을 담당. Metamask 이미지로 되어 있는 컴포넌트
export default function ConnectMetamask(props) {
  return (
    <Button variant="dark" onClick={props.connectToMetamask}>
      Connect
      <img src={metamaskIcon} style={{ width: 20 }} alt="" />
    </Button>
  );
}
