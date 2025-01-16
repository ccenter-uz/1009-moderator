import { Avatar, Divider, Menu, Popover } from "antd";
import i18next from "i18next";
import { FC } from "react";
import { IoLogOut, IoSettings } from "react-icons/io5";

import { LogoutLink } from "@features/logout";

import { useGetMeQuery } from "@entities/users";

import { getLocalStorage } from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";

import { SettingsModal } from "./settings-modal";

export const AvatarComponent: FC = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data } = useGetMeQuery({});
  const userName = getLocalStorage("user-name")
    ? getLocalStorage("user-name")?.split(" ")
    : ["Aziz", "Azizov"];

  const items = [
    {
      key: "1",
      icon: <IoSettings />,
      label: i18next.t("settings"),
      onClick: onOpen,
    },
    {
      key: "2",
      icon: <IoLogOut color="crimson" />,
      danger: true,
      label: <LogoutLink />,
    },
  ];

  const content = (
    <div
      style={{
        width: "auto",
        minWidth: 150,
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <h3
        style={{
          fontSize: "16px",
          padding: 0,
          margin: 0,
          fontWeight: 600,
          color: "#252525",
          textTransform: "uppercase",
        }}
      >
        {`${userName[0]} ${userName[1]}`}
      </h3>
      <span style={{ color: "grey" }}>{data?.result?.role.name}</span>
      <Divider style={{ margin: "8px 0" }} />
      <Menu
        items={items}
        selectable={false}
        style={{ width: "100%", padding: 0, margin: 0, borderRight: 0 }}
      />
    </div>
  );

  return (
    <>
      <Popover placement={"bottomRight"} trigger={"click"} content={content}>
        <Avatar
          style={{
            cursor: "pointer",
            backgroundColor: `#5444E144`,
            color: `#5444E1`,
          }}
          size={40}
        >
          {`${userName[0].slice(0, 1)}${userName[1].slice(0, 1)}`}
        </Avatar>
      </Popover>
      <SettingsModal isOpen={isOpen} onClose={onClose} data={data?.result} />
    </>
  );
};
