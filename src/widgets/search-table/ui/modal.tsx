import { Modal } from "antd";
import { FC } from "react";

type Props = {
  title: string;
  open: boolean;
  onClose: () => void;
};

export const MoreModalUI: FC<Props> = (props) => {
  const { open, onClose, title } = props;

  return (
    <Modal open={open} onCancel={onClose} title={title} centered>
      <p>Nothing to look for here</p>
    </Modal>
  );
};
