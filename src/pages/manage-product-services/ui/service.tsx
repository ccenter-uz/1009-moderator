import { Flex, Form } from "antd";
import { t } from "i18next";
import { FC, useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";

import {
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useLazyGetSubCategoryQuery,
  useUpdateSubCategoryMutation,
} from "@entities/product-services";
import { SingleNameCyrill } from "@entities/single-name-cyrill";
import { SingleNameRu } from "@entities/single-name-ru";
import { SingleNameUz } from "@entities/single-name-uz";

import {
  columnsForCategories,
  notificationResponse,
  returnAllParams,
} from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { ItableBasicData } from "@shared/types";
import { ManageWrapperBox, ModalAddEdit } from "@shared/ui";

import { editServiceType, ProductServicesEnum } from "../model/types";

export const Service: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [form] = Form.useForm();
  const {
    [ProductServicesEnum.servicePage]: page,
    [ProductServicesEnum.serviceLimit]: limit,
    [ProductServicesEnum.serviceSearch]: search,
  } = returnAllParams();
  const [trigger, { data, isLoading }] = useLazyGetSubCategoryQuery();
  const [createSubCategory] = useCreateSubCategoryMutation();
  const [updateSubCategory] = useUpdateSubCategoryMutation();
  const [deleteSubCategory] = useDeleteSubCategoryMutation();
  const [editingData, setEditingData] = useState<editServiceType | null>(null);

  const handleEditOpen = (values: editServiceType) => {
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
      [ProductServicesEnum.serviceSearch]: search,
    });
  };

  const handleSubmit = async (serviceData: ItableBasicData) => {
    const serviceBody = {
      name: {
        ru: serviceData.name_ru,
        uz: serviceData.name_uz,
        cy: serviceData.name_cyrill,
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
    ...columnsForCategories,
    {
      flex: 0.5,
      title: "Действия",
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
        }
      },
    },
  ];

  useEffect(() => {
    if (searchParams.has(ProductServicesEnum.productId)) {
      trigger({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        search,
        category_id: Number(searchParams.get(ProductServicesEnum.productId)),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams.get(ProductServicesEnum.productId), search, page, limit]);

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
      searchPart={
        <BasicSearchPartUI id={"service-search"} handleSearch={handleSearch} />
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
            ruInputs={<SingleNameRu />}
            uzInputs={<SingleNameUz />}
            uzCyrillicInputs={<SingleNameCyrill />}
            formId={"manage-sub-category-tu"}
          />
        </Form>
      }
    />
  );
};
