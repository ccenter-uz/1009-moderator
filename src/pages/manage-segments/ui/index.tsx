import { Flex, Form } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { createSchemaFieldRule } from "antd-zod";
import { useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPencilAlt } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";

import {
  useCreateSegmentMutation,
  useDeleteSegmentMutation,
  useGetSegmentsQuery,
  useUpdateSegmentMutation,
} from "@entities/segments";
import { SingleNameCyrill } from "@entities/single-name-cyrill";
import { SingleNameRu } from "@entities/single-name-ru";
import { SingleNameUz } from "@entities/single-name-uz";

import {
  columnsForForBasicTable,
  getZodRequiredKeys,
  notificationResponse,
  returnAllParams,
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
  const { data, isLoading } = useGetSegmentsQuery({
    ...returnAllParams(),
  });
  const [deleteSegment] = useDeleteSegmentMutation();
  const [createSegment] = useCreateSegmentMutation();
  const [updateSegment] = useUpdateSegmentMutation();
  const [editingData, setEditingData] = useState<AnyObject | null>(null);
  const handleEditOpen = (values: {
    name: { uz: string; ru: string; cy: string };
    id: string | number;
  }) => {
    setEditingData({ ...values, id: values.id });
    const body = {
      name_uz: values.name.uz,
      name_ru: values.name.ru,
      name_uzcyrill: values.name.cy,
      id: values.id,
    };
    form.setFieldsValue({ ...body });
    onOpen();
  };

  const handleSearch = ({ search }: { search: string }) => {
    const previousParams = returnAllParams();
    setSearchParams({ ...previousParams, search });
  };

  const handleSubmit = async (values: ItableBasicData) => {
    const body = {
      name: {
        uz: values.name_uz,
        ru: values.name_ru,
        cy: values.name_uzcyrill,
      },
      id: editingData?.id,
    };
    const request = editingData ? updateSegment : createSegment;

    const response = await request(body);

    notificationResponse(response, t, onClose);
    form.resetFields();
    onClose();
  };

  const handleAdd = () => {
    onOpen();
    setEditingData(null);
    form.resetFields();
  };

  const columns = [
    ...columnsForForBasicTable,
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
              <DeleteTableItemUI fetch={() => deleteSegment(record.id)} />
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
        title={t("segments")}
        columns={columns}
        data={data?.data || []}
        add={handleAdd}
        searchPart={<BasicSearchPartUI handleSearch={handleSearch} />}
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
              formId={"manage-segments"}
            />
          </Form>
        }
      />
    </div>
  );
};
