import { Button, Col, Divider, Flex, Form, Row } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { FC, SetStateAction, Dispatch } from "react";
import { useTranslation } from "react-i18next";

import { PersonalSearchPartUI } from "@widgets/personal-search-part";

import { AddressSearchPartUI } from "@features/address-search-part";
import { CategorySubcategorySelect } from "@features/category-subCategory-select";
import { ContactSearchPartUI } from "@features/contact-search-part";

type Props = {
  setSearchValues: Dispatch<SetStateAction<AnyObject | null>>;
};

export const SearchPartUI: FC<Props> = (props) => {
  const { setSearchValues } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onSubmit = (values: AnyObject) => {
    setSearchValues(values);
  };

  const onCancel = () => {
    setSearchValues(null);
    form.resetFields();
  };

  return (
    <Form form={form} id="search-part" onFinish={onSubmit}>
      <CategorySubcategorySelect form={form} />
      <Divider />
      <Row gutter={24}>
        <Col span={8}>
          <PersonalSearchPartUI form={form} />
        </Col>
        <Col span={8}>
          <AddressSearchPartUI form={form} />
        </Col>
        <Col span={8}>
          <ContactSearchPartUI />
        </Col>
      </Row>
      <Flex justify="end" align="middle" gap={8}>
        <Button onClick={onCancel}>{t("cancel")}</Button>
        <Button htmlType="submit" type="primary" form="search-part">
          {t("search")}
        </Button>
      </Flex>
      <Divider />
    </Form>
  );
};
