import { Typography } from "antd";
import React, { FC } from "react";

interface IProps {
  children: JSX.Element | string;
  style?: React.CSSProperties;
  fontWeight?: number | string;
  fontSize?: number | string;
}

export const ParagraphBold: FC<IProps> = (props) => {
  const { children, style, fontWeight = 500, fontSize = 14 } = props;

  return (
    <Typography.Text style={{ ...style, fontWeight, fontSize }}>
      {children}
    </Typography.Text>
  );
};
