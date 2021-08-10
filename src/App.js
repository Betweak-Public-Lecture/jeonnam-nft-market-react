import logo from "./logo.svg";
import "./App.css";
import HelloWorld from "./components/HelloWorld";
import CaptionImage from "./components/CaptionImage";
import Blink from "./components/Blink";
import BlinkBox from "./components/BlinkBox";

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

function App() {
  return (
    <Router>
      <div style={{ textAlign: "center", fontSize: 40 }}>
        <a href="/1">1번 a 태그</a>

        <br />
        <Link to="/1">1번 Route 이동</Link>
        <br />
        <Link to="/2">2번 Route 이동</Link>
        <br />

        <Switch>
          <Route path="/1">Route1번</Route>
          <Route path="/2">Route2번</Route>
          <Route>Default</Route>
        </Switch>
      </div>
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
        <BlinkBox text="깜빡이는 문자." />
        {/* <Blink text="깜빡이는 문자." /> */}
      </header>
    </div>
  );
}

export default App;
