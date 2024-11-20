import { FC } from "react";
import "./style.css";
import { GoAlert } from "react-icons/go";

type Props = {
  content: string;
};

export const WarningTextBlockUI: FC<Props> = (props) => {
  const { content } = props;

  return (
    <div id="warning-text-block">
      <GoAlert fontSize={20} style={{ display: "inline-block" }} />
      <p className="content">{content}</p>
    </div>
  );
};
