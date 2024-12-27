import { Flex, Form } from "antd";
import { createSchemaFieldRule } from "antd-zod";
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
  getZodRequiredKeys,
  notificationResponse,
  returnAllParams,
  STATUS,
} from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { ItableBasicData } from "@shared/types";
import { ManageWrapperBox, ModalAddEdit } from "@shared/ui";

import { CategoryCreateFormDtoSchema } from "../model/dto";
import { CategorySubCategoryEnums, editSubcategoryType } from "../model/types";

export const SubCategory: FC = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [form] = Form.useForm();
  const formRule = createSchemaFieldRule(CategoryCreateFormDtoSchema);
  const formRequiredField = getZodRequiredKeys(CategoryCreateFormDtoSchema);
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

  const [isAddBtnDisable, setIsAddBtnDisable] = useState<boolean>(true);

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
      [CategorySubCategoryEnums.subCategorySearch]: search || "",
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
      categoryId: Number(searchParams.get(CategorySubCategoryEnums.categoryId)),
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
    const hasParamsCategoryId = searchParams.has(
      CategorySubCategoryEnums.categoryId,
    );
    setIsAddBtnDisable(!hasParamsCategoryId);

    if (searchParams.has(CategorySubCategoryEnums.categoryId)) {
      trigger({
        page: Number(page) || 1,
        limit: Number(limit) || 10,
        search,
        categoryId: Number(
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
      isAddBtnDisable={isAddBtnDisable}
      pageName={CategorySubCategoryEnums.subCategoryPage}
      limitName={CategorySubCategoryEnums.subCategoryLimit}
      searchPart={
        <BasicSearchPartUI
          id="sub-category-search"
          handleSearch={handleSearch}
          additionalParams={{
            search: searchParams.get(
              CategorySubCategoryEnums.subCategorySearch,
            ),
          }}
          isSearchBtnDisable={isAddBtnDisable}
        />
      }
      modalPart={
        <Form
          form={form}
          onFinish={handleSubmit}
          id="manage-sub-category"
          className="manage-sub-category"
        >
          <ModalAddEdit
            loading={isLoading}
            open={isOpen}
            onClose={onClose}
            ruInputs={
              <SingleNameRu
                rule={formRule}
                requiredFields={formRequiredField}
              />
            }
            uzInputs={
              <SingleNameUz
                rule={formRule}
                requiredFields={formRequiredField}
              />
            }
            uzCyrillicInputs={
              <SingleNameCyrill
                rule={formRule}
                requiredFields={formRequiredField}
              />
            }
            formId={"manage-sub-category"}
          />
        </Form>
      }
    />
  );
};
