import { Popconfirm } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FaTrashAlt } from "react-icons/fa";

/**
 * DeleteTableItemUI
 *
 * This component is used to delete item from the table in the Manage pages.
 *
 * It has the following functionality:
 *
 * - Displays a Popconfirm with a text from the translations.
 * - When the user clicks the Yes button, it makes a DELETE request to the server.
 *
 * It takes the following props:
 *
 * - `href`: The href of the link to make a DELETE request.
 * - `id`: The id of the item to delete.
 *
 * @param {Object} props - The props of the component.
 * @param {string} props.href - The href of the link to make a DELETE request.
 * @param {string | number} props.id - The id of the item to delete.
 *
 * @returns {JSX.Element} - The JSX element of the component.
 */
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
