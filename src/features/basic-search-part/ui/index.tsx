import { Button, Flex, Form, Input } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

import { returnAllParams } from "@shared/lib/helpers";

type Props = {
  handleSearch: ({ search }: { search: string }) => void;
  loading?: boolean;
  additionalSearch?: JSX.Element;
  id?: string;
  additionalParams?: unknown | AnyObject;
};

export const BasicSearchPartUI: FC<Props> = (props) => {
  const {
    handleSearch,
    loading,
    additionalSearch,
    id = "basic-search",
    additionalParams,
  } = props;
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const params = returnAllParams();
    if (additionalParams) {
      form.setFieldsValue({
        ...params,
        ...additionalParams,
      });
    } else {
      form.setFieldsValue({
        search: params.search,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <Form form={form} id={id} onFinish={handleSearch}>
      <Flex gap={8} align="center" wrap="wrap">
        {additionalSearch}
        <Form.Item name="search" style={{ marginBottom: 0, flex: 1 }}>
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
          form={id}
          type="primary"
          icon={<FaSearch />}
        >
          {t("search")}
        </Button>
      </Flex>
    </Form>
  );
};
