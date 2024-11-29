import { Flex, Form } from "antd";
import { t } from "i18next";
import { Dispatch, FC, SetStateAction, useState } from "react";
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
  setSubData: Dispatch<SetStateAction<ItableBasicData[]>>;
};

export const Product: FC<Props> = (props) => {
  const { setSubData } = props;
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
          <DeleteTableItemUI fetch={() => null} />
        </Flex>
      ),
    },
  ];
  const data: ItableBasicData[] = [
    {
      id: 1,
      key: "1",
      name_ru: "John Brown",
      name_uz: "John Brown",
      name_cyrill: "John Brown",
      updated_date: "2022-01-01",
      employee: "10032",
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

  const onRowSelect = (record: unknown) => {
    console.log(record, "row-select");
    setSubData([record] as ItableBasicData[]);
  };

  return (
    <ManageWrapperBox
      totalItems={0}
      title={t("category-tu")}
      rowSelect
      onRowSelect={onRowSelect}
      columns={overColumns}
      data={data}
      add={onOpen}
      searchPart={<BasicSearchPartUI handleSearch={onSearch} />}
      modalPart={
        <Form
          form={form}
          onFinish={onSubmit}
          id="modal-add-edit"
          className="manage-category-tu"
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
