import { Flex, FloatButton, Tooltip } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FaPencilAlt } from "react-icons/fa";
import { Link, useLocation } from "react-router-dom";

import {
  AntDesignSwal,
  getLocalStorage,
  removeLocalStorage,
  STEPS_EDIT_KEYS,
} from "@shared/lib/helpers";

interface IProps {
  setEditId: React.Dispatch<React.SetStateAction<string | number | null>>;
}

export const FloatBtn: FC<IProps> = (props) => {
  const { setEditId } = props;
  const { t } = useTranslation();
  const location = useLocation();
  const editName = getLocalStorage(STEPS_EDIT_KEYS.FIRST)?.name;
  const editId = getLocalStorage(STEPS_EDIT_KEYS.EDIT_ID);

  if (location.pathname.includes("/orgs/edit")) return null;

  const handleClearEditOrg = () => {
    AntDesignSwal.fire({
      icon: "warning",
      title: t("oops"),
      text: t("are-you-sure-you-want-to-reset"),
      showCancelButton: true,
      confirmButtonColor: "#1677ff",
      cancelButtonColor: "crimson",
      confirmButtonText: t("yes"),
      cancelButtonText: t("no"),
      allowOutsideClick: false,
      allowEscapeKey: false,
    }).then((result) => {
      if (result.isConfirmed) {
        removeLocalStorage(STEPS_EDIT_KEYS.FIRST);
        removeLocalStorage(STEPS_EDIT_KEYS.SECOND);
        removeLocalStorage(STEPS_EDIT_KEYS.THIRD);
        removeLocalStorage(STEPS_EDIT_KEYS.FOURTH);
        removeLocalStorage(STEPS_EDIT_KEYS.CURRENT);
        removeLocalStorage(STEPS_EDIT_KEYS.EDIT_ID);
        setEditId(null);
      }
    });
  };

  return (
    <>
      <FloatButton.Group
        icon={<FaPencilAlt />}
        badge={{ count: editName ? 1 : 0 }}
        trigger="hover"
        type="primary"
        placement="left"
        shape="square"
        onClick={handleClearEditOrg}
      >
        <Link to={`/orgs/edit/${editId}`}>
          <Tooltip title={t("navigate-to-edit")}>
            <Flex
              align="center"
              gap={8}
              style={{
                width: "max-content",
                boxShadow: "0 0 10px 5px whitesmoke",
                padding: "0.2rem 1rem",
                borderRadius: "0.5rem",
                background: "white",
                color: "black",
              }}
            >
              <p>{t("you-have-been-editing-this-org")}</p>
              {editName && <b>- {editName}</b>}
            </Flex>
          </Tooltip>
        </Link>
      </FloatButton.Group>
    </>
  );
};
