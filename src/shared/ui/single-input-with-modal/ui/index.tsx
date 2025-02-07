import { Col, Form, FormInstance, Select } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { t } from "i18next";
import { FC, SetStateAction, Dispatch, useEffect, useState } from "react";

import { SearchModal } from "@shared/ui/search-modal";

type Props = {
  form?: FormInstance;
  columns: AnyObject[];
  name: string;
  label: string;
  loading?: boolean;
  data: AnyObject[];
  onOpen: () => void;
  isOpen: boolean;
  onClose: () => void;
  pagination: { page: number; limit: number };
  totalItems: number;
  setSearchValue: Dispatch<SetStateAction<string>>;
  setPagination: Dispatch<SetStateAction<{ page: number; limit: number }>>;
};

export const SingleInputWithModalUI: FC<Props> = (props) => {
  const {
    form,
    columns,
    isOpen,
    onOpen,
    onClose,
    name,
    loading,
    pagination,
    totalItems,
    label,
    data,
    setSearchValue,
    setPagination,
  } = props;
  const [selectedData, setSelectedData] = useState<AnyObject | null>(null);

  useEffect(() => {
    selectedData && form && form.setFieldValue(`${name}`, selectedData?.id);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedData]);

  return (
    <>
      <Col span={24}>
        <Form.Item
          name={`${name}`}
          label={t(`${label}`)}
          style={{ marginBottom: 10 }}
        >
          <Select
            allowClear
            dropdownStyle={{ display: "none" }}
            onClick={onOpen}
            value={selectedData?.id}
            labelRender={() => selectedData && selectedData?.name}
          />
        </Form.Item>
      </Col>
      <SearchModal
        loading={loading}
        pagination={pagination}
        totalItems={totalItems}
        data={data}
        columns={columns}
        isOpen={isOpen}
        onClose={onClose}
        title={t(`${label}`)}
        setPagination={setPagination}
        setSearchValue={setSearchValue}
        setSelectedData={setSelectedData}
      />
    </>
  );
};
