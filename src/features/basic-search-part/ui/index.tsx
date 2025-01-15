import { Button, Flex, Form, Input, Select } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

import { returnAllParams, STATUS } from "@shared/lib/helpers";

type Props = {
  handleSearch: ({
    search,
    status,
  }: {
    search: string;
    status: number;
  }) => void;
  status: number;
  setStatus: Dispatch<SetStateAction<number>>;
  loading?: boolean;
  additionalSearch?: JSX.Element;
  id?: string;
  additionalParams?: unknown | AnyObject;
  isSearchBtnDisable?: boolean;
};

export const BasicSearchPartUI: FC<Props> = (props) => {
  const {
    handleSearch,
    setStatus,
    status,
    loading,
    additionalSearch,
    id = "basic-search",
    additionalParams,
    isSearchBtnDisable,
  } = props;
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [searchParams, setSearchParams] = useSearchParams();

  const params = returnAllParams();
  const handleReset = () => {
    form.resetFields();
    setSearchParams({
      ...params,
      search: "",
      status: STATUS.ACTIVE.toString(),
    });
    setStatus(STATUS.ACTIVE);
  };

  const handleStatusChange = (e: number) => {
    setStatus(e);
  };

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
          disabled={loading || isSearchBtnDisable}
          htmlType="submit"
          form={id}
          type="primary"
          icon={<FaSearch />}
        >
          {t("search")}
        </Button>
        <Button
          loading={loading}
          disabled={loading || isSearchBtnDisable}
          onClick={handleReset}
          icon={<MdClear />}
        >
          {t("reset")}
        </Button>
      </Flex>
    </Form>
  );
};
