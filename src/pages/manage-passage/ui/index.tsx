import { Flex, Form } from "antd";
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
  useCreatePassageMutation,
  useDeletePassageMutation,
  useGetPassagesQuery,
  useUpdatePassageMutation,
} from "@entities/passage";

import {
  columnsForAddress,
  notificationResponse,
  returnAllParams,
} from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { ManageWrapperBox, ModalAddEdit } from "@shared/ui";

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
  old_name: { uz: string; ru: string; cy: string };
  new_name: { uz: string; ru: string; cy: string };
}

export const ManagePassagePage: FC = () => {
  const { t } = useTranslation();
  const [_, setSearchParams] = useSearchParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [form] = Form.useForm<valueProps>();
  const { data, isLoading } = useGetPassagesQuery({ ...returnAllParams() });
  const [deletePassage] = useDeletePassageMutation();
  const [updatePassage] = useUpdatePassageMutation();
  const [createPassage] = useCreatePassageMutation();
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
      old_name_uz: values.name.uz,
      old_name_ru: values.name.ru,
      old_name_uzcyrill: values.name.cy,
      new_name_uz: values.name.uz,
      new_name_ru: values.name.ru,
      new_name_uzcyrill: values.name.cy,
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
    const request = editingData ? updatePassage : createPassage;

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
              <DeleteTableItemUI fetch={() => deletePassage(record.id)} />
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
        title={t("passage")}
        columns={columns}
        data={data?.data || []}
        add={handleAdd}
        searchPart={<BasicSearchPartUI handleSearch={handleSearch} />}
        modalPart={
          <Form
            form={form}
            onFinish={handleSubmit}
            id="modal-add-edit"
            className="manage-passage"
          >
            <ModalAddEdit
              loading={isLoading}
              open={isOpen}
              onClose={onClose}
              headerInputs={<Address3Inputs form={form} />}
              ruInputs={<NameInputsRu />}
              uzInputs={<NameInputsUz />}
              uzCyrillicInputs={<NameInputsCyrill />}
              formId={"modal-add-edit"}
            />
          </Form>
        }
      />
    </div>
  );
};
