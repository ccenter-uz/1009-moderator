import { Button, Flex, Form, Input, Select } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

import {
  findTargetKey,
  getValueOfKeyNamedStatus,
  returnAllParams,
  STATUS,
} from "@shared/lib/helpers";

type Props = {
  handleSearch: ({
    search,
    status,
    nearbyCategoryId,
  }: {
    search: string;
    status: number;
    nearbyCategoryId: string | number;
  }) => void;
  status?: number;
  isFilterByStatusRequired?: boolean;
  loading?: boolean;
  additionalSearch?: JSX.Element;
  id?: string;
  additionalParams?: unknown | AnyObject;
  isSearchBtnDisable?: boolean;
};

export const BasicSearchPartUI: FC<Props> = (props) => {
  const {
    handleSearch,
    status: statusFromProps,
    isFilterByStatusRequired,
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
  const status = +getValueOfKeyNamedStatus(params);

  const isStatusRequired = isFilterByStatusRequired?.toString()
    ? isFilterByStatusRequired
    : true;

  const handleReset = () => {
    const id = findTargetKey(params, "id");
    const search = findTargetKey(params, "search");
    const status = findTargetKey(params, "status");

    params[id] ? (params[id] = "") : null;
    params[search] ? (params[search] = "") : null;
    params[status] ? (params[status] = STATUS.ACTIVE.toString()) : null;

    form.resetFields();
    setSearchParams({
      ...params,
    });
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

  const defaultStatus =
    status >= 0
      ? status
      : statusFromProps !== undefined && statusFromProps >= 0
      ? statusFromProps
      : STATUS.ACTIVE;

  return (
    <Form form={form} id={id} onFinish={handleSearch}>
      <Flex gap={8}>
        {additionalSearch}
        {!isStatusRequired ? null : (
          <Form.Item name={"status"} label={t("status")} style={{ flex: 0.2 }}>
            <Select
              defaultValue={defaultStatus}
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
              placeholder={t("status")}
              allowClear
            />
          </Form.Item>
        )}

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
