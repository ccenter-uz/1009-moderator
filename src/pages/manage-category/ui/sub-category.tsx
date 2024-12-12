import { Flex, Form } from "antd";
import { t } from "i18next";
import { FC, useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";

import {
  useLazyGetSubCategoriesQuery,
  useCreateSubCategoriesMutation,
  useUpdateSubCategoriesMutation,
  useDeleteSubCategoriesMutation,
} from "@entities/category-subcategory";
import { SingleNameCyrill } from "@entities/single-name-cyrill";
import { SingleNameRu } from "@entities/single-name-ru";
import { SingleNameUz } from "@entities/single-name-uz";

import {
  columnsForCategories,
  notificationResponse,
  returnAllParams,
  STATUS,
} from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { ItableBasicData } from "@shared/types";
import { ManageWrapperBox, ModalAddEdit } from "@shared/ui";

import { CategorySubCategoryEnums, editSubcategoryType } from "../model/types";

export const SubCategory: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [form] = Form.useForm();
  const {
    [CategorySubCategoryEnums.subCategoryPage]: page,
    [CategorySubCategoryEnums.subCategoryLimit]: limit,
    [CategorySubCategoryEnums.subCategorySearch]: search,
  } = returnAllParams();
  const [trigger, { data, isLoading }] = useLazyGetSubCategoriesQuery();
  const [createSubCategory] = useCreateSubCategoriesMutation();
  const [updateSubCategory] = useUpdateSubCategoriesMutation();
  const [deleteSubCategory] = useDeleteSubCategoriesMutation();
  const [editingData, setEditingData] = useState<editSubcategoryType | null>(
    null,
  );

  const handleEditOpen = (values: editSubcategoryType) => {
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
      [CategorySubCategoryEnums.subCategorySearch]: search,
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
        searchParams.get(CategorySubCategoryEnums.categoryId),
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
      render: (text: string, record: editSubcategoryType) => {
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
              <DeleteTableItemUI fetch={() => deleteSubCategory(record.id)} />
            </Flex>
          );
        }
      },
    },
  ];

  useEffect(() => {
    if (searchParams.has(CategorySubCategoryEnums.categoryId)) {
      trigger({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        search,
        category_id: Number(
          searchParams.get(CategorySubCategoryEnums.categoryId),
        ),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    // eslint-disable-next-line react-hooks/exhaustive-deps
    searchParams.get(CategorySubCategoryEnums.categoryId),
    search,
    page,
    limit,
  ]);

  return (
    <ManageWrapperBox
      loading={isLoading}
      totalItems={data?.total || 0}
      title={t("sub-category")}
      columns={columns}
      data={data?.data || []}
      add={onAdd}
      pageName={CategorySubCategoryEnums.subCategoryPage}
      limitName={CategorySubCategoryEnums.subCategoryLimit}
      searchPart={<BasicSearchPartUI handleSearch={handleSearch} />}
      modalPart={
        <Form
          form={form}
          onFinish={handleSubmit}
          id="modal-add-edit"
          className="manage-sub-category"
        >
          <ModalAddEdit
            loading={isLoading}
            open={isOpen}
            onClose={onClose}
            ruInputs={<SingleNameRu />}
            uzInputs={<SingleNameUz />}
            uzCyrillicInputs={<SingleNameCyrill />}
            formId={"modal-add-edit"}
          />
        </Form>
      }
    />
  );
};
