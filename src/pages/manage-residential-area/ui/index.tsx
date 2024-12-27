import { Flex, Form } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPencilAlt } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

import { Address3Inputs } from "@features/address-3-inputs";
import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";

import { NameInputsCyrill } from "@entities/name-inputs-cyrill";
import { NameInputsRu } from "@entities/name-inputs-ru";
import { NameInputsUz } from "@entities/name-inputs-uz";
import {
  useCreateResidentialAreaMutation,
  useDeleteResidentialAreaMutation,
  useGetResidentialAreasQuery,
  useUpdateResidentialAreaMutation,
} from "@entities/residential-area";

import {
  columnsForAddress,
  getZodRequiredKeys,
  notificationResponse,
  returnAllParams,
} from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { ManageWrapperBox, ModalAddEdit } from "@shared/ui";

import { ResidentialAreaCreateFormDtoSchema } from "./model/dto";

export interface valueProps {
  index: string;
  region: string;
  city: string;
  district: string;
  name_uz: string;
  name_ru: string;
  name_uzcyrill: string;
  old_name_uz: string;
  old_name_ru: string;
  old_name_uzcyrill: string;
  new_name_uz: string;
  new_name_ru: string;
  new_name_uzcyrill: string;
  id?: number;
  status?: number;
  regionId?: string;
  cityId?: string;
  districtId?: string;
  name: { uz: string; ru: string; cy: string };
  oldName: { uz: string; ru: string; cy: string };
  newName: { uz: string; ru: string; cy: string };
}
export const ManageResidentialAreaPage: FC = () => {
  const { t } = useTranslation();
  const [_, setSearchParams] = useSearchParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [form] = Form.useForm<valueProps>();
  const formRule = createSchemaFieldRule(ResidentialAreaCreateFormDtoSchema);
  const formRequiredField = getZodRequiredKeys(
    ResidentialAreaCreateFormDtoSchema,
  );
  const { data, isLoading } = useGetResidentialAreasQuery({
    ...returnAllParams(),
  });
  const [deleteResidentialArea] = useDeleteResidentialAreaMutation();
  const [updateResidentialArea] = useUpdateResidentialAreaMutation();
  const [createResidentialArea] = useCreateResidentialAreaMutation();
  const [editingData, setEditingData] = useState<valueProps | null>(null);

  const handleEditOpen = (values: valueProps) => {
    const editingBody = {
      id: values.id,
      index: values.index,
      region: values.regionId,
      district: values.districtId,
      city: values.cityId,
      name_uz: values.name.uz,
      name_ru: values.name.ru,
      name_uzcyrill: values.name.cy,
      old_name_uz: values.oldName.uz,
      old_name_ru: values.oldName.ru,
      old_name_uzcyrill: values.oldName.cy,
      new_name_uz: values.newName.uz,
      new_name_ru: values.newName.ru,
      new_name_uzcyrill: values.newName.cy,
    };
    setEditingData({ ...values, id: values.id });
    form.setFieldsValue(editingBody);
    onOpen();
  };
  const handleSearch = ({ search }: { search: string }) => {
    const previousParams = returnAllParams();
    setSearchParams({ ...previousParams, search });
  };

  const handleSubmit = async (values: valueProps) => {
    const body = {
      id: editingData?.id,
      regionId: values.region,
      cityId: values.city,
      districtId: values.district,
      index: +values.index,
      name: {
        uz: values.name_uz,
        ru: values.name_ru,
        cy: values.name_uzcyrill,
      },
      oldName: {
        uz: values.old_name_uz,
        ru: values.old_name_ru,
        cy: values.old_name_uzcyrill,
      },
      newName: {
        uz: values.new_name_uz,
        ru: values.new_name_ru,
        cy: values.new_name_uzcyrill,
      },
    };
    const request = editingData ? updateResidentialArea : createResidentialArea;

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
    ...columnsForAddress,
    {
      flex: 0.5,
      title: t("action"),
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
              <DeleteTableItemUI
                fetch={() => deleteResidentialArea(record.id)}
              />
            </Flex>
          );
        }
      },
    },
  ];

  return (
    <div>
      <ManageWrapperBox
        totalItems={data?.total || 0}
        loading={isLoading}
        title={t("residential-area")}
        columns={columns}
        data={data?.data || []}
        add={handleAdd}
        searchPart={<BasicSearchPartUI handleSearch={handleSearch} />}
        modalPart={
          <Form
            form={form}
            onFinish={handleSubmit}
            id="manage-residential-area"
            className="manage-residential-area"
          >
            <ModalAddEdit
              loading={isLoading}
              open={isOpen}
              onClose={onClose}
              headerInputs={
                <Address3Inputs
                  form={form}
                  rule={formRule}
                  requiredFields={formRequiredField}
                />
              }
              ruInputs={
                <NameInputsRu
                  rule={formRule}
                  requiredFields={formRequiredField}
                />
              }
              uzInputs={
                <NameInputsUz
                  rule={formRule}
                  requiredFields={formRequiredField}
                />
              }
              uzCyrillicInputs={
                <NameInputsCyrill
                  rule={formRule}
                  requiredFields={formRequiredField}
                />
              }
              formId={"manage-residential-area"}
            />
          </Form>
        }
      />
    </div>
  );
};
