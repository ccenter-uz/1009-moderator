import { Button, Flex, Form, Input } from "antd";
import { FC } from "react";
import { FaSearch } from "react-icons/fa";

type Props = {
  handleSearch: (values: any) => void;
  loading?: boolean;
};

export const BasicSearchPartUI: FC<Props> = (props) => {
  const { handleSearch, loading } = props;
  const [form] = Form.useForm();

  return (
    <Form form={form} id="basic-search" onFinish={handleSearch}>
      <Flex gap={8} align="center">
        <Form.Item name="search" style={{ marginBottom: 0, width: "100%" }}>
          <Input
            type="text"
            placeholder="Поиск"
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
          Поиск
        </Button>
      </Flex>
    </Form>
  );
};
