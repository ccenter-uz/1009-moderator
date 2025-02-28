import { Col, Select, Form, FormInstance } from "antd";
import i18next, { t } from "i18next";
import { FC, useEffect, useState } from "react";

import {
  useLazyGetCategoriesQuery,
  useLazyGetSubCategoriesQuery,
} from "@entities/category-subcategory";

import {
  GET_ALL_ACTIVE_STATUS,
  getLocalStorage,
  SEARCHPART_KEYS,
} from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { SearchModal } from "@shared/ui/search-modal";

type Props = {
  form: FormInstance;
};

type SelectedDataTypes = {
  id: number;
  name: string;
};

const columns = [
  {
    title: t("name"),
    dataIndex: "name",
    key: "name",
    render: (text: { [key: string]: string }) => text[i18next.language],
  },
];

export const CategorySubcategorySelect: FC<Props> = (props) => {
  const { form } = props;
  const regionId = form.getFieldValue(SEARCHPART_KEYS.REGION_KEY);
  const cityId = form.getFieldValue(SEARCHPART_KEYS.CITY_KEY);
  const {
    isOpen: categoryIsOpen,
    onOpen: openCategoryModal,
    onClose,
  } = useDisclosure();
  const {
    isOpen: subCategoryIsOpen,
    onOpen: openSubCategoryModal,
    onClose: subCategoryOnClose,
  } = useDisclosure();
  // SELECTED_DATAS
  const [selectedDataCategory, setSelectedDataCategory] =
    useState<SelectedDataTypes | null>(
      getLocalStorage(SEARCHPART_KEYS.SEARCHVALUE_KEY)?.categoryId || null,
    );
  const [selectedDataSubCategory, setSelectedDataSubCategory] =
    useState<SelectedDataTypes | null>(
      getLocalStorage(SEARCHPART_KEYS.SEARCHVALUE_KEY)?.subCategoryId || null,
    );
  // FETCHERS
  const [
    triggerCategory,
    { data: categoryData, isLoading: isLoadingCategory },
  ] = useLazyGetCategoriesQuery();
  const [
    triggerSubCategory,
    { data: subCategoryData, isLoading: isLoadingSubCategory },
  ] = useLazyGetSubCategoriesQuery();
  // SEARCH_VALUES
  const [categorySearchValue, setCategorySearchValue] = useState<string>("");
  const [subCategorySearchValue, setSubCategorySearchValue] =
    useState<string>("");
  // PAGINATIONS
  const [categoryPagination, setCategoryPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [subCategoryPagination, setSubCategoryPagination] = useState({
    page: 1,
    limit: 10,
  });

  const handleClickCategorySelect = () => {
    setSelectedDataCategory(null);
    setSelectedDataSubCategory(null);
  };

  const handleClickCategoryRow = () => {
    setSelectedDataSubCategory(null);
    openSubCategoryModal();
  };

  useEffect(() => {
    if (
      (categoryIsOpen && regionId) ||
      (categoryIsOpen && cityId && regionId)
    ) {
      triggerCategory({
        regionId,
        cityId: cityId ? cityId : "",
        status: GET_ALL_ACTIVE_STATUS.active,
        page: categoryPagination.page,
        limit: categoryPagination.limit,
        search: categorySearchValue,
      });
    }
    if (!cityId && !regionId && categoryIsOpen) {
      triggerCategory({
        status: GET_ALL_ACTIVE_STATUS.active,
        page: categoryPagination.page,
        limit: categoryPagination.limit,
        search: categorySearchValue,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    categoryIsOpen,
    categorySearchValue,
    categoryPagination,
    regionId,
    cityId,
  ]);

  useEffect(() => {
    if (subCategoryIsOpen && selectedDataCategory) {
      triggerSubCategory({
        status: GET_ALL_ACTIVE_STATUS.active,
        page: subCategoryPagination.page,
        limit: subCategoryPagination.limit,
        categoryId: selectedDataCategory.id,
        search: subCategorySearchValue,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    subCategoryIsOpen,
    subCategorySearchValue,
    subCategoryPagination,
    selectedDataCategory,
  ]);

  useEffect(() => {
    form.setFieldsValue({
      categoryId: {
        id: selectedDataCategory?.id,
        name: selectedDataCategory?.name,
      },
      subCategoryId: {
        id: selectedDataSubCategory?.id,
        name: selectedDataSubCategory?.name,
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDataCategory, selectedDataSubCategory]);

  return (
    <>
      <Col span={24}>
        <Form.Item
          name={SEARCHPART_KEYS.CATEGORY_KEY}
          label={t(`category`)}
          style={{ marginBottom: 10 }}
        >
          <Select
            allowClear
            onClear={handleClickCategorySelect}
            dropdownStyle={{ display: "none" }}
            onClick={openCategoryModal}
            value={selectedDataCategory?.id}
            labelRender={() => selectedDataCategory?.name}
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name={SEARCHPART_KEYS.SUBCATEGORY_KEY}
          label={t(`sub-category`)}
          style={{ marginBottom: 10 }}
        >
          <Select
            allowClear
            onClear={() => setSelectedDataSubCategory(null)}
            disabled={!selectedDataCategory || !regionId}
            dropdownStyle={{ display: "none" }}
            onClick={() => selectedDataCategory && openSubCategoryModal()}
            value={selectedDataSubCategory?.id}
            labelRender={() => selectedDataSubCategory?.name}
          />
        </Form.Item>
      </Col>
      {/* RAZDEL-TU */}
      <SearchModal
        pagination={categoryPagination}
        totalItems={categoryData?.total || 0}
        loading={isLoadingCategory}
        setSearchValue={setCategorySearchValue}
        data={categoryData?.data || []}
        columns={columns}
        isOpen={categoryIsOpen}
        onClose={onClose}
        title={t("category")}
        handleClickRow={handleClickCategoryRow}
        setSelectedData={setSelectedDataCategory}
        setPagination={setCategoryPagination}
      />
      {/* PODRAZDEL-TU */}
      <SearchModal
        pagination={subCategoryPagination}
        totalItems={subCategoryData?.total || 0}
        loading={isLoadingSubCategory}
        setSearchValue={setSubCategorySearchValue}
        data={subCategoryData?.data || []}
        columns={columns}
        isOpen={subCategoryIsOpen}
        onClose={subCategoryOnClose}
        title={t("sub-category")}
        setSelectedData={setSelectedDataSubCategory}
        setPagination={setSubCategoryPagination}
      />
    </>
  );
};
