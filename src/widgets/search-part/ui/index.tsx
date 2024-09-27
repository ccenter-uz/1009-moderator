import { Button, Col, Divider, Flex, Form, Row } from "antd";
import i18next from "i18next";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { AddressSearchPartUI } from "@features/address-search-part";
import { ContactSearchPartUI } from "@features/contact-search-part";
import { PersonalSearchPartUI } from "@features/personal-search-part";

import { TwiceInputWithModal } from "@shared/ui/twice-input-with-modal";

// MOCKS
// fetches data from backend for category data
const categoryFetcher = () => [{ name: "Категория 1", key: 1, id: 1 }];
// fetches data from backend for sub-category data
const subCategoryFetcher = () => [{ name: "Подкатегория 1", key: 1, id: 1 }];
// cols
const columns = [
  {
    title: i18next.t("name"),
    dataIndex: "name",
    key: "name",
  },
];
// enums for label and value of inputs
enum VARS {
  category = "category",
  subCategory = "sub-category",
}

export const SearchPartUI: FC = () => {
  const { t } = useTranslation();
  const [form] = Form.useForm();

  const onSubmit = (values: unknown) => {
    console.log(values, "search-part");
  };

  const onCancel = () => {
    form.resetFields();
  };

  return (
    <Form form={form} id="search-part" onFinish={onSubmit}>
      <TwiceInputWithModal
        form={form}
        firstInputValue={VARS.category}
        firstInputLabel={VARS.category}
        secondInputValue={VARS.subCategory}
        secondInputLabel={VARS.subCategory}
        categoryHref={VARS.category}
        subCategoryHref={VARS.subCategory}
        categoryFetcher={categoryFetcher}
        subCategoryFetcher={subCategoryFetcher}
        categoryColumns={columns}
        subCategoryColumns={columns}
      />
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
