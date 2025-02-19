import { Flex, Form, Tooltip } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import i18next, { t } from "i18next";
import { FC, useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";
import { TableOrderFilterUI } from "@features/table-order-filter";

import {
  useLazyGetSubCategoriesQuery,
  useCreateSubCategoriesMutation,
  useUpdateSubCategoriesMutation,
  useDeleteSubCategoriesMutation,
  useRestoreSubCategoriesMutation,
} from "@entities/category-subcategory";
import { SingleNameCyrill } from "@entities/single-name-cyrill";
import { SingleNameRu } from "@entities/single-name-ru";
import { SingleNameUz } from "@entities/single-name-uz";

import {
  columnsForSubcategories,
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
    [CategorySubCategoryEnums.subCategoryStatus]: subCategoryStatus,
  } = returnAllParams();
  const [order, setOrder] = useState<"name" | "orderNumber">("orderNumber");
  const [langCode, setLangCode] = useState<"ru" | "uz" | "cy">(
    i18next.language as "ru" | "uz" | "cy",
  );
  const [trigger, { data, isLoading }] = useLazyGetSubCategoriesQuery();
  const [createSubCategory] = useCreateSubCategoriesMutation();
  const [updateSubCategory] = useUpdateSubCategoriesMutation();
  const [deleteSubCategory] = useDeleteSubCategoriesMutation();
  const [restoreSubCategory] = useRestoreSubCategoriesMutation();
  const [editingData, setEditingData] = useState<editSubcategoryType | null>(
    null,
  );

  const [isAddBtnDisable, setIsAddBtnDisable] = useState<boolean>(true);
  const [isFilterReset, setIsFilterReset] = useState<
    string | number | undefined
  >();

  const params = returnAllParams();
  const handleEditOpen = (values: editSubcategoryType) => {
    setEditingData({ ...values, id: values.id });
    form.setFieldsValue({
      name_uz: values.name.uz,
      name_ru: values.name.ru,
      name_uzcyrill: values.name.cy,
      orderNumber: values.order_number,
    });
    onOpen();
  };

  const handleSearch = ({
    search,
    status = STATUS.ACTIVE,
  }: {
    search: string;
    status: number;
  }) => {
    const params = returnAllParams();
    setSearchParams({
      ...params,
      [CategorySubCategoryEnums.subCategoryPage]: "1",
      [CategorySubCategoryEnums.subCategoryStatus]: status.toString()
        ? status.toString()
        : STATUS.ACTIVE.toString(),
      [CategorySubCategoryEnums.subCategorySearch]: search || "",
    });
  };

  const handleSubmit = async (serviceData: ItableBasicData) => {
    const serviceBody = {
      orderNumber: serviceData.orderNumber
        ? Number(serviceData.orderNumber)
        : null,
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
      categoryId: Number(searchParams.get(CategorySubCategoryEnums.categoryId)),
    });

    notificationResponse(response, onClose);
    form.resetFields();
    onClose();
  };

  const onAdd = () => {
    onOpen();
    setEditingData(null);
    form.resetFields();
  };

  useEffect(() => {
    if (isFilterReset) {
      setSearchParams({
        ...params,
        [CategorySubCategoryEnums.subCategorySearch]: "",
        [CategorySubCategoryEnums.subCategoryStatus]: STATUS.ACTIVE.toString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterReset]);

  const columns = [
    {
      title: t("name-ru"),
      dataIndex: "name",
      key: "name",
      render: (text: { ru: string }) => text?.ru,
      filterDropdown: () => (
        <TableOrderFilterUI
          langCode="ru"
          setLangCode={setLangCode}
          order={order}
          setOrder={setOrder}
        />
      ),
    },
    {
      title: t("name-cyrill"),
      dataIndex: "name",
      key: "name",
      render: (text: { cy: string }) => text?.cy,
      filterDropdown: () => (
        <TableOrderFilterUI
          langCode="cy"
          setLangCode={setLangCode}
          order={order}
          setOrder={setOrder}
        />
      ),
    },
    {
      title: t("name-uz"),
      dataIndex: "name",
      key: "name",
      render: (text: { uz: string }) => text?.uz,
      filterDropdown: () => (
        <TableOrderFilterUI
          langCode="uz"
          setLangCode={setLangCode}
          order={order}
          setOrder={setOrder}
        />
      ),
    },
    ...columnsForSubcategories,
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
        } else if (record.status === STATUS.INACTIVE) {
          return (
            <Tooltip title={t("restore")}>
              <MdRestore
                color="grey"
                cursor={"pointer"}
                size={20}
                onClick={() => restoreSubCategory(record.id)}
              />
            </Tooltip>
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
        langCode,
        order,
        status: subCategoryStatus || STATUS.ACTIVE,
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
    subCategoryStatus,
    order,
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
          status={+subCategoryStatus}
          handleSearch={handleSearch}
          handleReset={setIsFilterReset}
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
            formId={"manage-sub-category"}
          />
        </Form>
      }
    />
  );
};
