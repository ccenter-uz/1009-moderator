import { Button, Flex, Form, Input, Select } from "antd";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

import { returnAllParams, STATUS } from "@shared/lib/helpers";

type Props = {
  handleSearch: (values: {
    search: string;
    nearbyCategoryId: string | number;
    status: number;
  }) => void;
  loading?: boolean;
  additionalSearch?: JSX.Element;
  status: number;
  setStatus: Dispatch<SetStateAction<number>>;
  id?: string;
};

export const NearbyPageSearchUI: FC<Props> = (props) => {
  const {
    handleSearch,
    loading,
    additionalSearch,
    id = "basic-search",
    status,
    setStatus,
  } = props;
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const handleStatusChange = (e: number) => {
    setStatus(e);
  };
  const handleReset = () => {
    form.resetFields();
    handleSearch({ search: "", nearbyCategoryId: "", status: STATUS.ACTIVE });
  };

  useEffect(() => {
    const params = returnAllParams();
    form.setFieldsValue({
      ...params,
      "nearby-category": Number(params.nearbyCategoryId),
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <Form form={form} id={id} onFinish={handleSearch}>
      <Flex gap={8} align="center" wrap="wrap">
        {additionalSearch}
        <Select
          value={status}
          onChange={handleStatusChange}
          options={[
            {
              id: 0,
              label: t("all"),
              value: STATUS.ALL,
            },
            {
              id: 1,
              label: t("active"),
              value: STATUS.ACTIVE,
            },
            {
              id: 2,
              label: t("inactive"),
              value: STATUS.INACTIVE,
            },
          ]}
          placeholder={t("search-by-status")}
          allowClear
        />

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
        <Button
          loading={loading}
          disabled={loading}
          onClick={handleReset}
          icon={<MdClear />}
        >
          {t("reset")}
        </Button>
      </Flex>
    </Form>
  );
};
