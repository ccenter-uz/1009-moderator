import { Button, Flex, Form, Input } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";

type Props = {
  handleSearch: (values: any) => void;
  loading?: boolean;
};

export const BasicSearchPartUI: FC<Props> = (props) => {
  const { handleSearch, loading } = props;
  const [form] = Form.useForm();
  const { t } = useTranslation();

  return (
    <Form form={form} id="basic-search" onFinish={handleSearch}>
      <Flex gap={8} align="center">
        <Form.Item name="search" style={{ marginBottom: 0, width: "100%" }}>
          <Input
            type="text"
            placeholder={t("search")}
            allowClear
            disabled={loading}
          />
        </Form.Item>
        <Button
          loading={loading}
          disabled={loading}
          htmlType="submit"
          form="basic-search"
          type="primary"
          icon={<FaSearch />}
        >
          {t("search")}
        </Button>
      </Flex>
    </Form>
  );
};
