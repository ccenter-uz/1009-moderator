import { Flex, Form, Tooltip } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { t } from "i18next";
import { FC, useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";

import {
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useLazyGetSubCategoryQuery,
  useRestoreSubCategoryMutation,
  useUpdateSubCategoryMutation,
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
import { editServiceType, ProductServicesEnum } from "../model/types";

export const Service: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [form] = Form.useForm();
  const formRule = createSchemaFieldRule(ProductServicesCreateFormDtoSchema);
  const formRequiredField = getZodRequiredKeys(
    ProductServicesCreateFormDtoSchema,
  );
  const {
    [ProductServicesEnum.servicePage]: page,
    [ProductServicesEnum.serviceLimit]: limit,
    [ProductServicesEnum.serviceSearch]: search,
    serviceStatus,
  } = returnAllParams();
  const [trigger, { data, isLoading }] = useLazyGetSubCategoryQuery();
  const [createSubCategory] = useCreateSubCategoryMutation();
  const [updateSubCategory] = useUpdateSubCategoryMutation();
  const [deleteSubCategory] = useDeleteSubCategoryMutation();
  const [restoreService] = useRestoreSubCategoryMutation();
  const [editingData, setEditingData] = useState<editServiceType | null>(null);

  const [isAddBtnDisable, setIsAddBtnDisable] = useState<boolean>(true);

  const handleEditOpen = (values: editServiceType) => {
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
    status,
  }: {
    search: string;
    status: string;
  }) => {
    const inputValue = search || "";

    if (inputValue || inputValue === "") {
      const params = returnAllParams();
      setSearchParams({
        ...params,
        serviceStatus: status ? status.toString() : STATUS.ACTIVE.toString(),
        [ProductServicesEnum.serviceSearch]: inputValue,
      });
    }
  };

  const handleSubmit = async (serviceData: ItableBasicData) => {
    const serviceBody = {
      name: {
        ru: serviceData.name_ru,
        uz: serviceData.name_uz,
        cy: serviceData.name_uzcyrill,
      },
    };

    const request =
      editingData?.id != null ? updateSubCategory : createSubCategory;

    const response = await request({
      ...serviceBody,
      id: editingData?.id,
      productServiceCategoryId: Number(
        searchParams.get(ProductServicesEnum.productId),
      ),
    });

    notificationResponse(response, t, onClose);
    form.resetFields();
    onClose();
  };

  const onAdd = () => {
    onOpen();
    setEditingData(null);
    form.resetFields();
  };

  const columns = [
    ...columnsForCategoriesTu,
    {
      flex: 0.5,
      title: t("action"),
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (text: string, record: editServiceType) => {
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
              <DeleteTableItemUI fetch={() => deleteSubCategory(record.id)} />
            </Flex>
          );
        } else if (record.status === 0) {
          return (
            <Tooltip title={t("restore")}>
              <MdRestore
                color="grey"
                cursor={"pointer"}
                size={20}
                onClick={() => restoreService(record.id)}
              />
            </Tooltip>
          );
        }
      },
    },
  ];

  useEffect(() => {
    const hasParamsServiceId = searchParams.has(ProductServicesEnum.productId);
    setIsAddBtnDisable(!hasParamsServiceId);
    console.log(Number(searchParams.get(ProductServicesEnum.productId)));
    if (searchParams.has(ProductServicesEnum.productId)) {
      trigger({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        search,
        categoryId: Number(searchParams.get(ProductServicesEnum.productId)),
        status: serviceStatus || STATUS.ACTIVE,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    searchParams.get(ProductServicesEnum.productId),
    search,
    page,
    limit,
    serviceStatus,
  ]);

  return (
    <ManageWrapperBox
      loading={isLoading}
      totalItems={data?.total || 0}
      title={t("sub-category-tu")}
      pageName={ProductServicesEnum.servicePage}
      limitName={ProductServicesEnum.serviceLimit}
      columns={columns}
      data={data?.data || []}
      add={onAdd}
      isAddBtnDisable={isAddBtnDisable}
      searchPart={
        <BasicSearchPartUI
          id={"service-search"}
          handleSearch={handleSearch}
          additionalParams={{
            search: searchParams.get(ProductServicesEnum.serviceSearch),
          }}
          isSearchBtnDisable={isAddBtnDisable}
        />
      }
      modalPart={
        <Form
          form={form}
          onFinish={handleSubmit}
          id="manage-sub-category-tu"
          className="manage-sub-category-tu"
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
            formId={"manage-sub-category-tu"}
          />
        </Form>
      }
    />
  );
};
