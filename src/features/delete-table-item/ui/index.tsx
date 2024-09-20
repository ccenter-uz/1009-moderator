import { Popconfirm } from "antd";
import { FC } from "react";
import { FaTrashAlt } from "react-icons/fa";

type Props = {
  href: string;
  id: string | number;
};

export const DeleteTableItemUI: FC<Props> = (props) => {
  const { id, href } = props;

  const onDelete = async () => {
    console.log(href, id, "deleted");
  };

  return (
    <Popconfirm
      title="Удалить?"
      onConfirm={onDelete}
      okText="Да"
      cancelText="Нет"
    >
      <FaTrashAlt
        color="crimson"
        fontSize={16}
        cursor={"pointer"}
        title="Удалить"
      />
    </Popconfirm>
  );
};
