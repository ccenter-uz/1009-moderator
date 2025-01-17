import { Flex, Form, Tooltip } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { createSchemaFieldRule } from "antd-zod";
import { t } from "i18next";
import { FC, memo, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";

import {
  useCreateProductMutation,
  useDeleteProductMutation,
  useGetProductsQuery,
  useRestoreProductMutation,
  useUpdateProductMutation,
} from "@entities/product-services";
import { SingleNameCyrill } from "@entities/single-name-cyrill";
import { SingleNameRu } from "@entities/single-name-ru";
import { SingleNameUz } from "@entities/single-name-uz";

import {
  columnsForCategoriesTu,
  getZodRequiredKeys,
  notificationResponse,
  returnAllParams,
  STATUS,
} from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { ItableBasicData } from "@shared/types";
import { ManageWrapperBox, ModalAddEdit } from "@shared/ui";

import { ProductServicesCreateFormDtoSchema } from "../model/dto";
import { editProductType, ProductServicesEnum } from "../model/types";

export const Product: FC = () => {
  const {
    [ProductServicesEnum.productPage]: page,
    [ProductServicesEnum.productLimit]: limit,
    [ProductServicesEnum.productSearch]: search,
    productStatus,
  } = returnAllParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [form] = Form.useForm();
  const formRule = createSchemaFieldRule(ProductServicesCreateFormDtoSchema);
  const formRequiredField = getZodRequiredKeys(
    ProductServicesCreateFormDtoSchema,
  );
  const { data, isLoading } = useGetProductsQuery({
    page,
    limit,
    search,
    status: productStatus || STATUS.ACTIVE,
  });
  const [deleteProduct] = useDeleteProductMutation();
  const [createProduct] = useCreateProductMutation();
  const [updateProduct] = useUpdateProductMutation();
  const [restoreProduct] = useRestoreProductMutation();
  const [editingData, setEditingData] = useState<editProductType | null>(null);

  const params = returnAllParams();

  const handleEditOpen = (values: editProductType) => {
    setEditingData({ ...values, id: values.id });
    form.setFieldsValue({
      name_uz: values.name.uz,
      name_ru: values.name.ru,
      name_uzcyrill: values.name.cy,
    });
    onOpen();
  };

  const handleSearch = ({
    search,
    status: productStatus = STATUS.ACTIVE,
  }: {
    search: string;
    status: number;
  }) => {
    let inputValue = search;
    if (inputValue === undefined || inputValue === null) {
      inputValue = "";
    }

    if (inputValue || inputValue === "" || typeof productStatus === "number") {
      setSearchParams({
        ...params,
        [ProductServicesEnum.productSearch]: inputValue,
        productStatus: productStatus.toString()
          ? productStatus.toString()
          : STATUS.ACTIVE.toString(),
      });
    }
  };

  const handleSubmit = async (values: ItableBasicData) => {
    const body = {
      name: {
        ru: values.name_ru,
        uz: values.name_uz,
        cy: values.name_uzcyrill,
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
        if (record.status === STATUS.ACTIVE) {
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
        } else if (record.status === STATUS.INACTIVE) {
          return (
            <Tooltip title={t("restore")}>
              <MdRestore
                color="grey"
                cursor={"pointer"}
                size={20}
                onClick={() => restoreProduct(record.id)}
              />
            </Tooltip>
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
            ruInputs={
              <SingleNameRu
                rule={formRule}
                requiredFields={formRequiredField}
                textarea
              />
            }
            uzInputs={
              <SingleNameUz
                rule={formRule}
                requiredFields={formRequiredField}
                textarea
              />
            }
            uzCyrillicInputs={
              <SingleNameCyrill
                rule={formRule}
                requiredFields={formRequiredField}
                textarea
              />
            }
            formId={"manage-category-tu"}
          />
        </Form>
      }
    />
  );
};

export default memo(Product);
