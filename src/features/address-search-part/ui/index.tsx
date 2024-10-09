import { Row, Col, Form, Select, FormInstance } from "antd";
import i18next from "i18next";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { SingleInputWithModalUI } from "@shared/ui/single-input-with-modal";

type Props = {
  form: FormInstance;
};

// singleInputWithModal: {
//      name:-> name for select,
//      label:-> label for select,
//      dataFetcher: () => [{}] -> function to fetch data from server and return array of objects corresponding to columns,
//      columns: [] -> columns for table inside modal,
//      searchHref: -> href for search input inside modal,
//   },

const mocks = {
  singleInputWithModal: {
    name: "name",
    label: "label",
    dataFetcher: () => [{ name: "Мобильный", key: 1, id: 1 }],
    columns: [
      {
        title: i18next.t("city"),
        dataIndex: "name",
        key: "name",
      },
    ],
    searchHref: "/search",
  },
};

export const AddressSearchPartUI: FC<Props> = (props) => {
  const { form } = props;
  const { t } = useTranslation();

  return (
    <Row>
      <Col span={24}>
        <Form.Item
          name="region"
          label={t("region")}
          style={{ marginBottom: 10 }}
        >
          <Select options={[]} allowClear />
        </Form.Item>
      </Col>
      <SingleInputWithModalUI
        form={form}
        name={"city"}
        label={"city"}
        dataFetcher={mocks.singleInputWithModal.dataFetcher}
        searchHref={mocks.singleInputWithModal.searchHref}
        columns={mocks.singleInputWithModal.columns}
      />
      <SingleInputWithModalUI
        form={form}
        name={"district"}
        label={"district"}
        dataFetcher={mocks.singleInputWithModal.dataFetcher}
        searchHref={mocks.singleInputWithModal.searchHref}
        columns={mocks.singleInputWithModal.columns}
      />
      <SingleInputWithModalUI
        form={form}
        name={"village"}
        label={"village"}
        dataFetcher={mocks.singleInputWithModal.dataFetcher}
        searchHref={mocks.singleInputWithModal.searchHref}
        columns={mocks.singleInputWithModal.columns}
      />
      <SingleInputWithModalUI
        form={form}
        name={"address-sprav"}
        label={"address-sprav"}
        dataFetcher={mocks.singleInputWithModal.dataFetcher}
        searchHref={mocks.singleInputWithModal.searchHref}
        columns={mocks.singleInputWithModal.columns}
      />
      <SingleInputWithModalUI
        form={form}
        name={"nearby"}
        label={"nearby"}
        dataFetcher={mocks.singleInputWithModal.dataFetcher}
        searchHref={mocks.singleInputWithModal.searchHref}
        columns={mocks.singleInputWithModal.columns}
      />
    </Row>
  );
};
