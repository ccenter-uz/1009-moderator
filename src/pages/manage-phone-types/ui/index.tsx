import { Flex, Form, Tooltip } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { createSchemaFieldRule } from "antd-zod";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPencilAlt } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";

import {
  useCreatePhoneTypeMutation,
  useDeletePhoneTypeMutation,
  useGetPhoneTypeQuery,
  useRestorePhoneTypeMutation,
  useUpdatePhoneTypeMutation,
} from "@entities/phone";
import { SingleNameCyrill } from "@entities/single-name-cyrill";
import { SingleNameRu } from "@entities/single-name-ru";
import { SingleNameUz } from "@entities/single-name-uz";

import {
  columnsForPhoneTypeTable,
  getZodRequiredKeys,
  notificationResponse,
  returnAllParams,
  STATUS,
} from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { ItableBasicData } from "@shared/types";
import { ManageWrapperBox, ModalAddEdit } from "@shared/ui";

import { PhoneTypeCreateFormDtoSchema } from "../model/dto";

interface ImanagePhoneTypeValues {
  name: { ru: string; uz: string; cy: string };
  id: number;
  status?: number;
}

export const ManagePhoneTypesPage: FC = () => {
  const { t } = useTranslation();
  const [_, setSearchParams] = useSearchParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [form] = Form.useForm<ItableBasicData>();
  const formRule = createSchemaFieldRule(PhoneTypeCreateFormDtoSchema);
  const formRequiredField = getZodRequiredKeys(PhoneTypeCreateFormDtoSchema);
  const { data, isLoading } = useGetPhoneTypeQuery({
    ...returnAllParams(),
  });
  const [deletePhoneType] = useDeletePhoneTypeMutation();
  const [createPhoneType] = useCreatePhoneTypeMutation();
  const [updatePhoneType] = useUpdatePhoneTypeMutation();
  const [restorePhoneType] = useRestorePhoneTypeMutation();
  const [editingData, setEditingData] = useState<AnyObject | null>(null);
  const params = returnAllParams();
  const [status, setStatus] = useState<number>(
    params.status ? +params.status : STATUS.ACTIVE,
  );

  const handleEditOpen = (values: ImanagePhoneTypeValues) => {
    const editingBody = {
      name_ru: values.name.ru,
      name_uz: values.name.uz,
      name_uzcyrill: values.name.cy,
      id: editingData?.id,
    };
    setEditingData({ ...values, id: values.id });
    form.setFieldsValue(editingBody);
    onOpen();
  };

  const handleSearch = ({ search }: { search: string }) => {
    if (search || search == "") {
      setSearchParams({ ...params, search, status: status.toString() });
    }
  };

  const handleSubmit = async (values: ItableBasicData) => {
    const body = {
      name: {
        ru: values.name_ru,
        uz: values.name_uz,
        cy: values.name_uzcyrill,
      },
      id: editingData?.id,
    };

    const request = editingData ? updatePhoneType : createPhoneType;

    const response = await request(body);

    notificationResponse(response, t, onClose);
    form.resetFields();
    onClose();
  };

  const handleAdd = () => {
    onOpen();
    setEditingData(null);
  };

  const columns = [
    ...columnsForPhoneTypeTable,
    {
      flex: 0.5,
      title: "Действия",
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (text: string, record: ImanagePhoneTypeValues) => {
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
              <DeleteTableItemUI fetch={() => deletePhoneType(record.id)} />
            </Flex>
          );
        } else if (record.status === STATUS.INACTIVE) {
          return (
            <Tooltip title={t("restore")}>
              <MdRestore
                color="grey"
                cursor={"pointer"}
                size={20}
                onClick={() => restorePhoneType(record.id)}
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
        title={t("phone-types")}
        columns={columns}
        data={data?.data || []}
        add={handleAdd}
        searchPart={
          <BasicSearchPartUI
            handleSearch={handleSearch}
            status={status}
            setStatus={setStatus}
          />
        }
        modalPart={
          <Form
            form={form}
            onFinish={handleSubmit}
            id="modal-add-edit"
            className="manage-phone-types"
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
              formId={"modal-add-edit"}
            />
          </Form>
        }
      />
    </div>
  );
};
