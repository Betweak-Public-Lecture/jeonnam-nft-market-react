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
import Account from "./pages/Account";

// artifacts import
import jnftArtifact from "./artifacts/JNFT.json";
import jnftMarketArtifact from "./artifacts/JNFTMarket.json";

function App() {
  const [ethAccount, setEthAccount] = React.useState("");
  const [web3, setWeb3] = React.useState(null);

  const loadWeb3 = () => {
    const web3 = new Web3(Web3.givenProvider);

    const jnftContract = new web3.eth.Contract(
      jnftArtifact.abi,
      jnftArtifact.networks["5777"].address
    );
    const jnftMarketContract = new web3.eth.Contract(
      jnftMarketArtifact.abi,
      jnftMarketArtifact.networks["5777"].address
    );
    web3.jnftContract = jnftContract;
    web3.marketContract = jnftMarketContract;

    web3.eth.getAccounts().then((accounts) => {
      if (accounts.length > 0) {
        setEthAccount(accounts[0]);
      }
    });
    console.log(web3.marketContract);

    web3.marketContract.events.MarketItemCreated({}, (err, data) => {
      console.log("event발생");
      console.log(data);
    });
    setWeb3(web3);
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
          <Home ethAccount={ethAccount} web3={web3} />
        </Route>
        <Route path="/nft-market" exact>
          <MarketList ethAccount={ethAccount} web3={web3} />
        </Route>
        <Route path="/item/:tokenId" exact>
          <NFTDetail ethAccount={ethAccount} web3={web3} />
        </Route>
        <Route path="/my-token" exact>
          <MyToken ethAccount={ethAccount} web3={web3} />
        </Route>
        <Route path="/query" exact>
          <Query ethAccount={ethAccount} web3={web3} />
        </Route>
        <Route path="/minting" exact>
          <Minting ethAccount={ethAccount} web3={web3} />
        </Route>

        <Route path="/account" exact component={Account} />
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
