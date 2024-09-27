import { Row, Col, Input, Form, FormInstance } from "antd";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { SingleInputWithModalUI } from "@shared/ui/single-input-with-modal";
import { TwiceInputWithModal } from "@shared/ui/twice-input-with-modal";

type Props = {
  form: FormInstance;
};

// MOCKS
// fetches data from backend for category data
const categoryFetcher = () => [{ name: "Категория 1", key: 1, id: 1 }];
// fetches data from backend for sub-category data
const subCategoryFetcher = () => [{ name: "Подкатегория 1", key: 1, id: 1 }];

const columns = [
  {
    title: "Категория",
    dataIndex: "name",
    key: "name",
  },
];

enum VARS {
  categoryTu = "category-tu",
  subCategoryTu = "sub-category-tu",
}

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
        firstInputValue={VARS.categoryTu}
        firstInputLabel={VARS.categoryTu}
        secondInputValue={VARS.subCategoryTu}
        secondInputLabel={VARS.subCategoryTu}
        categoryHref={VARS.categoryTu}
        subCategoryHref={VARS.subCategoryTu}
        categoryFetcher={categoryFetcher}
        subCategoryFetcher={subCategoryFetcher}
        categoryColumns={columns}
        subCategoryColumns={columns}
      />
      <SingleInputWithModalUI
        searchHref="phone-type"
        form={form}
        label="phone-type"
        value="phone-type"
        dataFetcher={() => [{ name: "Мобильный", key: 1, id: 1 }]}
        columns={[
          {
            title: t("phone-type"),
            dataIndex: "name",
            key: "name",
          },
        ]}
      />
      <SingleInputWithModalUI
        searchHref="main-org"
        form={form}
        label="main-org"
        value="main-org"
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
