import { Button, Flex, Form, Input, Select } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { FaSearch } from "react-icons/fa";
import { MdClear } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

import { CREATEDBYENUM, returnAllParams } from "@shared/lib/helpers";

type Props = {
  handleSearch: ({
    search,
    createdBy,
  }: {
    search: string;
    createdBy: string;
  }) => void;
  loading?: boolean;
  additionalSearch?: JSX.Element;
  id?: string;
  hasCreateByFilter?: boolean;
  additionalParams?: unknown | AnyObject;
  isSearchBtnDisable?: boolean;
};

export const BasicSearchPartUI: FC<Props> = (props) => {
  const {
    handleSearch,
    loading,
    additionalSearch,
    id = "basic-search",
    hasCreateByFilter = false,
    additionalParams,
    isSearchBtnDisable,
  } = props;
  const [form] = Form.useForm();
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();

  const handleReset = () => {
    form.resetFields();
    handleSearch({ search: "", createdBy: CREATEDBYENUM.Billing });
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
        {!hasCreateByFilter ? null : (
          <Form.Item name="createdBy" style={{ marginBottom: 0, flex: 1 }}>
            <Select
              defaultValue={CREATEDBYENUM.Billing}
              options={[
                {
                  label: t("billing"),
                  value: CREATEDBYENUM.Billing,
                },
                {
                  label: t("client"),
                  value: CREATEDBYENUM.Client,
                },
                {
                  label: t("moderator"),
                  value: CREATEDBYENUM.Moderator,
                },
              ]}
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
