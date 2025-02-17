import {
  Typography,
  Divider,
  Radio,
  Flex,
  Button,
  RadioChangeEvent,
} from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";

type TProps = {
  order: "name" | "orderNumber";
  setOrder: Dispatch<SetStateAction<"name" | "orderNumber">>;
  langCode?: "uz" | "ru" | "cy";
  setLangCode?: Dispatch<SetStateAction<"uz" | "ru" | "cy">>;
};

export const TableOrderFilterUI: FC<TProps> = (props) => {
  const { order, setOrder, langCode, setLangCode } = props;
  const { t } = useTranslation();

  const handleResetSort = () => {
    setOrder("orderNumber");
  };

  const handleSort = (e: RadioChangeEvent) => {
    if (langCode && setLangCode) {
      setLangCode(langCode);
    }
    setOrder(e.target.value as "orderNumber" | "name");
  };

  return (
    <div style={{ padding: 8 }}>
      <Typography.Text strong>{t("sort-by")}</Typography.Text>
      <Divider style={{ margin: "8px 0" }} />
      <Radio.Group value={order} onChange={(e) => handleSort(e)}>
        <Flex vertical gap={5}>
          <Radio value="name">{t("by-name")}</Radio>
          <Radio value="orderNumber">{t("by-order_number")}</Radio>
        </Flex>
      </Radio.Group>
      <Divider style={{ margin: "8px 0" }} />
      <div style={{ marginTop: 8 }}>
        <Button onClick={handleResetSort} size="small">
          {t("reset")}
        </Button>
      </div>
    </div>
  );
};
