import { FC } from "react";
import "./style.css";

type Props = {
  content: string;
};

export const MentionTextBlockUI: FC<Props> = (props) => {
  const { content } = props;

  return (
    <div id="mention-text-block">
      <p className="content">{content}</p>
    </div>
  );
};
