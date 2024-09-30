import {
  Flex,
  Typography,
  Row,
  Col,
  Select,
  Button,
  Table,
  Popconfirm,
} from "antd";
import { AnyObject } from "antd/es/_util/type";
import { t } from "i18next";
import { FC, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
type selectedDataType = {
  id: number | string;
  key: number | string;
  label: string;
  value: string;
  "category-tu"?: string;
  "sub-category-tu"?: string;
};

export const AddTableCategoryTuUI: FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<
    selectedDataType[] | []
  >([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<
    selectedDataType[] | []
  >([]);
  const [categoryOptions, setCategoryOptions] = useState<selectedDataType[]>([
    {
      id: 1,
      key: 1,
      label: "Раздел Т/У",
      value: "category-tu",
      "category-tu": "Раздел Т/У",
    },
    {
      id: 2,
      key: 2,
      label: "Раздел Т/У 2",
      value: "category-tu 2",
      "category-tu": "Раздел Т/У 2",
    },
  ]);
  const [subCategoryOptions, setSubCategoryOptions] = useState<
    selectedDataType[] | null
  >(null);
  const [data, setData] = useState<selectedDataType[]>([]);
  const columns = [
    {
      title: t("category-tu"),
      dataIndex: "category-tu",
      key: "category-tu",
    },
    {
      title: t("sub-category-tu"),
      dataIndex: "sub-category-tu",
      key: "sub-category-tu",
    },
    {
      title: t("action"),
      dataIndex: "action",
      key: "action",
      render: (text: string, record: selectedDataType) => (
        <Popconfirm
          title={t("delete")}
          onConfirm={() => onDelete(record.id)}
          okText="Да"
          cancelText="Нет"
        >
          <FaTrashAlt
            color="crimson"
            fontSize={16}
            cursor={"pointer"}
            title={t("delete")}
          />
        </Popconfirm>
      ),
    },
  ];

  const onDelete = async (id: string | number) => {
    setData(data.filter((item: AnyObject) => item.id !== id));
  };

  const addSubCategory = () => {
    setData([
      ...data,
      {
        ...selectedCategory[0],
        ...selectedSubCategory[0],
      },
    ]);
    setSelectedSubCategory([]);
    setSelectedCategory([]);
  };

  const onSelectCategory = (
    value: string,
    option: selectedDataType | unknown,
  ) => {
    setSelectedCategory([option as selectedDataType]);
    if ((option as selectedDataType).id === 1) {
      setSubCategoryOptions([
        {
          id: 1,
          key: 1,
          label: "Подраздел  Т/У 1.1",
          value: "sub-category-tu 1.1",
          "sub-category-tu": "Подраздел  Т/У 1.1",
        },
        {
          id: 2,
          key: 2,
          label: "Подраздел  Т/У 1.2",
          value: "sub-category-tu 1.2",
          "sub-category-tu": "Подраздел  Т/У 1.2",
        },
      ]);
    } else {
      setSubCategoryOptions([
        {
          id: 1,
          key: 1,
          label: "Подраздел  Т/У 2.1",
          value: "sub-category-tu 2.1",
          "sub-category-tu": "Подраздел  Т/У 2.1",
        },
        {
          id: 2,
          key: 2,
          label: "Подраздел  Т/У 2.2",
          value: "sub-category-tu 2.2",
          "sub-category-tu": "Подраздел  Т/У 2.2",
        },
      ]);
    }
  };

  const onSelectSubCategory = (
    value: string,
    option: selectedDataType | unknown,
  ) => {
    setSelectedSubCategory([option as selectedDataType]);
  };

  return (
    <Flex vertical gap={16} className="org-add-table-category-and-sub-category">
      <Typography.Title aria-level={4} level={4} style={{ margin: 0 }}>
        {t("product-services")}
      </Typography.Title>
      <Row gutter={16} align={"middle"}>
        <Col span={11}>
          <Flex align="center" gap={8}>
            <label htmlFor="category-tu">{t("category-tu")}</label>
            <Select
              showSearch
              id="category-tu"
              value={selectedCategory[0]?.value}
              onChange={onSelectCategory}
              options={categoryOptions}
              style={{ flex: 1 }}
            />
          </Flex>
        </Col>
        <Col span={11}>
          <Flex align="center" gap={8}>
            <label htmlFor="sub-category-tu">{t("sub-category-tu")}</label>
            <Select
              disabled={!subCategoryOptions}
              showSearch
              id="sub-category-tu"
              value={selectedSubCategory[0]?.value}
              onChange={onSelectSubCategory}
              options={subCategoryOptions ?? []}
              style={{ flex: 1 }}
            />
          </Flex>
        </Col>
        <Col span={2}>
          <Button
            disabled={selectedSubCategory.length === 0}
            type="primary"
            onClick={addSubCategory}
          >
            {t("add")}
          </Button>
        </Col>
      </Row>

      <Table
        bordered
        columns={columns}
        dataSource={data}
        pagination={false}
        scroll={{ y: 300 }}
      />
    </Flex>
  );
};
