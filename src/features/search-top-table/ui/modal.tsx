import { Checkbox, Col, Divider, Flex, Modal, Row, Typography } from "antd";
import i18next from "i18next";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { returnDayOffsInProperLanguage } from "@shared/lib/helpers";

import { TSelectedData } from "../model/types";

type Props = {
  title: string;
  data: TSelectedData | null;
  open: boolean;
  onClose: () => void;
};

export const SMSModal: FC<Props> = (props) => {
  const { t } = useTranslation();
  const { open, onClose, title, data } = props;

  if (!data) return;

  const renderList = [
    {
      id: 1,
      name: t("name"),
      value: data.name,
    },
    {
      id: 2,
      name: t("address"),
      value: data.street?.name[i18next.language],
    },
    {
      id: 3,
      name: t("org-name"),
      value: data.legalName,
    },
    {
      id: 4,
      name: t("phone"),
      value: () => {
        if (data.Phone?.length === 0) return t("no-data");
        return data.Phone?.map((item: { phone: string }) => item?.phone);
      },
    },
    {
      id: 5,
      name: t("main-org"),
      value: data.mainorganization?.name,
    },
    {
      id: 6,
      name: t("index"),
      value: () => {
        const puredIndex = data.index
          ?.replace(/\\/g, "")
          ?.replace(/^"+|"+$/g, "");

        return puredIndex;
      },
    },
    {
      id: 7,
      name: t("email"),
      value: data.mail,
    },
    {
      id: 8,
      name: t("payment_type"),
      value: () => {
        if (data.PaymentTypes?.length === 0) return t("no-data");
        const types: string[] = [];

        data.PaymentTypes?.map(
          (item: { Cash: boolean; Terminal: boolean; Transfer: boolean }) => {
            if (item.Cash) types.push(t("cash"));
            if (item.Terminal) types.push(t("terminal"));
            if (item.Transfer) types.push(t("transfer"));
          },
        );

        return types.join(", ");
      },
    },
    {
      id: 9,
      title: t("worktime"),
      name: t("worktime"),
      value: () => {
        if (data.workTime) {
          return `${data.workTime?.worktimeFrom} - ${
            data.workTime?.worktimeTo
          }, ${data.workTime?.allDay ? t("allDay") : ""}`;
        }
      },
    },
    {
      id: 10,
      name: t("lunch"),
      value: () => {
        if (data.workTime) {
          if (data.workTime?.withoutLunch) return t("withoutLunch");
          return `${data.workTime?.lunchFrom} - ${data.workTime?.lunchTo}`;
        }
      },
    },
    {
      id: 11,
      name: t("dayoffs"),
      value: () => {
        if (data.workTime) {
          if (data.workTime?.noDayoffs) return t("noDayoffs");
          if (data.workTime?.dayoffs.length === 0) return t("no-data");
          return returnDayOffsInProperLanguage(data.workTime?.dayoffs);
        }
      },
    },
    {
      id: 12,
      title: t("transport"),
      name: t("nearby"),
      value: () => {
        if (data.Nearbees?.length === 0) return t("no-data");
        return data.Nearbees?.map(
          (item: { Nearby: { name: { [key: string]: string } } }) =>
            item?.Nearby?.name[i18next.language],
        );
      },
    },
    {
      id: 13,
      name: t("bus"),
      value: () => data.transport?.bus,
    },
    {
      id: 14,
      name: t("micro-bus"),
      value: () => data.transport?.microBus,
    },
    {
      id: 15,
      name: t("metro-station"),
      value: () => data.transport?.metroStation,
    },
  ];

  return (
    <Modal
      open={open}
      onCancel={onClose}
      title={title}
      centered
      style={{ minWidth: "32rem" }}
      width={"auto"}
    >
      {renderList.map((item, index) => {
        const value =
          typeof item.value === "function" ? item.value() : item.value;
        return (
          <Flex key={index} vertical justify="center">
            {item?.title && (
              <Typography.Title level={5} style={{ margin: "0.5rem 0" }}>
                <Divider style={{ margin: "0.5rem 0" }} />
                {item?.title}
              </Typography.Title>
            )}
            <Row align={"middle"} style={{ margin: "0.2rem" }}>
              <Col span={6} style={{ fontWeight: 400 }}>
                {item.name}
              </Col>
              <Col span={2}>
                <Checkbox
                  name={item.value as string}
                  type="checkbox"
                  id={String(item.value)}
                />
              </Col>
              <Col span={16}>{value ?? t("no-data")}</Col>
            </Row>
          </Flex>
        );
      })}
    </Modal>
  );
};
