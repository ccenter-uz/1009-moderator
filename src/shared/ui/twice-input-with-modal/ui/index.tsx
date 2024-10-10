import { Col, Select, Form, FormInstance } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { ColumnsType } from "antd/es/table";
import { t } from "i18next";
import { FC, useEffect, useState } from "react";

import { useDisclosure } from "@shared/lib/hooks";
import { SearchModal } from "@shared/ui/search-modal";

type Props = {
  form: FormInstance;
  firstInputName: string;
  firstInputLabel: string;
  secondInputName: string;
  secondInputLabel: string;
  categoryHref: string;
  subCategoryHref: string;
  categoryFetcher: () => AnyObject[];
  subCategoryFetcher: () => AnyObject[];
  categoryColumns: ColumnsType<AnyObject>;
  subCategoryColumns: ColumnsType<AnyObject>;
};

export const TwiceInputWithModal: FC<Props> = (props) => {
  const {
    form,
    firstInputLabel,
    firstInputName,
    secondInputLabel,
    secondInputName,
    categoryHref,
    subCategoryHref,
    categoryFetcher,
    subCategoryFetcher,
    categoryColumns,
    subCategoryColumns,
  } = props;
  const { isOpen, onOpen, onClose } = useDisclosure();
  const {
    isOpen: subCategoryIsOpen,
    onOpen: subCategoryOnOpen,
    onClose: subCategoryOnClose,
  } = useDisclosure();
  const [selectedDataCategory, setSelectedDataCategory] =
    useState<AnyObject | null>();
  const [selectedDataSubCategory, setSelectedDataSubCategory] =
    useState<AnyObject | null>();
  const [data, setData] = useState<AnyObject[]>([]);

  const onClickCategory = () => {
    categoryFetcher && setData(categoryFetcher);
    onOpen();
  };

  const onClickSubCategory = () => {
    subCategoryFetcher && setData(subCategoryFetcher);
    subCategoryOnOpen();
  };

  const categorySearch = (value: AnyObject) => {
    console.log(value, "categorySearch");
    console.log(categoryHref, "categoryHref");
  };
  const subCategorySearch = (value: AnyObject) => {
    console.log(value, "subCategorySearch");
    console.log(subCategoryHref, "subCategoryHref");
  };

  useEffect(() => {
    selectedDataCategory &&
      form.setFieldValue(`${firstInputName}`, selectedDataCategory?.id);

    selectedDataSubCategory &&
      form.setFieldValue(`${secondInputName}`, selectedDataSubCategory?.id);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDataCategory, selectedDataSubCategory]);

  return (
    <>
      <Col span={24}>
        <Form.Item
          name={`${firstInputName}`}
          label={t(`${firstInputLabel}`)}
          style={{ marginBottom: 10 }}
        >
          <Select
            allowClear
            dropdownStyle={{ display: "none" }}
            onClick={onClickCategory}
            value={selectedDataCategory?.id}
            labelRender={() => selectedDataCategory?.name}
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name={`${secondInputName}`}
          label={t(`${secondInputLabel}`)}
          style={{ marginBottom: 10 }}
        >
          <Select
            allowClear
            disabled={!selectedDataCategory}
            dropdownStyle={{ display: "none" }}
            onClick={onClickSubCategory}
            value={selectedDataSubCategory?.id}
            labelRender={() => selectedDataSubCategory?.name}
          />
        </Form.Item>
      </Col>
      {/* RAZDEL-TU */}
      <SearchModal
        searchFetcher={categorySearch}
        data={data}
        columns={categoryColumns || []}
        isOpen={isOpen}
        onClose={onClose}
        title={t(`${firstInputLabel}`)}
        onClickSubCategory={onClickSubCategory}
        setSelectedData={setSelectedDataCategory}
      />
      {/* PODRAZDEL-TU */}
      <SearchModal
        searchFetcher={subCategorySearch}
        data={data}
        columns={subCategoryColumns || []}
        isOpen={subCategoryIsOpen}
        onClose={subCategoryOnClose}
        title={t(`${secondInputLabel}`)}
        setSelectedData={setSelectedDataSubCategory}
      />
    </>
  );
};
