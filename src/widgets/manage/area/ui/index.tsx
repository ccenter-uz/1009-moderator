import { Flex, Form } from "antd";
import { FC, useState } from "react";
import { FaPencilAlt } from "react-icons/fa";

import { BasicSearchPartUI, DeleteTableItemUI } from "@features/index";

import { Address3Inputs } from "@entities/address-3-inputs";
import { NameInputsCyrill } from "@entities/name-inputs-cyrill";
import { NameInputsRu } from "@entities/name-inputs-ru";
import { NameInputsUz } from "@entities/name-inputs-uz";

import { useDisclosure } from "@shared/hooks/useDisclosure";
import { ItableDataAddress } from "@shared/types";
import { ManageWrapperBox, ModalAddEdit } from "@shared/ui";
import { columnsForAddress } from "@shared/utils/helpers";

export const ManageArea: FC = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [form] = Form.useForm<ItableDataAddress>();
  const [loading, setLoading] = useState<boolean>(false);

  const data: ItableDataAddress[] = [
    {
      id: 1,
      key: "1",
      name_ru: "John Brown",
      old_name_ru: "Johnanna Brown",
      new_name_ru: "George Brown",
      index: "10100",
      region: "Москва",
      city: "Москва",
      district: "Пушкинский",
      updated_date: "2022-01-01",
      employee: "10032",
    },
  ];

  const onEditOpen = (values: ItableDataAddress) => {
    form.setFieldsValue(values);
    onOpen();
  };

  const onSearch = (value: string) => {
    console.log(value, "search");
  };

  const onSubmit = (values: ItableDataAddress) => {
    console.log(values, "add-edit");
    form.resetFields();
    onClose();
  };

  const overColumns = [
    ...columnsForAddress,
    {
      flex: 0.5,
      title: "Действия",
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (t: string, record: ItableDataAddress) => (
        <Flex justify="center" align="center" gap={8}>
          <FaPencilAlt
            color="grey"
            fontSize={16}
            cursor={"pointer"}
            title="Редактировать"
            onClick={() => onEditOpen(record)}
          />
          <DeleteTableItemUI id={record.id} href={"/delete"} />
        </Flex>
      ),
    },
  ];

  return (
    <ManageWrapperBox
      totalItems={0}
      title="Площадь"
      columns={overColumns}
      data={data}
      add={onOpen}
      searchPart={<BasicSearchPartUI handleSearch={onSearch} />}
      modalPart={
        <Form
          form={form}
          onFinish={onSubmit}
          id="modal-add-edit"
          className="manage-area"
        >
          <ModalAddEdit
            loading={loading}
            open={isOpen}
            onClose={onClose}
            headerInputs={<Address3Inputs />}
            ruInputs={<NameInputsRu />}
            uzInputs={<NameInputsUz />}
            uzCyrillicInputs={<NameInputsCyrill />}
            formId={"modal-add-edit"}
          />
        </Form>
      }
    />
  );
};
