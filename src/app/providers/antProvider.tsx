import { ConfigProvider } from "antd";
import { FC } from "react";
import { useSelector } from "react-redux";

import { RootState } from "@shared/types";

interface IProps {
  children: JSX.Element;
}

export const AntConfigProvider: FC<IProps> = (props) => {
  const { children } = props;
  const { uiSettings } = useSelector(
    ({ CustomizeUISlicer }: RootState) => CustomizeUISlicer,
  );

  return (
    <ConfigProvider
      componentSize={uiSettings.componentSize}
      theme={{
        token: {
          colorPrimary: uiSettings.currentColor,
          fontSize: uiSettings.fontSize,
          fontWeightStrong: uiSettings.fontWeight,
          lineWidth: uiSettings.borderWidth,
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
};
