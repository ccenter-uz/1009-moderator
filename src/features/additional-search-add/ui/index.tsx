import { Button, Flex, Form, Input, Typography } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Link, useSearchParams } from "react-router-dom";

import { returnAllParams } from "@shared/lib/helpers";

/**
 * AdditionalSearchAddUI
 *
 * This component is used to add a new element to the table.
 *
 * It has the following functions:
 *
 * - `onSubmit`: This function is called when the form is submitted.
 *   It logs the form values to the console and closes the modal.
 * - `onClear`: This function is called when the form is cleared.
 *   It resets the form fields and closes the modal.
 
 * It has the following props:
 *
 * - `setData`: This prop is used to update the data in the parent component.
 *
 * @param {{ setData: Dispatch<SetStateAction<AnyObject[]>> }} props
 * @returns
 */

type Props = {
  setData: Dispatch<SetStateAction<AnyObject[]>>;
};

export const AdditionalSearchAddUI: FC<Props> = (props) => {
  const { setData } = props;
  const [searchParams, setSearchParams] = useSearchParams();
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onClear = () => form.resetFields();

  const onSubmit = ({ search }: string) => {
    console.log(search, "additional-search");
    const params = returnAllParams();
    setSearchParams({ ...params, search } as string);
    onClear();
    // setData(values);
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
        <Link to="/additional/add">
          <Button type="primary" icon={<FaPlus />} title={t("add")}>
            {t("add")}
          </Button>
        </Link>
      </Form>
    </>
  );
};
