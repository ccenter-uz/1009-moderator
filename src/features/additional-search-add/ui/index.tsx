import { Button, Flex, Form, Input, Typography } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";

import {
  clearAllAdditionalStorage,
  returnAllParams,
} from "@shared/lib/helpers";

/**
 * AdditionalSearchAddUI
 *
 * This component is responsible for rendering a search form with additional
 * functionality for managing search parameters.
 *
 * - Provides an input field for entering search terms with a clear button.
 * - Displays the category title based on the current search parameters.
 * - Submits the search form and updates the URL with the search term and other parameters.
 * - Includes a button to navigate to the "additional/add" page, clearing local storage on click.
 *
 * Hooks:
 * - `useSearchParams`: Used to access and set search parameters in the URL.
 * - `useTranslation`: Provides translation functionality for internationalization.
 * - `Form.useForm`: Utilized to manage form state and operations.
 *
 * @returns {JSX.Element} - The JSX element for the component.
 */
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
        {searchParams.get("category") && (
          <Typography.Title level={3} style={{ textAlign: "center" }}>
            {t(`${searchParams.get("category")}`)}
          </Typography.Title>
        )}
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
      </Form>
    </>
  );
};
