import { Typography, Divider, Radio, Flex, Button } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

type TProps = {
  order: "name" | "orderNumber";
  setOrder: Dispatch<SetStateAction<"name" | "orderNumber">>;
};

export const TableOrderFilterUI: FC<TProps> = (props) => {
  const { order, setOrder } = props;
  const { t } = useTranslation();

  return (
    <div style={{ padding: 8 }}>
      <Typography.Text strong>{t("sort-by")}</Typography.Text>
      <Divider style={{ margin: "8px 0" }} />
      <Radio.Group
        value={order}
        onChange={(e) => {
          setOrder(e.target.value);
        }}
      >
        <Flex vertical gap={5}>
          <Radio value="name">{t("by-name")}</Radio>
          <Radio value="orderNumber">{t("by-order-number")}</Radio>
        </Flex>
      </Radio.Group>
      <Divider style={{ margin: "8px 0" }} />
      <div style={{ marginTop: 8 }}>
        <Button
          onClick={() => {
            setOrder("orderNumber");
          }}
          size="small"
        >
          {t("reset")}
        </Button>
      </div>
    </div>
  );
};
