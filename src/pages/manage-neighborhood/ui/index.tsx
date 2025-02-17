import { Flex, Form, Tooltip } from "antd";
import { createSchemaFieldRule } from "antd-zod";
import i18next from "i18next";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPencilAlt } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

import { Address3Inputs } from "@features/address-3-inputs";
import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";
import { TableOrderFilterUI } from "@features/table-order-filter";

import { NameInputsCyrill } from "@entities/name-inputs-cyrill";
import { NameInputsRu } from "@entities/name-inputs-ru";
import { NameInputsUz } from "@entities/name-inputs-uz";
import {
  useGetNeighborhoodsQuery,
  useDeleteNeighborhoodMutation,
  useUpdateNeighborhoodMutation,
  useCreateNeighborhoodMutation,
  useRestoreNeighborhoodMutation,
} from "@entities/neighborhood";

import {
  getZodRequiredKeys,
  returnAllParams,
  STATUS,
  notificationResponse,
  columnsForAddress,
} from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { ManageWrapperBox, ModalAddEdit } from "@shared/ui";

import { NeighborhoodCreateFormDtoSchema } from "../model/dto";
import { INeighborhoodValues } from "../model/types";

export const ManageNeighborhoodPage = () => {
  const { t } = useTranslation();
  const [_, setSearchParams] = useSearchParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [form] = Form.useForm<INeighborhoodValues>();
  const formRule = createSchemaFieldRule(NeighborhoodCreateFormDtoSchema);
  const formRequiredField = getZodRequiredKeys(NeighborhoodCreateFormDtoSchema);
  const [order, setOrder] = useState<"name" | "orderNumber">("orderNumber");
  const params = returnAllParams();
  const { data, isLoading } = useGetNeighborhoodsQuery({
    status: STATUS.ACTIVE,
    langCode: i18next.language,
    order,
    ...params,
  });
  const [deleteNeighborhood] = useDeleteNeighborhoodMutation();
  const [updateNeighborhood] = useUpdateNeighborhoodMutation();
  const [createNeighborhood] = useCreateNeighborhoodMutation();
  const [restoreNeighborhood] = useRestoreNeighborhoodMutation();

  const [editingData, setEditingData] = useState<INeighborhoodValues | null>(
    null,
  );

  const handleEditOpen = (values: INeighborhoodValues) => {
    const editingBody = {
      id: values.id,
      index: values.index,
      region: values.region_id,
      district: values.district_id,
      city: values.city_id,
      name_uz: values.name.uz,
      name_ru: values.name.ru,
      name_uzcyrill: values.name.cy,
      old_name_uz: values.oldName.uz,
      old_name_ru: values.oldName.ru,
      old_name_cyrill: values.oldName.cy,
      new_name_uz: values.newName.uz,
      new_name_ru: values.newName.ru,
      new_name_cyrill: values.newName.cy,
      orderNumber: values.order_number,
    };
    setEditingData({ ...values, id: values.id });
    form.setFieldsValue(editingBody);
    onOpen();
  };
  const handleSearch = ({
    search,
    status = STATUS.ACTIVE,
    oldName,
    newName,
  }: {
    search: string;
    status: number;
    oldName: string;
    newName: string;
  }) => {
    let inputValue = search;
    if (inputValue === undefined) {
      inputValue = "";
    }

    if (inputValue || inputValue === "" || typeof status === "number") {
      setSearchParams({
        ...params,
        oldName: oldName ? oldName : "",
        newName: newName ? newName : "",
        search: inputValue.trim(),
        status: status.toString()
          ? status.toString()
          : STATUS.ACTIVE.toString(),
      });
    }
  };
  const handleReset = () => {
    const prevParams = returnAllParams();
    delete prevParams.search;
    delete prevParams.oldName;
    delete prevParams.newName;
    setSearchParams(prevParams);
  };

  const handleSubmit = async (values: INeighborhoodValues) => {
    const body = {
      id: editingData?.id,
      regionId: values.region,
      cityId: values.city,
      districtId: values.district,
      index: values.index,
      orderNumber: values.orderNumber ? Number(values.orderNumber) : null,
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
    const request = editingData ? updateNeighborhood : createNeighborhood;

    const response = await request(body);

    notificationResponse(response, onClose);
    form.resetFields();
    onClose();
  };

  const handleAdd = () => {
    setEditingData(null);
    form.resetFields();
    onOpen();
  };

  const columns = [
    {
      title: t("name"),
      dataIndex: "name",
      key: "name",
      render: (text: { [key: string]: string }) => text[i18next.language],
      filterDropdown: () => (
        <TableOrderFilterUI order={order} setOrder={setOrder} />
      ),
    },
    ...columnsForAddress,
    {
      flex: 0.5,
      title: t("action"),
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (_: string, record: INeighborhoodValues) => {
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
              <DeleteTableItemUI fetch={() => deleteNeighborhood(record.id)} />
            </Flex>
          );
        } else if (record.status === STATUS.INACTIVE) {
          return (
            <Tooltip title={t("restore")}>
              <MdRestore
                color="grey"
                cursor={"pointer"}
                size={20}
                onClick={() => restoreNeighborhood(record.id)}
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
        totalItems={data?.total || 0}
        loading={isLoading}
        title={t("neighborhood")}
        columns={columns}
        data={data?.data || []}
        add={handleAdd}
        searchPart={
          <BasicSearchPartUI
            hasOldAndNewNameFilter
            handleSearch={handleSearch}
            handleReset={handleReset}
            status={Number(params.status)}
          />
        }
        modalPart={
          <Form
            form={form}
            onFinish={handleSubmit}
            id="manage-neighborhood"
            className="manage-neighborhood"
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
              formId={"manage-neighborhood"}
            />
          </Form>
        }
      />
    </div>
  );
};
