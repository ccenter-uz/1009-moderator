import { Flex, Form, Tooltip } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPencilAlt } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

import { Address2Inputs } from "@features/address-2-inputs";
import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";

import {
  useCreateDistrictMutation,
  useDeleteDistrictMutation,
  useGetDistrictsQuery,
  useRestoreDistrictMutation,
  useUpdateDistrictMutation,
} from "@entities/district";
import { NameInputsCyrill } from "@entities/name-inputs-cyrill";
import { NameInputsRu } from "@entities/name-inputs-ru";
import { NameInputsUz } from "@entities/name-inputs-uz";

import {
  columnsWithAddressAndNamings,
  getZodRequiredKeys,
  notificationResponse,
  returnAllParams,
  STATUS,
} from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { ManageWrapperBox, ModalAddEdit } from "@shared/ui";

import { DistrictCreateFormDtoSchema } from "../model/dto";

interface valueProps {
  index: string;
  region: string;
  city: string;
  name_uz: string;
  name_ru: string;
  name_uzcyrill: string;
  old_name_uz: string;
  old_name_ru: string;
  old_name_cyrill: string;
  new_name_uz: string;
  new_name_ru: string;
  new_name_cyrill: string;
  id?: number;
  status?: number;
  regionId?: string;
  cityId?: string;
  name: { uz: string; ru: string; cy: string };
  oldName: { uz: string; ru: string; cy: string };
  newName: { uz: string; ru: string; cy: string };
}

export const ManageDistrictPage: FC = () => {
  const { t } = useTranslation();
  const [_, setSearchParams] = useSearchParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [form] = Form.useForm<valueProps>();
  const formRule = createSchemaFieldRule(DistrictCreateFormDtoSchema);
  const formRequiredField = getZodRequiredKeys(DistrictCreateFormDtoSchema);

  const params = returnAllParams();
  const { data, isLoading } = useGetDistrictsQuery({
    status: status || STATUS.ACTIVE,
    ...params,
  });
  const [deleteDistrict] = useDeleteDistrictMutation();
  const [createDistrict] = useCreateDistrictMutation();
  const [updateDistrict] = useUpdateDistrictMutation();
  const [restoreDistrict] = useRestoreDistrictMutation();

  const [editingData, setEditingData] = useState<valueProps | null>(null);
  const [isFilterReset, setIsFilterReset] = useState<
    string | number | undefined
  >();
  const handleEditOpen = (values: valueProps) => {
    const editingBody = {
      id: values.id,
      index: values.index,
      region: values.regionId,
      city: values.cityId,
      name_uz: values.name.uz,
      name_ru: values.name.ru,
      name_uzcyrill: values.name.cy,
      old_name_uz: values.oldName.uz,
      old_name_ru: values.oldName.ru,
      old_name_cyrill: values.oldName.cy,
      new_name_uz: values.newName.uz,
      new_name_ru: values.newName.ru,
      new_name_cyrill: values.newName.cy,
    };
    setEditingData({ ...values, id: values.id });
    form.setFieldsValue(editingBody);
    onOpen();
  };

  const handleSearch = ({
    search,
    status = STATUS.ACTIVE,
  }: {
    search: string;
    status: number;
  }) => {
    let inputValue = search;
    if (inputValue === undefined) {
      inputValue = "";
    }

    if (inputValue || inputValue === "" || typeof status === "number") {
      setSearchParams({
        ...params,
        search: inputValue.trim(),
        status: status.toString()
          ? status.toString()
          : STATUS.ACTIVE.toString(),
      });
    }
  };

  const handleSubmit = async (values: valueProps) => {
    const body = {
      id: editingData?.id,
      regionId: values.region,
      cityId: values.city,
      index: values.index,
      name: {
        uz: values.name_uz,
        ru: values.name_ru,
        cy: values.name_uzcyrill,
      },
      oldName: {
        uz: values.old_name_uz,
        ru: values.old_name_ru,
        cy: values.old_name_cyrill,
      },
      newName: {
        uz: values.new_name_uz,
        ru: values.new_name_ru,
        cy: values.new_name_cyrill,
      },
    };

    const request = editingData ? updateDistrict : createDistrict;

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

  useEffect(() => {
    if (isFilterReset) {
      setSearchParams({
        ...params,
        status: STATUS.ACTIVE.toString(),
        search: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isFilterReset]);

  const columns = [
    ...columnsWithAddressAndNamings,
    {
      flex: 0.5,
      title: t("action"),
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (text: string, record: valueProps) => {
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
              <DeleteTableItemUI fetch={() => deleteDistrict(record.id)} />
            </Flex>
          );
        } else if (record.status === STATUS.INACTIVE) {
          return (
            <Tooltip title={t("restore")}>
              <MdRestore
                color="grey"
                cursor={"pointer"}
                size={20}
                onClick={() => restoreDistrict(record.id)}
              />
            </Tooltip>
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
        title={t("district")}
        columns={columns}
        data={data?.data || []}
        add={handleAdd}
        searchPart={
          <BasicSearchPartUI
            handleSearch={handleSearch}
            handleReset={setIsFilterReset}
            status={Number(params.status)}
          />
        }
        modalPart={
          <Form
            form={form}
            onFinish={handleSubmit}
            id="modal-add-edit"
            className="manage-district"
          >
            <ModalAddEdit
              loading={isLoading}
              open={isOpen}
              onClose={onClose}
              headerInputs={
                <Address2Inputs
                  withIndex
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
              formId={"modal-add-edit"}
            />
          </Form>
        }
      />
    </div>
  );
};
