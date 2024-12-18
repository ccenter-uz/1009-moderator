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
import i18next, { t } from "i18next";
import { FC, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";

import {
  useGetProductsQuery,
  useLazyGetSubCategoryQuery,
} from "@entities/product-services";

import { allActives } from "@shared/lib/helpers";

type Props = {
  data: AnyObject[];
  setData: any;
};

export const TableCategoryServices: FC<Props> = (props) => {
  const { data, setData } = props;
  const dispatch = useDispatch();
  const { data: categoryTuOptions, isLoading: isLoadingCategoryTu } =
    useGetProductsQuery(allActives);
  const [
    triggerSubcategoryTu,
    { data: subcategoryTuOptions, isLoading: isLoadingSubcategoryTu },
  ] = useLazyGetSubCategoryQuery();
  const [selectedCategory, setSelectedCategory] = useState<AnyObject[]>([]);
  const [selectedSubCategory, setSelectedSubCategory] = useState<AnyObject[]>(
    [],
  );

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

  const onSelectCategory = (
    value: string,
    option: { value: string | number; label: string },
  ) => {
    setSelectedCategory([{ categoryId: value, "category-tu": option.label }]);

    triggerSubcategoryTu({ categoryId: value, ...allActives });
  };

  const onSelectSubCategory = (
    value: string,
    option: { value: string | number; label: string },
  ) => {
    setSelectedSubCategory([
      { subCategoryId: value, "sub-category-tu": option.label },
    ]);
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
              value={selectedCategory[0]?.["category-tu"]}
              onSelect={onSelectCategory}
              allowClear
              disabled={isLoadingCategoryTu}
              options={
                categoryTuOptions?.data.map((item: AnyObject) => ({
                  value: item.id,
                  label: item.name[i18next.language],
                })) || []
              }
              style={{ flex: 1 }}
            />
          </Flex>
        </Col>
        <Col span={11}>
          <Flex align="center" gap={8}>
            <label htmlFor="sub-category-tu">{t("sub-category-tu")}</label>
            <Select
              showSearch
              id="sub-category-tu"
              value={selectedSubCategory[0]?.["sub-category-tu"]}
              onSelect={onSelectSubCategory}
              allowClear
              disabled={isLoadingSubcategoryTu}
              options={
                subcategoryTuOptions?.data.map((item: AnyObject) => ({
                  value: item.id,
                  label: item.name[i18next.language],
                })) || []
              }
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
