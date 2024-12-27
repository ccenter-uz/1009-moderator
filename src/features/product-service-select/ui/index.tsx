import { Col, Select, Form, FormInstance } from "antd";
import i18next, { t } from "i18next";
import { FC, useEffect, useState } from "react";

import {
  useLazyGetProductsQuery,
  useLazyGetSubCategoryQuery,
} from "@entities/product-services";

import { GET_ALL_ACTIVE_STATUS } from "@shared/lib/helpers";
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

export const ProductServiceSelect: FC<Props> = (props) => {
  const { form } = props;
  const { isOpen, onOpen: openProductModal, onClose } = useDisclosure();
  const {
    isOpen: serviceIsOpen,
    onOpen: openServiceModal,
    onClose: serviceOnClose,
  } = useDisclosure();
  // SELECTED_DATAS
  const [selectedDataProduct, setSelectedDataProduct] =
    useState<SelectedDataTypes | null>(null);
  const [selectedDataService, setSelectedDataService] =
    useState<SelectedDataTypes | null>(null);
  // FETCHERS
  const [triggerProduct, { data: productData, isLoading: isLoadingProduct }] =
    useLazyGetProductsQuery();
  const [triggerService, { data: serviceData, isLoading: isLoadingService }] =
    useLazyGetSubCategoryQuery();
  // SEARCH_VALUES
  const [productSearchValue, setProductSearchValue] = useState<string>("");
  const [serviceSearchValue, setServiceSearchValue] = useState<string>("");
  // PAGINATIONS
  const [productPagination, setProductPagination] = useState({
    page: 1,
    limit: 10,
  });
  const [servicePagination, setServicePagination] = useState({
    page: 1,
    limit: 10,
  });

  const handleClickCategorySelect = () => {
    setSelectedDataProduct(null);
    setSelectedDataService(null);
  };

  const handleClickProductRow = () => {
    setSelectedDataService(null);
    openServiceModal();
  };

  useEffect(() => {
    triggerProduct({
      status: GET_ALL_ACTIVE_STATUS.active,
      page: productPagination.page,
      limit: productPagination.limit,
      search: productSearchValue,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [productSearchValue, productPagination]);

  useEffect(() => {
    if (selectedDataProduct) {
      triggerService({
        status: GET_ALL_ACTIVE_STATUS.active,
        page: servicePagination.page,
        limit: servicePagination.limit,
        categoryId: selectedDataProduct.id,
        search: serviceSearchValue,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [serviceSearchValue, servicePagination, selectedDataProduct]);

  useEffect(() => {
    form.setFieldsValue({
      categoryTuId: selectedDataProduct?.id,
      subCategoryTuId: selectedDataService?.id,
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedDataProduct, selectedDataService]);

  return (
    <>
      <Col span={24}>
        <Form.Item
          name={"categoryTuId"}
          label={t(`category-tu`)}
          style={{ marginBottom: 10 }}
        >
          <Select
            allowClear
            onClear={handleClickCategorySelect}
            dropdownStyle={{ display: "none" }}
            onClick={openProductModal}
            value={selectedDataProduct?.id}
            labelRender={() => selectedDataProduct?.name}
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name={`subCategoryTuId`}
          label={t(`sub-category-tu`)}
          style={{ marginBottom: 10 }}
        >
          <Select
            allowClear
            onClear={() => setSelectedDataService(null)}
            disabled={!selectedDataProduct}
            dropdownStyle={{ display: "none" }}
            onClick={() => selectedDataProduct && openServiceModal()}
            value={selectedDataService?.id}
            labelRender={() => selectedDataService?.name}
          />
        </Form.Item>
      </Col>
      {/* RAZDEL-TU */}
      <SearchModal
        pagination={productPagination}
        totalItems={productData?.total || 0}
        loading={isLoadingProduct}
        setSearchValue={setProductSearchValue}
        data={productData?.data || []}
        columns={columns}
        isOpen={isOpen}
        onClose={onClose}
        title={t("category-tu")}
        handleClickRow={handleClickProductRow}
        setSelectedData={setSelectedDataProduct}
        setPagination={setProductPagination}
      />
      {/* PODRAZDEL-TU */}
      <SearchModal
        pagination={servicePagination}
        totalItems={serviceData?.total || 0}
        loading={isLoadingService}
        setSearchValue={setServiceSearchValue}
        data={serviceData?.data || []}
        columns={columns}
        isOpen={serviceIsOpen}
        onClose={serviceOnClose}
        title={t("sub-category-tu")}
        setSelectedData={setSelectedDataService}
        setPagination={setServicePagination}
      />
    </>
  );
};
