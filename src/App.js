import logo from "./logo.svg";
import "./App.css";
import HelloWorld from "./components/HelloWorld";
import CaptionImage from "./components/CaptionImage";

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <HelloWorld />
        <CaptionImage imgSrc={logo} caption={"Logo입니다."} />
        <CaptionImage
          imgSrc="https://www.artalistic.com/en/media/blog/images/Bansky_3_1.jpg"
          caption="뱅크시 그림"
        />
      </header>
    </div>
  );
}

export default App;
