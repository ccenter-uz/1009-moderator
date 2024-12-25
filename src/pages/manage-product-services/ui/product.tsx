import { Flex, Form } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { t } from "i18next";
import { FC, memo, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";

import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useUpdateProductMutation,
} from "@entities/product-services";
import { SingleNameCyrill } from "@entities/single-name-cyrill";
import { SingleNameRu } from "@entities/single-name-ru";
import { SingleNameUz } from "@entities/single-name-uz";

import {
  columnsForCategoriesTu,
  notificationResponse,
  returnAllParams,
} from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { ItableBasicData } from "@shared/types";
import { ManageWrapperBox, ModalAddEdit } from "@shared/ui";

import { editProductType, ProductServicesEnum } from "../model/types";

export const Product: FC = () => {
  const {
    [ProductServicesEnum.productPage]: page,
    [ProductServicesEnum.productLimit]: limit,
    [ProductServicesEnum.productSearch]: search,
  } = returnAllParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [form] = Form.useForm();
  const { data, isLoading } = useGetProductsQuery({
    page,
    limit,
    search,
  });
  const [deleteProduct] = useDeleteProductMutation();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [editingData, setEditingData] = useState<editProductType | null>(null);

  const handleEditOpen = (values: editProductType) => {
    setEditingData({ ...values, id: values.id });
    form.setFieldsValue({
      name_uz: values.name.uz,
      name_ru: values.name.ru,
      name_cyrill: values.name.cy,
    });
    onOpen();
  };

  const handleSearch = ({ search }: { search: string }) => {
    const previousParams = returnAllParams();

    setSearchParams({
      ...previousParams,
      [ProductServicesEnum.productSearch]: search,
    });
  };

  const handleSubmit = async (values: ItableBasicData) => {
    const body = {
      name: {
        ru: values.name_ru,
        uz: values.name_uz,
        cy: values.name_cyrill,
      },
      id: editingData?.id,
    };
    const request = editingData ? updateProduct : createProduct;

    const response = await request(body);

    notificationResponse(response, t, onClose);
    form.resetFields();
    onClose();
  };

  const onAdd = () => {
    onOpen();
    setEditingData(null);
    form.resetFields();
  };

  const onRowSelect = (record: AnyObject) => {
    const previousParams = returnAllParams();
    setSearchParams({
      ...previousParams,
      [ProductServicesEnum.productId]: record.id as string,
    });
  };

  const columns = [
    ...columnsForCategoriesTu,
    {
      flex: 0.5,
      title: "Действия",
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (text: string, record: editProductType) => {
        if (record.status === 1) {
          return (
            <Flex justify="center" align="center" gap={8}>
              <FaPencilAlt
                color="grey"
                fontSize={16}
                cursor={"pointer"}
                title={t("edit")}
                onClick={() => handleEditOpen(record)}
              />
              <DeleteTableItemUI fetch={() => deleteProduct(record.id)} />
            </Flex>
          );
        }
      },
    },
  ];

  return (
    <ManageWrapperBox
      loading={isLoading}
      totalItems={data?.total || 0}
      title={t("category-tu")}
      rowSelect
      onRowSelect={onRowSelect}
      pageName={ProductServicesEnum.productPage}
      limitName={ProductServicesEnum.productLimit}
      columns={columns}
      data={data?.data || []}
      add={onAdd}
      searchPart={
        <BasicSearchPartUI
          id={"product-search"}
          handleSearch={handleSearch}
          additionalParams={{
            search: searchParams.get(ProductServicesEnum.productSearch),
          }}
        />
      }
      modalPart={
        <Form
          form={form}
          onFinish={handleSubmit}
          id="manage-category-tu"
          className="manage-category-tu"
        >
          <ModalAddEdit
            loading={isLoading}
            open={isOpen}
            onClose={onClose}
            ruInputs={<SingleNameRu />}
            uzInputs={<SingleNameUz />}
            uzCyrillicInputs={<SingleNameCyrill />}
            formId={"manage-category-tu"}
          />
        </Form>
      }
    />
  );
};

export default memo(Product);
