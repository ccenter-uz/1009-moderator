import { Col, Form, FormInstance, Select } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import { t } from "i18next";
import { FC, useEffect, useState } from "react";

import { useDisclosure } from "@shared/lib/hooks";
import { SearchModal } from "@shared/ui/search-modal";

type Props = {
  form?: FormInstance;
  value: string;
  label: string;
  dataFetcher: () => AnyObject[];
  columns: ColumnsType;
  searchHref: string;
};
export const SingleInputWithModalUI: FC<Props> = (props) => {
  const { form, value, label, dataFetcher, columns, searchHref } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [selectedData, setSelectedData] = useState<AnyObject | null>(null);
  const [data, setData] = useState<AnyObject[] | null>(null);
  const onClick = () => {
    dataFetcher && setData(dataFetcher);
    onOpen();
  };

  const searchFetcher = (values: AnyObject) => {
    console.log(values, "values");
    console.log(searchHref, "searchHref");
  };

  useEffect(() => {
    selectedData && form && form.setFieldValue(`${value}`, selectedData?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedData]);

  return (
    <>
      <Col span={24}>
        <Form.Item
          name={`${value}`}
          label={t(`${label}`)}
          style={{ marginBottom: 10 }}
        >
          <Select
            allowClear
            dropdownStyle={{ display: "none" }}
            onClick={onClick}
            value={selectedData?.id}
            labelRender={() => selectedData && selectedData?.name}
          />
        </Form.Item>
      </Col>
      <SearchModal
        searchFetcher={searchFetcher}
        data={data}
        columns={columns}
        isOpen={isOpen}
        onClose={onClose}
        title={t(`${label}`)}
        setSelectedData={setSelectedData}
      />
    </>
  );
};
