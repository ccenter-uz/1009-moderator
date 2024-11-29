import { Popconfirm } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FaTrashAlt } from "react-icons/fa";

type Props = {
  fetch: () => void;
};

export const DeleteTableItemUI: FC<Props> = (props) => {
  const { fetch } = props;
  const { t } = useTranslation();

  return (
    <Popconfirm
      title={t("delete")}
      onConfirm={fetch}
      okText={t("yes")}
      cancelText={t("no")}
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
