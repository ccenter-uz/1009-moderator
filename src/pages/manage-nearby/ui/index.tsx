import { Flex, Form, Select } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { createSchemaFieldRule } from "antd-zod";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPencilAlt } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

import { Address2Inputs } from "@features/address-2-inputs";
import { DeleteTableItemUI } from "@features/delete-table-item";
import { NearbyPageSearchUI } from "@features/nearby-page-search";

import {
  useCreateNearbyMutation,
  useDeleteNearbyMutation,
  useGetNearbyCategoryQuery,
  useGetNearbyQuery,
  useUpdateNearbyMutation,
} from "@entities/nearby";
import { SingleNameCyrill } from "@entities/single-name-cyrill";
import { SingleNameRu } from "@entities/single-name-ru";
import { SingleNameUz } from "@entities/single-name-uz";

import {
  columnsWithRegions,
  GET_ALL_ACTIVE_STATUS,
  getZodRequiredKeys,
  notificationResponse,
  returnAllParams,
} from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { ManageWrapperBox, ModalAddEdit } from "@shared/ui";

import { NearbyCreateFormDtoSchema } from "../model/dto";

interface valueProps {
  region: string;
  city: string;
  name_uz: string;
  name_ru: string;
  name_uzcyrill: string;
  id?: number;
  status?: number;
  regionId?: string;
  cityId?: string;
  name: { uz: string; ru: string; cy: string };
  nearbyCategoryId?: string;
}

export const ManageNearbyPage: FC = () => {
  const { t } = useTranslation();
  const [_, setSearchParams] = useSearchParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [form] = Form.useForm();
  const formRule = createSchemaFieldRule(NearbyCreateFormDtoSchema);
  const formRequiredField = getZodRequiredKeys(NearbyCreateFormDtoSchema);
  const { data, isLoading } = useGetNearbyQuery({
    ...returnAllParams(),
  });
  const { data: dataCategory, isLoading: isLoadingCategory } =
    useGetNearbyCategoryQuery({
      all: GET_ALL_ACTIVE_STATUS.all,
      status: GET_ALL_ACTIVE_STATUS.active,
    });
  const [deleteNearby] = useDeleteNearbyMutation();
  const [createNearby] = useCreateNearbyMutation();
  const [updateNearby] = useUpdateNearbyMutation();
  const [editingData, setEditingData] = useState<valueProps | null>(null);
  const [nearbyCategoryId, setNearbyCategoryId] = useState<
    string | number | boolean
  >(true);
  const [modalNearbyCategoryId, setModalNearbyCategoryId] = useState<
    string | number | boolean
  >(true);

  const handleEditOpen = (values: valueProps) => {
    const editingBody = {
      id: values.id,
      region: values.regionId,
      city: values.cityId,
      name_uz: values.name.uz,
      name_ru: values.name.ru,
      name_uzcyrill: values.name.cy,
      "nearby-category": values.nearbyCategoryId,
    };
    setEditingData({ ...values, id: values.id });
    form.setFieldsValue(editingBody);
    onOpen();
  };

  const handleSearch = ({ search }: { search: string }) => {
    const previousParams = returnAllParams();
    if (search || search == "") {
      setSearchParams({ ...previousParams, search });
    }
  };

  const handleCategorySelect = (value: string | number) => {
    setNearbyCategoryId(value);
    const params = returnAllParams();
    setSearchParams({ ...params, nearbyCategoryId: String(value) });
  };
  const handleSubmit = async (values: valueProps) => {
    const body = {
      id: editingData?.id,
      nearbyCategoryId: modalNearbyCategoryId,
      regionId: values.region,
      cityId: values.city,
      name: {
        uz: values.name_uz,
        ru: values.name_ru,
        cy: values.name_uzcyrill,
      },
    };

    const request = editingData ? updateNearby : createNearby;

    const response = await request(body);

    notificationResponse(response, t, onClose);
    form.resetFields();
    onClose();
  };

  const handleAdd = () => {
    setEditingData(null);
    form.resetFields();
    onOpen();
  };

  const columns = [
    ...columnsWithRegions,
    {
      flex: 0.5,
      title: "Действия",
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (text: string, record: valueProps) => {
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
              <DeleteTableItemUI fetch={() => deleteNearby(record.id)} />
            </Flex>
          );
        }
      },
    },
  ];

  const handleModalCategorySelect = (value: string | number) => {
    setModalNearbyCategoryId(value);
  };

  return (
    <div>
      <ManageWrapperBox
        loading={isLoading}
        totalItems={data?.total || 0}
        title={t("nearby")}
        columns={columns}
        data={data?.data || []}
        add={nearbyCategoryId ? handleAdd : undefined}
        searchPart={
          <NearbyPageSearchUI
            handleSearch={handleSearch}
            additionalSearch={
              <Form.Item
                name={"nearby-category"}
                label={t("nearby-category")}
                style={{ marginBottom: 0, flex: 1 }}
              >
                {/* AnyObject cause cannot find proper type */}
                <Select
                  allowClear
                  onSelect={handleCategorySelect}
                  loading={isLoadingCategory}
                  options={dataCategory?.data.map((item: AnyObject) => ({
                    label: item.name,
                    value: item.id,
                  }))}
                />
              </Form.Item>
            }
          />
        }
        modalPart={
          <Form
            form={form}
            onFinish={handleSubmit}
            id="modal-add-edit"
            className="manage-nearby"
          >
            <ModalAddEdit
              loading={isLoading}
              open={isOpen}
              onClose={onClose}
              headerInputs={
                <>
                  <Form.Item
                    name={"nearby-category"}
                    label={t("nearby-category")}
                    rules={[formRule]}
                    required={formRequiredField.includes("nearby-category")}
                    layout="vertical"
                  >
                    <Select
                      allowClear
                      onSelect={handleModalCategorySelect}
                      placeholder={t("nearby-category")}
                      loading={isLoadingCategory}
                      options={dataCategory?.data.map((item: AnyObject) => ({
                        label: item.name,
                        value: item.id,
                      }))}
                    />
                  </Form.Item>
                  <Address2Inputs
                    form={form}
                    rule={formRule}
                    requiredFields={formRequiredField}
                  />
                </>
              }
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
              formId={"modal-add-edit"}
            />
          </Form>
        }
      />
    </div>
  );
};
