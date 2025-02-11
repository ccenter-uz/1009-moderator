import { Button, Flex, Form, Input, Typography } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";

import {
  clearAllAdditionalStorage,
  returnAllParams,
} from "@shared/lib/helpers";
import { Can } from "@shared/ui";

export const AdditionalSearchAddUI: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onClear = () => form.resetFields();

  const onSubmit = ({ search }: string) => {
    console.log(search, "additional-search");
    const params = returnAllParams();
    setSearchParams({ ...params, search } as string);
    onClear();
  };

  const onClearLocalStorage = () => clearAllAdditionalStorage();

  return (
    <>
      <Form
        form={form}
        onFinish={onSubmit}
        id="additional-search"
        style={{ margin: "10px 0" }}
      >
        <Flex gap={8} align="start">
          <Form.Item
            name={"search"}
            style={{ flex: 1 }}
            initialValue={searchParams.get("search") ?? ""}
          >
            <Input
              autoComplete="off"
              type="text"
              placeholder={t("search")}
              allowClear
            />
          </Form.Item>
          <Button
            title={t("search")}
            type="primary"
            icon={<FaSearch />}
            htmlType="submit"
            form="additional-search"
          >
            {t("search")}
          </Button>
        </Flex>
        <Can i="create" a="additional">
          <Link
            to="/additional/add"
            state={{
              category: searchParams.get("category"),
            }}
          >
            <Button
              type="primary"
              icon={<FaPlus />}
              title={t("add")}
              onClick={onClearLocalStorage}
            >
              {t("add")}
            </Button>
          </Link>
        </Can>
      </Form>
    </>
  );
};
