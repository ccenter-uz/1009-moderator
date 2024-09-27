import { Row, Col, Form, Select, FormInstance } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { SingleInputWithModalUI } from "@shared/ui/single-input-with-modal";

type Props = {
  form: FormInstance;
};

export const AddressSearchPartUI: FC<Props> = (props) => {
  const { form } = props;
  const { t } = useTranslation();

  return (
    <Row>
      <Col span={24}>
        <Form.Item
          name="region"
          label={t("region")}
          style={{ marginBottom: 10 }}
        >
          <Select options={[]} allowClear />
        </Form.Item>
      </Col>
      <SingleInputWithModalUI
        searchHref="city"
        form={form}
        label="city"
        value="city"
        dataFetcher={() => [{ name: "Мобильный", key: 1, id: 1 }]}
        columns={[
          {
            title: t("city"),
            dataIndex: "name",
            key: "name",
          },
        ]}
      />
      <SingleInputWithModalUI
        searchHref="district"
        form={form}
        label="district"
        value="district"
        dataFetcher={() => [
          {
            name: "Мобильный",
            old_name: "Мобильный",
            new_name: "Мобильный",
            key: 1,
            id: 1,
          },
        ]}
        columns={[
          {
            title: t("name"),
            dataIndex: "name",
            key: "name",
          },
          {
            title: t("old_name"),
            dataIndex: "old_name",
            key: "old_name",
          },
          {
            title: t("new_name"),
            dataIndex: "new_name",
            key: "new_name",
          },
        ]}
      />
      <SingleInputWithModalUI
        searchHref="village"
        form={form}
        label="village"
        value="village"
        dataFetcher={() => [
          {
            name: "Мобильный",
            old_name: "Мобильный",
            new_name: "Мобильный",
            key: 1,
            id: 1,
          },
        ]}
        columns={[
          {
            title: t("name"),
            dataIndex: "name",
            key: "name",
          },
          {
            title: t("old_name"),
            dataIndex: "old_name",
            key: "old_name",
          },
          {
            title: t("new_name"),
            dataIndex: "new_name",
            key: "new_name",
          },
        ]}
      />
      <SingleInputWithModalUI
        searchHref="address-sprav"
        form={form}
        label="address-sprav"
        value="address-sprav"
        dataFetcher={() => [
          {
            name: "Мобильный",
            old_name: "Мобильный",
            new_name: "Мобильный",
            key: 1,
            id: 1,
          },
        ]}
        columns={[
          {
            title: t("name"),
            dataIndex: "name",
            key: "name",
          },
          {
            title: t("old_name"),
            dataIndex: "old_name",
            key: "old_name",
          },
          {
            title: t("new_name"),
            dataIndex: "new_name",
            key: "new_name",
          },
          {
            title: t("object"),
            dataIndex: "object",
            key: "object",
          },
          {
            title: t("district"),
            dataIndex: "district",
            key: "district",
          },
          {
            title: t("city"),
            dataIndex: "city",
            key: "city",
          },
          {
            title: t("index"),
            dataIndex: "index",
            key: "index",
          },
        ]}
      />
      <SingleInputWithModalUI
        searchHref="nearby"
        form={form}
        label="nearby"
        value="nearby"
        dataFetcher={() => [
          {
            name: "Мобильный",
            city: "Tashkent",
            key: 1,
            id: 1,
          },
        ]}
        columns={[
          {
            title: t("name"),
            dataIndex: "name",
            key: "name",
          },
          {
            title: t("city"),
            dataIndex: "city",
            key: "city",
          },
        ]}
      />
    </Row>
  );
};
