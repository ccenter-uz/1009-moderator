import {
  Flex,
  Typography,
  Row,
  Col,
  Button,
  Table,
  Popconfirm,
  SelectProps,
} from "antd";
import { AnyObject } from "antd/es/_util/type";
import i18next, { t } from "i18next";
import { FC, useEffect, useState } from "react";
import { FaTrashAlt } from "react-icons/fa";
import { useDispatch } from "react-redux";

import {
  useGetProductsQuery,
  useLazyGetSubCategoryQuery,
} from "@entities/product-services";

import { allActives } from "@shared/lib/helpers";
import { SearchableSelect } from "@shared/ui";

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
      dataIndex: "productServiceCategoryName",
      key: "productServiceCategoryName",
    },
    {
      title: t("sub-category-tu"),
      dataIndex: "productServiceSubCategoryName",
      key: "productServiceSubCategoryName",
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
        key: Date.now(),
        ...selectedCategory[0],
        ...selectedSubCategory[0],
        colId: Date.now(),
      },
    ];
    dispatch(setData(newData));
    setSelectedSubCategory([]);
    setSelectedCategory([]);
    triggerSubcategoryTu({ ...allActives });
  };

  const onSelectCategory: SelectProps["onSelect"] = (value, option) => {
    setSelectedCategory([
      {
        productServiceCategoryId: value,
        productServiceCategoryName: option.label,
      },
    ]);
    setSelectedSubCategory([]);
    triggerSubcategoryTu({ categoryId: value, ...allActives });
  };

  const onSelectSubCategory: SelectProps["onSelect"] = (value, option) => {
    setSelectedSubCategory([
      {
        productServiceSubCategoryId: value,
        productServiceSubCategoryName: option.label,
      },
    ]);
    setSelectedCategory([
      {
        productServiceCategoryId: option.productCategoryValue,
        productServiceCategoryName: option.productCategoryLabel,
      },
    ]);
  };

  useEffect(() => {
    triggerSubcategoryTu({ ...allActives });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Flex vertical gap={16} className="org-add-table-category-and-sub-category">
      <Typography.Title aria-level={4} level={4} style={{ margin: 0 }}>
        {t("product-services")}
      </Typography.Title>
      <Row gutter={16} align={"middle"}>
        <Col span={8}>
          <Flex align="center" gap={8}>
            <label htmlFor="productServiceCategoryId">{t("category-tu")}</label>
            <SearchableSelect
              id="productServiceCategoryId"
              value={selectedCategory[0]?.productServiceCategoryId}
              onSelect={onSelectCategory}
              onClear={() => {
                setSelectedCategory([]);
                triggerSubcategoryTu({ ...allActives });
              }}
              disabled={isLoadingCategoryTu}
              options={
                categoryTuOptions?.data.map((item: AnyObject) => ({
                  key: item.id,
                  value: item.id,
                  label: item.name[i18next.language],
                })) || []
              }
            />
          </Flex>
        </Col>
        <Col span={14}>
          <Flex align="center" gap={8}>
            <label htmlFor="productServiceSubCategoryId">
              {t("sub-category-tu")}
            </label>
            <SearchableSelect
              id="productServiceSubCategoryId"
              value={selectedSubCategory[0]?.productServiceSubCategoryId}
              onSelect={onSelectSubCategory}
              onClear={() => setSelectedSubCategory([])}
              disabled={isLoadingSubcategoryTu}
              options={
                subcategoryTuOptions?.data.map((item: AnyObject) => ({
                  key: item.id,
                  productCategoryValue: item.ProductServiceCategory?.id,
                  productCategoryLabel:
                    item.ProductServiceCategory?.name[i18next.language],
                  value: item.id,
                  label: item.name[i18next.language],
                })) || []
              }
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
