import { Row, Col, Input, Form, FormInstance } from "antd";
import i18next from "i18next";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { SingleInputWithModalUI } from "@shared/ui/single-input-with-modal";
import { TwiceInputWithModal } from "@shared/ui/twice-input-with-modal";

/**
 * PersonalSearchPartUI
 *
 * This component is used to display personal search part in the search widget
 * of the Manage pages.
 *
 * It has the following functionality:
 *
 * - Displays a select for abonent
 * - Displays a select for address
 * - Displays a TwiceInputWithModalUI for category and sub-category
 * - Displays a SingleInputWithModalUI for main-org
 *
 * It takes the following props:
 *
 * - `form`: The form instance from antd.
 *
 * @param {Object} props - The props of the component.
 * @param {FormInstance} props.form - The form instance from antd.
 *
 * @returns {JSX.Element} - The JSX element of the component.
 */

type Props = {
  form: FormInstance;
};

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

// singleInputWithModal: {
//      name:-> name for select,
//      label:-> label for select,
//      dataFetcher: () => [{}] -> function to fetch data from server and return array of objects corresponding to columns,
//      columns: [] -> columns for table inside modal,
//      searchHref: -> href for search input inside modal,
//   },

const mocks = {
  twiceInputWithModal: {
    firstInputName: "category-tu",
    firstInputLabel: "Раздел-ТУ",
    secondInputName: "sub-category-tu",
    secondInputLabel: "Подраздел-ТУ",
    categoryHref: "/category",
    subCategoryHref: "/sub-category",
    categoryFetcher: () => [{ name: "Раздел-ТУ 1", key: 1, id: 1 }],
    subCategoryFetcher: () => [{ name: "Подраздел-ТУ 1", key: 1, id: 1 }],
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
  singleInputWithModal: {
    name: "phone-type",
    label: "Тип телефона",
    dataFetcher: () => [{ name: "Мобильный", key: 1, id: 1 }],
    columns: [
      {
        title: i18next.t("name"),
        dataIndex: "name",
        key: "name",
      },
    ],
    searchHref: "/phone-type",
  },
};

export const PersonalSearchPartUI: FC<Props> = (props) => {
  const { form } = props;
  const { t } = useTranslation();

  return (
    <Row>
      <Col span={24}>
        <Form.Item
          name="name"
          label={t("abonent")}
          style={{ marginBottom: 10 }}
        >
          <Input type="text" placeholder={t("abonent")} allowClear />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="address"
          label={t("address")}
          style={{ marginBottom: 10 }}
        >
          <Input type="text" placeholder={t("address")} allowClear />
        </Form.Item>
      </Col>
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
      <SingleInputWithModalUI
        searchHref={mocks.singleInputWithModal.searchHref}
        form={form}
        label={mocks.singleInputWithModal.label}
        name={mocks.singleInputWithModal.name}
        dataFetcher={mocks.singleInputWithModal.dataFetcher}
        columns={mocks.singleInputWithModal.columns}
      />
      <SingleInputWithModalUI
        searchHref="main-org"
        form={form}
        label="main-org"
        name="main-org"
        dataFetcher={() => [{ name: "Вазирлик", key: 1, id: 1 }]}
        columns={[
          {
            title: t("main-org"),
            dataIndex: "name",
            key: "name",
          },
        ]}
      />
    </Row>
  );
};
