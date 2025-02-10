import { Flex, Form, Tooltip } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { createSchemaFieldRule } from "antd-zod";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPencilAlt } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";

import {
  useCreateNearbyCategoryMutation,
  useDeleteNearbyCategoryMutation,
  useGetNearbyCategoryQuery,
  useRestoreNearbyCategoryMutation,
  useUpdateNearbyCategoryMutation,
} from "@entities/nearby";
import { SingleName } from "@entities/single-name";

import {
  columnsWithSingleName,
  getZodRequiredKeys,
  notificationResponse,
  returnAllParams,
  STATUS,
} from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { ItableBasicData } from "@shared/types";
import { ManageWrapperBox, ModalAddEdit } from "@shared/ui";

import { NearbyCategoryCreateFormDtoSchema } from "../model/dto";

export const ManageNearbyCategoryPage: FC = () => {
  const { t } = useTranslation();
  const [_, setSearchParams] = useSearchParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [form] = Form.useForm<ItableBasicData>();
  const formRule = createSchemaFieldRule(NearbyCategoryCreateFormDtoSchema);
  const formRequiredField = getZodRequiredKeys(
    NearbyCategoryCreateFormDtoSchema,
  );

  const params = returnAllParams();
  const { data, isLoading } = useGetNearbyCategoryQuery({
    status: status || STATUS.ACTIVE,
    ...params,
  });
  const [deleteNearbyCategory] = useDeleteNearbyCategoryMutation();
  const [createNearbyCategory] = useCreateNearbyCategoryMutation();
  const [updateNearbyCategory] = useUpdateNearbyCategoryMutation();
  const [restoreNearbyCategory] = useRestoreNearbyCategoryMutation();

  const [editingData, setEditingData] = useState<AnyObject | null>(null);
  const [isFilterReset, setIsFilterReset] = useState<
    string | number | undefined
  >();

  const handleEditOpen = (values: ItableBasicData) => {
    setEditingData({ ...values, id: values.id });
    form.setFieldsValue(values);
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

  const handleSubmit = async (values: ItableBasicData) => {
    const body = {
      ...values,
      id: editingData?.id,
    };
    const request = editingData ? updateNearbyCategory : createNearbyCategory;

    const response = await request(body);

    notificationResponse(response, onClose);
    form.resetFields();
    onClose();
  };

  const handleAdd = () => {
    onOpen();
    setEditingData(null);
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
    ...columnsWithSingleName,
    {
      flex: 0.5,
      title: "Действия",
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (text: string, record: ItableBasicData & { status: number }) => {
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
              <DeleteTableItemUI
                fetch={() => deleteNearbyCategory(record.id)}
              />
            </Flex>
          );
        } else if (record.status === STATUS.INACTIVE) {
          return (
            <Tooltip title={t("restore")}>
              <MdRestore
                color="grey"
                cursor={"pointer"}
                size={20}
                onClick={() => restoreNearbyCategory(record.id)}
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
        title={t("nearby-category")}
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
            className="manage-nearby-category"
          >
            <ModalAddEdit
              loading={isLoading}
              open={isOpen}
              onClose={onClose}
              singleInputs={
                <SingleName
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
