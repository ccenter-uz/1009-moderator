import { Flex, Form } from "antd";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPencilAlt } from "react-icons/fa";

import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";

import { Address2Inputs } from "@entities/address-2-inputs";
import { NameInputsCyrill } from "@entities/name-inputs-cyrill";
import { NameInputsRu } from "@entities/name-inputs-ru";
import { NameInputsUz } from "@entities/name-inputs-uz";

import { columnsWithAddressAndNamings } from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { ItableWithRegions } from "@shared/types";
import { ManageWrapperBox, ModalAddEdit } from "@shared/ui";

export const ManageDistrictPage: FC = () => {
  const { t } = useTranslation();
  const { isOpen, onClose, onOpen } = useDisclosure();
  const [form] = Form.useForm<ItableWithRegions>();
  const [loading, setLoading] = useState<boolean>(false);

  const data: ItableWithRegions[] = [
    {
      id: 1,
      key: "1",
      name_ru: "John Brown",
      region: "Москва",
      city: "Москва",
      updated_date: "2022-01-01",
      employee: "10032",
    },
  ];

  const onEditOpen = (values: ItableWithRegions) => {
    form.setFieldsValue(values);
    onOpen();
  };

  const onSearch = (value: string) => {
    console.log(value, "search");
  };

  const onSubmit = (values: ItableWithRegions) => {
    console.log(values, "add-edit");
    form.resetFields();
    onClose();
  };

  const overColumns = [
    ...columnsWithAddressAndNamings,
    {
      flex: 0.5,
      title: "Действия",
      key: "action",
      dataIndex: "action",
      align: "center",
      render: (text: string, record: ItableWithRegions) => (
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
        title={t("district")}
        columns={overColumns}
        data={data}
        add={onOpen}
        searchPart={<BasicSearchPartUI handleSearch={onSearch} />}
        modalPart={
          <Form
            form={form}
            onFinish={onSubmit}
            id="modal-add-edit"
            className="manage-district"
          >
            <ModalAddEdit
              loading={loading}
              open={isOpen}
              onClose={onClose}
              headerInputs={<Address2Inputs withIndex />}
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
