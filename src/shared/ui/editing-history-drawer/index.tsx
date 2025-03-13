import { Divider, Drawer, Flex, Typography } from "antd";
import { FC } from "react";
import { Fragment } from "react/jsx-runtime";
import { useTranslation } from "react-i18next";
import { FaRegClock } from "react-icons/fa";

import { useDisclosure } from "@shared/lib/hooks";

interface IProps {
  record: { id: number | string; name?: string };
}

export const EditingHistoryDrawer: FC<IProps> = (props) => {
  const { record } = props;
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();

  if (!record) return null;
  const onEditingStoryClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    onOpen();
  };

  const cards = [
    {
      id: 1,
      user: "moderator",
      update_at: "12.03.2025",
      status: "success",
    },
    {
      id: 2,
      user: "operator",
      update_at: "13.03.2025",
      status: "failed",
    },
  ];

  return (
    <Fragment>
      <FaRegClock
        onClick={onEditingStoryClick}
        fontSize={16}
        color="grey"
        cursor={"pointer"}
        title={t("history-of-edits")}
      />
      <Drawer
        title={t("history-of-edits")}
        placement="right"
        onClose={onClose}
        open={isOpen}
      >
        <Typography.Title
          level={3}
          title={record?.name}
          ellipsis
          style={{ textAlign: "center", marginTop: 0 }}
        >
          {record?.name}
        </Typography.Title>
        <Divider />
        {cards.map((card) => (
          <div
            key={card.id}
            style={{
              marginBottom: "1em",
              boxShadow: "0px 1px 3px rgba(0, 0, 0, 0.25)",
              padding: "1em",
              borderRadius: 2,
            }}
          >
            <Flex
              align="center"
              justify="space-between"
              style={{ color: card.status === "success" ? "green" : "red" }}
            >
              <span>{card.user}</span>
              <span>{card.update_at}</span>
            </Flex>
          </div>
        ))}
      </Drawer>
    </Fragment>
  );
};
