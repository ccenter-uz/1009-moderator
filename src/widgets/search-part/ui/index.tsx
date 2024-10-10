import { Button, Col, Divider, Flex, Form, Row } from "antd";
import i18next from "i18next";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { AddressSearchPartUI } from "@features/address-search-part";
import { ContactSearchPartUI } from "@features/contact-search-part";
import { PersonalSearchPartUI } from "@features/personal-search-part";

import { TwiceInputWithModal } from "@shared/ui/twice-input-with-modal";

// MOCKS
// const mocks ={
// twiceInputWithModal: {
//      firstInputName:-> name for first select,
//      firstInputLabel:-> label for first select and title for modal,
//      secondInputName: -> name for second select,
//      secondInputLabel: -> label for second select and title for modal,
//      categoryHref: -> href for category inside modal,
//      subCategoryHref: -> href for sub-category inside modal,
//      categoryFetcher: () => [{}] -> function to fetch data from server and return array of objects corresponding to category-columns,
//      subCategoryFetcher: () => [{}] -> function to fetch data from server and return array of objects corresponding to sub-category-columns,
//      categoryColumns: [] -> columns for category table inside modal,
//      subCategoryColumns: [] -> columns for sub-category table inside modal,
// },
// }

const mocks = {
  twiceInputWithModal: {
    firstInputName: "category",
    firstInputLabel: "Раздел",
    secondInputName: "sub-category",
    secondInputLabel: "Подраздел",
    categoryHref: "/category",
    subCategoryHref: "/sub-category",
    categoryFetcher: () => [{ name: "Раздел 1", key: 1, id: 1 }],
    subCategoryFetcher: () => [{ name: "Подраздел 1", key: 1, id: 1 }],
    categoryColumns: [
      {
        title: i18next.t("name"),
        dataIndex: "name",
        key: "name",
      },
    ],
    subCategoryColumns: [
      {
        title: i18next.t("name"),
        dataIndex: "name",
        key: "name",
      },
    ],
  },
};

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
        firstInputName={mocks.twiceInputWithModal.firstInputName}
        firstInputLabel={mocks.twiceInputWithModal.firstInputLabel}
        secondInputName={mocks.twiceInputWithModal.secondInputName}
        secondInputLabel={mocks.twiceInputWithModal.secondInputLabel}
        categoryHref={mocks.twiceInputWithModal.categoryHref}
        subCategoryHref={mocks.twiceInputWithModal.subCategoryHref}
        categoryFetcher={mocks.twiceInputWithModal.categoryFetcher}
        subCategoryFetcher={mocks.twiceInputWithModal.subCategoryFetcher}
        categoryColumns={mocks.twiceInputWithModal.categoryColumns}
        subCategoryColumns={mocks.twiceInputWithModal.subCategoryColumns}
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
