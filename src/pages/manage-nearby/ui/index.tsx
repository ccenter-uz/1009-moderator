import { Flex, Form, Select } from "antd";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPencilAlt } from "react-icons/fa";

import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";

import { Address2Inputs } from "@entities/address-2-inputs";
import { SingleNameCyrill } from "@entities/single-name-cyrill";
import { SingleNameRu } from "@entities/single-name-ru";
import { SingleNameUz } from "@entities/single-name-uz";

import { columnsWithRegions } from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { ItableWithRegions } from "@shared/types";
import { ManageWrapperBox, ModalAddEdit } from "@shared/ui";
export const ManageNearbyPage: FC = () => {
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
    ...columnsWithRegions,
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
        title={t("nearby")}
        columns={overColumns}
        data={data}
        add={onOpen}
        searchPart={
          <BasicSearchPartUI
            handleSearch={onSearch}
            additionalSearch={
              <Form.Item
                name={"nearby-category"}
                label={t("nearby-category")}
                style={{ marginBottom: 0, flex: 1 }}
              >
                <Select options={[{ label: "1", value: "1" }]} />
              </Form.Item>
            }
          />
        }
        modalPart={
          <Form
            form={form}
            onFinish={onSubmit}
            id="modal-add-edit"
            className="manage-nearby"
          >
            <ModalAddEdit
              loading={loading}
              open={isOpen}
              onClose={onClose}
              headerInputs={<Address2Inputs />}
              ruInputs={<SingleNameRu />}
              uzInputs={<SingleNameUz />}
              uzCyrillicInputs={<SingleNameCyrill />}
              formId={"modal-add-edit"}
            />
          </Form>
        }
      />
    </div>
  );
};
