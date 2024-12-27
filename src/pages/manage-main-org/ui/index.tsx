import { Flex, Form } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { createSchemaFieldRule } from "antd-zod";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPencilAlt } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";

import {
  useCreateMainOrgMutation,
  useDeleteMainOrgMutation,
  useGetMainOrgQuery,
  useUpdateMainOrgMutation,
} from "@entities/main-org";
import { SingleName } from "@entities/single-name";

import {
  columnsForForBasicTable,
  getZodRequiredKeys,
  notificationResponse,
  returnAllParams,
} from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { ItableBasicData } from "@shared/types";
import { ManageWrapperBox, ModalAddEdit } from "@shared/ui";

import { MainOrgCreateFormDtoSchema } from "../model/dto";

export const ManageMainOrgPage: FC = () => {
  const { t } = useTranslation();
  const [_, setSearchParams] = useSearchParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [form] = Form.useForm<ItableBasicData>();
  const formRule = createSchemaFieldRule(MainOrgCreateFormDtoSchema);
  const formRequiredField = getZodRequiredKeys(MainOrgCreateFormDtoSchema);
  const { data, isLoading } = useGetMainOrgQuery({ ...returnAllParams() });
  const [deleteMainOrg] = useDeleteMainOrgMutation();
  const [createMainOrg] = useCreateMainOrgMutation();
  const [updateMainOrg] = useUpdateMainOrgMutation();
  const [editingData, setEditingData] = useState<AnyObject | null>(null);

  const handleEditOpen = (values: ItableBasicData) => {
    setEditingData({ ...values, id: values.id });
    form.setFieldsValue(values);
    onOpen();
  };

  const handleSearch = ({ search }: { search: string }) => {
    const previousParams = returnAllParams();
    if (search || search == "") {
      setSearchParams({ ...previousParams, search });
    }
  };

  const handleSubmit = async (values: ItableBasicData) => {
    const body = {
      ...values,
      id: editingData?.id,
    };
    const request = editingData ? updateMainOrg : createMainOrg;

    const response = await request(body);

    notificationResponse(response, t, onClose);
    form.resetFields();
    onClose();
  };

  const handleAdd = () => {
    setEditingData(null);
    onOpen();
    form.resetFields();
  };

  const columns = [
    ...columnsForForBasicTable,
    {
      flex: 0.5,
      title: "Действия",
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
              <DeleteTableItemUI fetch={() => deleteMainOrg(record.id)} />
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
        title={t("main-org")}
        columns={columns}
        data={data?.data || []}
        add={handleAdd}
        searchPart={<BasicSearchPartUI handleSearch={handleSearch} />}
        modalPart={
          <Form
            form={form}
            onFinish={handleSubmit}
            id="modal-add-edit"
            className="manage-main-org"
          >
            <ModalAddEdit
              singleInputs={
                <SingleName
                  rule={formRule}
                  requiredFields={formRequiredField}
                />
              }
              loading={isLoading}
              open={isOpen}
              onClose={onClose}
              formId={"modal-add-edit"}
            />
          </Form>
        }
      />
    </div>
  );
};
