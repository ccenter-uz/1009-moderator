import { Flex, Form } from "antd";
import { t } from "i18next";
import { FC, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";

import { SingleNameCyrill } from "@entities/single-name-cyrill";
import { SingleNameRu } from "@entities/single-name-ru";
import { SingleNameUz } from "@entities/single-name-uz";

import { columnsForCategories } from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { ItableBasicData } from "@shared/types";
import { ManageWrapperBox, ModalAddEdit } from "@shared/ui";

type Props = {
  data: ItableBasicData[];
};

export const SubCategory: FC<Props> = (props) => {
  const { data } = props;
  const [form] = Form.useForm();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [loading, setLoading] = useState<boolean>(false);

  const overColumns = [
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
            onClick={() => onEditOpen(record)}
          />
          <DeleteTableItemUI id={record.id} href={"/delete"} />
        </Flex>
      ),
    },
  ];

  const onEditOpen = (values: ItableBasicData) => {
    form.setFieldsValue(values);
    onOpen();
  };

  const onSearch = (value: string) => {
    console.log(value, "search");
  };

  const onSubmit = (values: ItableBasicData) => {
    console.log(values, "add-edit");
    form.resetFields();
    onClose();
  };

  return (
    <ManageWrapperBox
      totalItems={0}
      title={t("sub-category")}
      columns={overColumns}
      data={data}
      add={onOpen}
      searchPart={<BasicSearchPartUI handleSearch={onSearch} />}
      modalPart={
        <Form
          form={form}
          onFinish={onSubmit}
          id="modal-add-edit"
          className="manage-sub-category"
        >
          <ModalAddEdit
            loading={loading}
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
