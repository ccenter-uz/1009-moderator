import { Button, Flex, Form, Input, Select } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { Dispatch, FC, SetStateAction, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

import { CreatedByEnum, returnAllParams, STATUS } from "@shared/lib/helpers";

type Props = {
  handleSearch: ({
    search,
    status,
    createdBy,
    nearbyCategoryId,
  }: {
    search: string;
    status: number;
    createdBy: string;
    nearbyCategoryId: string | number;
  }) => void;
  handleReset: Dispatch<SetStateAction<string | number | undefined>>;
  status?: number;
  hasFilterByStatus?: boolean;
  loading?: boolean;
  additionalSearch?: JSX.Element;
  id?: string;
  additionalParams?: unknown | AnyObject;
  isSearchBtnDisable?: boolean;
};

export const BasicSearchPartUI: FC<Props> = (props) => {
  const {
    handleSearch,
    handleReset: handleResetFromProps,
    status: statusFromProps,
    hasFilterByStatus = true,
    loading,
    additionalSearch,
    id = "basic-search",
    additionalParams,
    isSearchBtnDisable,
  } = props;
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const [initialStatusValue, setInitialStatusValue] = useState(
    statusFromProps !== undefined && statusFromProps >= 0
      ? statusFromProps
      : STATUS.ACTIVE,
  );
  const [initialCreatedByValue, setInitialCreatedByValue] = useState<string>(
    CreatedByEnum.Billing,
  );

  const handleReset = () => {
    handleResetFromProps?.(new Date().getTime());
    setInitialStatusValue(STATUS.ACTIVE);
    setInitialCreatedByValue(CreatedByEnum.Billing);
    form.resetFields();
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

  useEffect(() => {
    if (statusFromProps !== undefined && !isNaN(statusFromProps)) {
      setInitialStatusValue(statusFromProps);
      form.setFieldsValue({ status: statusFromProps });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [statusFromProps]);

  return (
    <Form form={form} id={id} onFinish={handleSearch}>
      <Flex gap={8}>
        {additionalSearch}
        {hasFilterByStatus ? (
          <Form.Item name={"status"} label={t("status")} style={{ flex: 0.2 }}>
            <Select
              defaultValue={initialStatusValue}
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
        ) : (
          <Form.Item
            name={"createdBy"}
            label={t("createdBy")}
            style={{ flex: 0.2 }}
          >
            <Select
              defaultValue={initialCreatedByValue}
              options={[
                {
                  id: 0,
                  label: t("billing"),
                  value: CreatedByEnum.Billing,
                },
                {
                  id: 1,
                  label: t("client"),
                  value: CreatedByEnum.Client,
                },
                {
                  id: 2,
                  label: t("moderator"),
                  value: CreatedByEnum.Moderator,
                },
              ]}
              placeholder={t("createdBy")}
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
