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
import { useDispatch } from "react-redux";

type Props = {
  data: AnyObject[];
  setData: any;
};

// MOCKS
const mocks = {
  categoryOptions: [
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
  ],
  subCategoryOptions: [
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
  ],
  columns: [
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
  ],
};

export const TableCategoryServices: FC<Props> = (props) => {
  const { data, setData } = props;
  const dispatch = useDispatch();
  const [selectedCategory, setSelectedCategory] = useState<AnyObject[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<AnyObject[]>(
    [],
  );
  const [categoryOptions, setCategoryOptions] = useState<AnyObject[]>(
    mocks.categoryOptions,
  );
  const [subCategoryOptions, setSubCategoryOptions] = useState<
    AnyObject[] | []
  >([]);

  const overColumns = [
    ...mocks.columns,
    {
      title: t("action"),
      dataIndex: "action",
      key: "action",
      render: (text: string, record: AnyObject) => (
        <Popconfirm
          title={t("delete")}
          onConfirm={() => onDelete(record?.colId as string)}
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
    const newData = data.filter((item: AnyObject) => item.colId !== id);
    dispatch(setData(newData));
  };

  const addSubCategory = () => {
    const newData = [
      ...data,
      {
        ...selectedCategory[0],
        ...selectedSubCategory[0],
        colId: Date.now(),
      },
    ];
    dispatch(setData(newData));
    setSelectedSubCategory([]);
    setSelectedCategory([]);
  };

  const onSelectCategory = (value: string, option: AnyObject | unknown) => {
    setSelectedCategory([option as AnyObject]);
    setSubCategoryOptions(mocks.subCategoryOptions);
  };

  const onSelectSubCategory = (value: string, option: AnyObject | unknown) => {
    setSelectedSubCategory([option as AnyObject]);
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
              disabled={subCategoryOptions.length === 0}
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
        columns={overColumns}
        dataSource={data}
        pagination={false}
        scroll={{ y: 300 }}
      />
    </Flex>
  );
};
