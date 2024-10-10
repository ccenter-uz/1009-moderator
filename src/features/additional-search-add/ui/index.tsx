import { Button, Flex, Form, Input } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { Dispatch, FC, SetStateAction } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus, FaSearch } from "react-icons/fa";
import { Link } from "react-router-dom";

type Props = {
  setData: Dispatch<SetStateAction<AnyObject[]>>;
};

export const AdditionalSearchAddUI: FC<Props> = (props) => {
  const { setData } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onClear = () => form.resetFields();

  const onSubmit = (values: unknown) => {
    console.log(values, "additional-search");
    // setData(values);
    onClear();
  };

  return (
    <>
      <Form
        form={form}
        onFinish={onSubmit}
        id="additional-search"
        style={{ margin: "10px 0" }}
      >
        <Flex gap={8} align="start">
          <Form.Item name={"search"} style={{ flex: 1 }}>
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
