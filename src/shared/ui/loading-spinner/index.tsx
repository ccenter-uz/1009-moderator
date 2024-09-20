import { Spin } from "antd";
import { FC } from "react";
type Props = {
  spinnerSize?: "small" | "default" | "large";
  contentHeight?: boolean;
};

export const LoadingSpinner: FC<Props> = (props) => {
  const { spinnerSize, contentHeight } = props;

  return (
    <div
      className="loading-spinner"
      style={{
        display: "grid",
        height: contentHeight ? "100%" : "100dvh",
        placeItems: "center",
      }}
    >
      <Spin size={spinnerSize} />
    </div>
  );
};
