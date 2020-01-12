export function getCodeExample(props?: string) {
  return `import { render } from "react-dom";
import { Carousel } from "react-touchable-carousel";

function App() {
  return (
    <Carousel${props != null && props !== "" ? " " + props : ""}>
      <img className={styleLogo} src={google} />
      <img className={styleLogo} src={walmart} />
      <img className={styleLogo} src={amazon} />
      <img className={styleLogo} src={burgerKing} />
      <img className={styleLogo} src={netflix} />
      <img className={styleLogo} src={nodejs} />
      <img className={styleLogo} src={pepsi} />
      <img className={styleLogo} src={starbucks} />
      <img className={styleLogo} src={telegram} />
    </Carousel>
  );
}

render(<App />, document.getElementById('root'));`;
}
