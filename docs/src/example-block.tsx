import React from "react";
import { Card } from "antd";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { okaidia } from "react-syntax-highlighter/dist/esm/styles/prism";

interface IProps {
  className?: string;
  title: string;
  code: string;
}

export const ExampleBlock: React.SFC<IProps> = (props) => {
  return (
    <>
      <Card
        className={props.className}
        style={{
          borderBottomLeftRadius: 0,
          borderBottomRightRadius: 0,
        }}
        title={props.title}
      >
        {props.children}
      </Card>
      <SyntaxHighlighter
        customStyle={{
          margin: 0,
          borderTopLeftRadius: 0,
          borderTopRightRadius: 0,
          border: "1px solid #e8e8e8",
          borderTop: "none",
        }}
        language="jsx"
        style={okaidia}
      >
        {props.code}
      </SyntaxHighlighter>
    </>
  );
};
