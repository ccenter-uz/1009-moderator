import { Button, Flex, Form, Input, Typography } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";

import { removeLocalStorage, returnAllParams } from "@shared/lib/helpers";

/**
 * AdditionalSearchAddUI
 *
 * This component is used to display a search bar and a button to add new items
 * in the search widget of the Manage pages.
 *
 * It has the following functionality:
 *
 * - Displays a text input with a placeholder.
 * - Displays a search button with a loading indicator.
 * - Submits the form when the search button is clicked.
 * - Calls the function passed to the `handleSearch` prop with the form values.
 * - Disables the search button and input when the component is in the loading state.
 * - Displays a button to add new items.
 * - Clears the local storage of the current step and previous steps when the button to add new items is clicked.
 *
 * It takes no props.
 *
 * @returns {JSX.Element} - The JSX element of the component.
 */
const enum ADDITIONAL_ADD_STEP {
  FIRST = "additionalAddFirstStep",
  SECOND = "additionalAddSecondStep",
  THIRD = "additionalAddThirdStep",
  CURRENT = "additionalAddCurrentStep",
}

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

  const onClearLocalStorage = () => {
    removeLocalStorage(ADDITIONAL_ADD_STEP.CURRENT);
    removeLocalStorage(ADDITIONAL_ADD_STEP.FIRST);
    removeLocalStorage(ADDITIONAL_ADD_STEP.SECOND);
    removeLocalStorage(ADDITIONAL_ADD_STEP.THIRD);
  };

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
