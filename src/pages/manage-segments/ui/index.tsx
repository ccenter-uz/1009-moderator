import { Flex, Form, Tooltip } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { createSchemaFieldRule } from "antd-zod";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPencilAlt } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";

import {
  useCreateSegmentMutation,
  useDeleteSegmentMutation,
  useGetSegmentsQuery,
  useRestoreSegmentMutation,
  useUpdateSegmentMutation,
} from "@entities/segments";
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

import { SegmentCreateFormDtoSchema } from "../model/dto";

export const ManageSegmentsPage = () => {
  const { t } = useTranslation();
  const [_, setSearchParams] = useSearchParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [form] = Form.useForm();
  const formRule = createSchemaFieldRule(SegmentCreateFormDtoSchema);
  const formRequiredField = getZodRequiredKeys(SegmentCreateFormDtoSchema);

  const params = returnAllParams();
  const { data, isLoading } = useGetSegmentsQuery({
    status: status || STATUS.ACTIVE,
    ...params,
  });
  const [deleteSegment] = useDeleteSegmentMutation();
  const [createSegment] = useCreateSegmentMutation();
  const [updateSegment] = useUpdateSegmentMutation();
  const [restoreSegment] = useRestoreSegmentMutation();

  const [editingData, setEditingData] = useState<AnyObject | null>(null);
  const [isFilterReset, setIsFilterReset] = useState<
    string | number | undefined
  >();

  const handleEditOpen = (values: { name: string; id: string | number }) => {
    setEditingData({ ...values, id: values.id });
    const body = {
      name: values.name,
      id: values.id,
    };
    form.setFieldsValue({ ...body });
    onOpen();
  };

  const handleSearch = ({
    search,
    status = STATUS.ACTIVE,
  }: {
    search: string;
    status: number;
  }) => {
    const inputValue = search || "";

    if (inputValue || inputValue === "") {
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
      name: values.name,
      id: editingData?.id,
    };
    const request = editingData ? updateSegment : createSegment;

    const response = await request(body);

    notificationResponse(response, onClose);
    form.resetFields();
    onClose();
  };

  const handleAdd = () => {
    onOpen();
    setEditingData(null);
    form.resetFields();
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
      title: t("action"),
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (
        text: string,
        record: ItableBasicData & {
          status: number;
          name: { uz: string; ru: string; cy: string };
        },
      ) => {
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
              <DeleteTableItemUI fetch={() => deleteSegment(record.id)} />
            </Flex>
          );
        } else if (record.status === STATUS.INACTIVE) {
          return (
            <Tooltip title={t("restore")}>
              <MdRestore
                color="grey"
                cursor={"pointer"}
                size={20}
                onClick={() => restoreSegment(record.id)}
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
        title={t("segments")}
        columns={columns}
        data={data?.data || []}
        add={handleAdd}
        searchPart={
          <BasicSearchPartUI
            status={Number(params.status)}
            handleSearch={handleSearch}
            handleReset={setIsFilterReset}
          />
        }
        modalPart={
          <Form
            form={form}
            onFinish={handleSubmit}
            id="manage-segments"
            className="manage-segments"
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
              formId={"manage-segments"}
            />
          </Form>
        }
      />
    </div>
  );
};
