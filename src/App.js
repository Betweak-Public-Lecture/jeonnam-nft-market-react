import React from "react";
import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

import Navbar from "./components/Navbar";

function App() {
  const [ethAccount, setEthAccount] = React.useState("");
  return (
    <Router>
      <Navbar
        connectToMetamask={async () => {
          const accounts = await window.ethereum.enable();
          setEthAccount(accounts[0] || "");
        }}
      />
      {ethAccount}
      <Switch>
        <Route path="/" exact>
          Home
        </Route>
        <Route path="/nft-market" exact>
          NFT Market
        </Route>
        <Route path="/item/:tokenId" exact>
          NFT Detail
        </Route>
        <Route path="/my-token" exact>
          My Token
        </Route>
        <Route path="/query" exact>
          Query
        </Route>
      </Switch>
    </Router>
  );
}

function App2() {
  return (
    <div className="App">
      <header className="App-header">
        {/* <HelloWorld />
        <CaptionImage imgSrc={logo} caption={"Logo입니다."} />
        <CaptionImage
          imgSrc="https://www.artalistic.com/en/media/blog/images/Bansky_3_1.jpg"
          caption="뱅크시 그림"
        />
        <CaptionImage
          imgSrc="http://www.h2news.kr/data/photos/20200101/art_15780333131476_8e8349.jpg"
          caption="이건 트럭입니다."
        /> */}
        {/* <BlinkBox text="깜빡이는 문자." /> */}
        {/* <Blink text="깜빡이는 문자." /> */}
      </header>
    </div>
  );
}

export default App;
