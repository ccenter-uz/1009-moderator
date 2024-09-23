import { Flex, Form } from "antd";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPencilAlt } from "react-icons/fa";

import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";

import { Address3Inputs } from "@entities/address-3-inputs";
import { NameInputsCyrill } from "@entities/name-inputs-cyrill";
import { NameInputsRu } from "@entities/name-inputs-ru";
import { NameInputsUz } from "@entities/name-inputs-uz";

import { columnsForAddress } from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { ItableDataAddress } from "@shared/types";
import { ManageWrapperBox, ModalAddEdit } from "@shared/ui";

export const ManagePassagePage: FC = () => {
  const { t } = useTranslation();
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
      render: (text: string, record: ItableDataAddress) => (
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

  return (
    <div>
      <ManageWrapperBox
        totalItems={0}
        title={t("passage")}
        columns={overColumns}
        data={data}
        add={onOpen}
        searchPart={<BasicSearchPartUI handleSearch={onSearch} />}
        modalPart={
          <Form
            form={form}
            onFinish={onSubmit}
            id="modal-add-edit"
            className="manage-passage"
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
    </div>
  );
};
