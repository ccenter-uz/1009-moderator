import { Flex, Form, Select } from "antd";
import { AnyObject } from "antd/es/_util/type";
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
  notificationResponse,
  returnAllParams,
} from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { ManageWrapperBox, ModalAddEdit } from "@shared/ui";

interface valueProps {
  region: string;
  city: string;
  name_uz: string;
  name_ru: string;
  name_cyrill: string;
  id?: number;
  status?: number;
  regionId?: string;
  cityId?: string;
  name: { uz: string; ru: string; cy: string };
}

export const ManageNearbyPage: FC = () => {
  const { t } = useTranslation();
  const [_, setSearchParams] = useSearchParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [form] = Form.useForm();
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
  >(false);

  const handleEditOpen = (values: valueProps) => {
    const editingBody = {
      id: values.id,
      region: values.regionId,
      city: values.cityId,
      name_uz: values.name.uz,
      name_ru: values.name.ru,
      name_cyrill: values.name.cy,
    };
    setEditingData({ ...values, id: values.id });
    form.setFieldsValue(editingBody);
    onOpen();
  };

  const handleSearch = ({ search }: { search: string }) => {
    const previousParams = returnAllParams();
    setSearchParams({ ...previousParams, search });
  };

  const handleCategorySelect = (value: string | number) => {
    setNearbyCategoryId(value);
    const params = returnAllParams();
    setSearchParams({ ...params, categoryId: String(value) });
  };
  const handleSubmit = async (values: valueProps) => {
    const body = {
      id: editingData?.id,
      nearbyCategoryId,
      regionId: values.region,
      cityId: values.city,
      name: {
        uz: values.name_uz,
        ru: values.name_ru,
        cy: values.name_cyrill,
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
              headerInputs={<Address2Inputs form={form} />}
              ruInputs={<SingleNameRu />}
              uzInputs={<SingleNameUz />}
              uzCyrillicInputs={<SingleNameCyrill />}
              formId={"modal-add-edit"}
            />
          </Form>
        }
      />
    </div>
  );
};
