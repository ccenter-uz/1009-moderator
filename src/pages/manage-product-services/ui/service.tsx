import { Flex, Form } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { t } from "i18next";
import { FC, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";

import {
  useCreateSubCategoryMutation,
  useDeleteSubCategoryMutation,
  useUpdateSubCategoryMutation,
} from "@entities/product-services";
import { SingleNameCyrill } from "@entities/single-name-cyrill";
import { SingleNameRu } from "@entities/single-name-ru";
import { SingleNameUz } from "@entities/single-name-uz";

import {
  columnsForCategories,
  notificationResponse,
  returnAllParams,
} from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { ItableBasicData } from "@shared/types";
import { ManageWrapperBox, ModalAddEdit } from "@shared/ui";

type Props = {
  data: AnyObject | undefined;
  isLoading: boolean;
};

export const Service: FC<Props> = (props) => {
  const { data, isLoading } = props;
  const [_, setSearchParams] = useSearchParams();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [form] = Form.useForm();
  const [createSubCategory] = useCreateSubCategoryMutation();
  const [updateSubCategory] = useUpdateSubCategoryMutation();
  const [deleteSubCategory] = useDeleteSubCategoryMutation();
  const [editingData, setEditingData] = useState<AnyObject | null>(null);

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
      name: {
        ru: values.name_ru,
        uz: values.name_uz,
        cy: values.name_cyrill,
      },
      id: editingData?.id,
    };
    const request = editingData ? updateSubCategory : createSubCategory;

    const response = await request(body);

    notificationResponse(response, t, onClose);
    form.resetFields();
    onClose();
  };

  const onAdd = () => {
    onOpen();
    setEditingData(null);
    form.resetFields();
  };

  const columns = [
    ...columnsForCategories,
    {
      flex: 0.5,
      title: "Действия",
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (text: string, record: ItableBasicData) => (
        <Flex justify="center" align="center" gap={8}>
          <FaPencilAlt
            color="grey"
            fontSize={16}
            cursor={"pointer"}
            title={t("edit")}
            onClick={() => handleEditOpen(record)}
          />
          <DeleteTableItemUI fetch={() => deleteSubCategory(record.id)} />
        </Flex>
      ),
    },
  ];

  return (
    <ManageWrapperBox
      loading={isLoading}
      totalItems={data?.total || 0}
      title={t("sub-category-tu")}
      columns={columns}
      data={data?.data || []}
      add={onAdd}
      searchPart={<BasicSearchPartUI handleSearch={handleSearch} />}
      modalPart={
        <Form
          form={form}
          onFinish={handleSubmit}
          id="modal-add-edit"
          className="manage-sub-category-tu"
        >
          <ModalAddEdit
            loading={isLoading}
            open={isOpen}
            onClose={onClose}
            ruInputs={<SingleNameRu />}
            uzInputs={<SingleNameUz />}
            uzCyrillicInputs={<SingleNameCyrill />}
            formId={"modal-add-edit"}
          />
        </Form>
      }
    />
  );
};
