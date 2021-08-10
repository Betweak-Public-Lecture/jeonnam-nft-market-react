import logo from "./logo.svg";
import "./App.css";
import HelloWorld from "./components/HelloWorld";
import CaptionImage from "./components/CaptionImage";
import Blink from "./components/Blink";
import BlinkBox from "./components/BlinkBox";

function App() {
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
