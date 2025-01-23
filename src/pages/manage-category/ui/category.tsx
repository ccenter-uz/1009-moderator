import { Flex, Form, Tooltip } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { createSchemaFieldRule } from "antd-zod";
import { t } from "i18next";
import { FC, useEffect, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

import { Address2Inputs } from "@features/address-2-inputs";
import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";
import { SearchWithRegionCityUI } from "@features/search-with-region-city";

import {
  useGetCategoriesQuery,
  useDeleteCategoryMutation,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useRestoreCategoryMutation,
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
import { CategorySubCategoryEnums, editCategoryType } from "../model/types";

export const Category: FC = () => {
  const {
    [CategorySubCategoryEnums.categoryPage]: page,
    [CategorySubCategoryEnums.categoryLimit]: limit,
    [CategorySubCategoryEnums.categorySearch]: search,
    [CategorySubCategoryEnums.regionId]: regionId,
    [CategorySubCategoryEnums.cityId]: cityId,
    [CategorySubCategoryEnums.categoryStatus]: categoryStatus,
  } = returnAllParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [form] = Form.useForm();
  const [searchForm] = Form.useForm();
  const formRule = createSchemaFieldRule(CategoryCreateFormDtoSchema);
  const formRequiredField = getZodRequiredKeys(CategoryCreateFormDtoSchema);
  const { data, isLoading } = useGetCategoriesQuery({
    page,
    limit,
    regionId,
    cityId,
    search,
    status: categoryStatus || STATUS.ACTIVE,
  });
  const [deleteCategory] = useDeleteCategoryMutation();
  const [createCategory] = useCreateCategoryMutation();
  const [updateCategory] = useUpdateCategoryMutation();
  const [restoreCategory] = useRestoreCategoryMutation();
  const [editingData, setEditingData] = useState<editCategoryType | null>(null);
  const [isSearchBtnDisable, setIsSearchBtnDisable] = useState<boolean>(true);
  const [isFilterReset, setIsFilterReset] = useState<
    string | number | undefined
  >();

  const params = returnAllParams();

  const handleEditOpen = (values: editCategoryType) => {
    setEditingData({ ...values, id: values.id });
    form.setFieldsValue({
      name_uz: values.name.uz,
      name_ru: values.name.ru,
      name_uzcyrill: values.name.cy,
      region: values.region?.id,
      city: values.city?.id,
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
    //  If region id is 0, it resets the search params, otherwise it updates the search params with region id, city id and search query.
    const previousParams = returnAllParams();
    const regionId = searchForm.getFieldValue("region_id");
    const cityId = searchForm.getFieldValue("city_id");

    if (regionId === 0) {
      const previousParamsCopy = JSON.parse(JSON.stringify(previousParams));
      delete previousParamsCopy[CategorySubCategoryEnums.regionId];
      delete previousParamsCopy[CategorySubCategoryEnums.cityId];
      // delete previousParamsCopy[CategorySubCategoryEnums.categorySearch];

      setSearchParams({
        ...previousParamsCopy,
        [CategorySubCategoryEnums.categoryStatus]: status.toString()
          ? status.toString()
          : STATUS.ACTIVE.toString(),
        [CategorySubCategoryEnums.categorySearch]: search || "",
      });
    } else {
      setSearchParams({
        ...previousParams,
        [CategorySubCategoryEnums.categoryStatus]: status.toString()
          ? status.toString()
          : STATUS.ACTIVE.toString(),
        [CategorySubCategoryEnums.categorySearch]: search || "",
        [CategorySubCategoryEnums.regionId]: regionId,
        [CategorySubCategoryEnums.cityId]: cityId,
      });
    }
  };

  const handleSubmit = async (
    values: ItableBasicData & { region: number; city: number },
  ) => {
    const body = {
      regionId: values.region,
      cityId: values.city,
      name: {
        ru: values.name_ru,
        uz: values.name_uz,
        cy: values.name_uzcyrill,
      },
      id: editingData?.id,
    };
    const request = editingData ? updateCategory : createCategory;

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
      [CategorySubCategoryEnums.categoryId]: record.id as string,
    });
  };

  useEffect(() => {
    if (isFilterReset) {
      setSearchParams({
        ...params,
        [CategorySubCategoryEnums.categoryStatus]: STATUS.ACTIVE.toString(),
        [CategorySubCategoryEnums.categorySearch]: "",
        [CategorySubCategoryEnums.categoryId]: "",
        [CategorySubCategoryEnums.subCategorySearch]: "",
        [CategorySubCategoryEnums.subCategoryStatus]: STATUS.ACTIVE.toString(),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterReset]);

  const columns = [
    ...columnsForCategories,
    {
      flex: 0.5,
      title: t("action"),
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (text: string, record: editCategoryType) => {
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
              <DeleteTableItemUI fetch={() => deleteCategory(record.id)} />
            </Flex>
          );
        } else if (record.status === STATUS.INACTIVE) {
          return (
            <Tooltip title={t("restore")}>
              <MdRestore
                color="grey"
                cursor={"pointer"}
                size={20}
                onClick={() => restoreCategory(record.id)}
              />
            </Tooltip>
          );
        }
      },
    },
  ];

  useEffect(() => {
    if (regionId || cityId) {
      searchForm.setFieldsValue({
        region_id: Number(regionId),
        city_id: Number(cityId),
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [regionId, cityId]);

  return (
    <ManageWrapperBox
      totalItems={data?.total || 0}
      title={t("category")}
      rowSelect
      onRowSelect={onRowSelect}
      columns={columns}
      data={data?.data || []}
      pageName={CategorySubCategoryEnums.categoryPage}
      limitName={CategorySubCategoryEnums.categoryLimit}
      add={onAdd}
      searchPart={
        <BasicSearchPartUI
          id="category-search"
          handleSearch={handleSearch}
          handleReset={setIsFilterReset}
          status={+categoryStatus}
          additionalSearch={
            <SearchWithRegionCityUI
              form={searchForm}
              setIsSearchBtnDisable={setIsSearchBtnDisable}
            />
          }
          additionalParams={{
            search: searchParams.get(CategorySubCategoryEnums.categorySearch),
          }}
          isSearchBtnDisable={isSearchBtnDisable}
        />
      }
      modalPart={
        <Form
          form={form}
          onFinish={handleSubmit}
          id="manage-category"
          className="manage-category"
        >
          <ModalAddEdit
            loading={isLoading}
            open={isOpen}
            onClose={onClose}
            headerInputs={
              <Address2Inputs
                form={form}
                rule={formRule}
                requiredFields={formRequiredField}
              />
            }
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
            formId={"manage-category"}
          />
        </Form>
      }
    />
  );
};
