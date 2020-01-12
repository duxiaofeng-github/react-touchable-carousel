import React from "react";
import { Layout } from "antd";
import { Carousel } from "react-touchable-carousel";
import google from "./assets/google.png";
import walmart from "./assets/walmart.png";
import amazon from "./assets/amazon.png";
import burgerKing from "./assets/burger-king.png";
import netflix from "./assets/netflix.png";
import nodejs from "./assets/nodejs.png";
import pepsi from "./assets/pepsi.png";
import starbucks from "./assets/starbucks.png";
import telegram from "./assets/telegram.png";
import github from "./assets/github.png";

import { css } from "linaria";
import { ExampleBlock } from "./example-block";
import { getCodeExample } from "./utils";

const { Header, Content } = Layout;

interface IProps {}

export const Home: React.SFC<IProps> = (props) => {
  return (
    <Layout>
      <Header className={styleHeader}>
        <a target="_blank" href={githubHomePage}>
          <h1 className={styleTitle}>React Touchable Carousel</h1>
        </a>
        <a target="_blank" href={githubHomePage}>
          <img className={styleGithub} src={github} />
        </a>
      </Header>
      <Content className={styleContent}>
        <ExampleBlock className={styleExampleBlock} title="Zero configurations!" code={getCodeExample()}>
          <Carousel>
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
        </ExampleBlock>
        <ExampleBlock
          className={styleExampleBlock}
          title="With autoPlay"
          code={getCodeExample("autoPlay autoPlayDuration={2}")}
        >
          <Carousel autoPlay autoPlayDuration={2}>
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
        </ExampleBlock>
        <ExampleBlock className={styleExampleBlock} title="With infinite" code={getCodeExample("infinite")}>
          <Carousel infinite>
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
        </ExampleBlock>
        <ExampleBlock
          className={styleExampleBlock}
          title="With itemsPerSwipe"
          code={getCodeExample("itemsPerSwipe={1}")}
        >
          <Carousel itemsPerSwipe={1}>
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
        </ExampleBlock>
        <ExampleBlock className={styleExampleBlock} title="Align bottom" code={getCodeExample(`align="bottom"`)}>
          <Carousel align="bottom">
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
        </ExampleBlock>
        <ExampleBlock className={styleExampleBlock} title="Adjust padding" code={getCodeExample(`padding={30}`)}>
          <Carousel padding={30}>
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
        </ExampleBlock>
      </Content>
    </Layout>
  );
};

const styleHeader = css`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
`;

const styleTitle = css`
  margin: 0;
  font-size: 18px;
  color: #fff;
`;

const styleGithub = css`
  height: 30px;
  width: 30px;
`;

const styleContent = css`
  padding: 20px;
`;

const styleExampleBlock = css`
  margin-top: 20px;

  &:first-child {
    margin-top: 0;
  }
`;

const styleLogo = css`
  max-width: 100px;
`;
