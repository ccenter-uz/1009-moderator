import { Popconfirm } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FaTrashAlt } from "react-icons/fa";

type Props = {
  href: string;
  id: string | number;
};

export const DeleteTableItemUI: FC<Props> = (props) => {
  const { id, href } = props;
  const { t } = useTranslation();

  const onDelete = async () => {
    console.log(href, id, "deleted");
  };

  return (
    <Popconfirm
      title={t("delete")}
      onConfirm={onDelete}
      okText="Да"
      cancelText="Нет"
    >
      <FaTrashAlt
        color="crimson"
        fontSize={16}
        cursor={"pointer"}
        title={t("delete")}
      />
    </Popconfirm>
  );
};
