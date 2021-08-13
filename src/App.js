import React from "react";
import logo from "./logo.svg";
// import "./App.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Web3 from "web3";

import Navbar from "./components/Navbar";
// page import
import Home from "./pages/Home";
import MarketList from "./pages/MarketList";
import Minting from "./pages/Minting";
import MyToken from "./pages/MyToken";
import NFTDetail from "./pages/NFTDetail";
import Query from "./pages/Query";

function App() {
  const [ethAccount, setEthAccount] = React.useState("");

  const loadWeb3 = () => {
    const web3 = new Web3(Web3.givenProvider);
    window.web3 = web3;
  };
  React.useEffect(loadWeb3, []);

  return (
    <Router>
      <Navbar
        connectToMetamask={async () => {
          const accounts = await window.ethereum.enable();
          setEthAccount(accounts[0] || "");
        }}
        ethAccount={ethAccount}
      />
      <Switch>
        <Route path="/" exact>
          <Home ethAccount={ethAccount} />
        </Route>
        <Route path="/nft-market" exact>
          <MarketList ethAccount={ethAccount} />
        </Route>
        <Route path="/item/:tokenId" exact>
          <NFTDetail ethAccount={ethAccount} />
        </Route>
        <Route path="/my-token" exact>
          <MyToken ethAccount={ethAccount} />
        </Route>
        <Route path="/query" exact>
          <Query ethAccount={ethAccount} />
        </Route>
        <Route path="/minting" exact>
          <Minting ethAccount={ethAccount} />
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
