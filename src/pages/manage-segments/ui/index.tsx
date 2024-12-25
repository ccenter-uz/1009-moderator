import { Flex, Form } from "antd";
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
import { SingleName } from "@entities/single-name";

import {
  columnsForForBasicTable,
  notificationResponse,
  returnAllParams,
} from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { ItableBasicData } from "@shared/types";
import { ManageWrapperBox, ModalAddEdit } from "@shared/ui";

export const ManageSegmentsPage = () => {
  const { t } = useTranslation();
  const [_, setSearchParams] = useSearchParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [form] = Form.useForm();
  const { data, isLoading } = useGetSegmentsQuery({
    ...returnAllParams(),
  });
  const [deleteSegment] = useDeleteSegmentMutation();
  const [createSegment] = useCreateSegmentMutation();
  const [updateSegment] = useUpdateSegmentMutation();
  const [editingData, setEditingData] = useState<ItableBasicData | null>(null);
  const handleEditOpen = (values: ItableBasicData) => {
    setEditingData({ ...values, id: values.id });
    form.setFieldsValue(values);
    onOpen();
  };

  const handleSearch = ({ search }: { search: string }) => {
    const previousParams = returnAllParams();
    setSearchParams({ ...previousParams, search });
  };

  const handleSubmit = async (values: ItableBasicData) => {
    const body = {
      ...values,
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
  };

  const columns = [
    ...columnsForForBasicTable,
    {
      flex: 0.5,
      title: t("action"),
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (text: string, record: ItableBasicData & { status: number }) => {
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
              singleInputs={<SingleName />}
              formId={"manage-segments"}
            />
          </Form>
        }
      />
    </div>
  );
};
