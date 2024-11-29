import { Flex } from "antd";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPen } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";
import { UserAddEditModalUI } from "@features/user-add-edit-modal";

import { useDeleteUserMutation, useGetUsersQuery } from "@entities/users";

import { returnAllParams, usersTableColumns } from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { ManageWrapperBox } from "@shared/ui";

export type RecordProps = {
  id: string | number;
  fullName: string;
  phoneNumber: string;
  password: string;
  numericId: string | number;
  roleId?: string | number;
};

export const ManageUsersPage: FC = () => {
  const { t } = useTranslation();
  const [_, setSearchParams] = useSearchParams();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { data, isLoading } = useGetUsersQuery({ ...returnAllParams() });
  const [deleteUser] = useDeleteUserMutation();
  const [record, setRecord] = useState<RecordProps | null>(null);

  const onEdit = (record: RecordProps) => {
    setRecord(record);
    onOpen();
  };
  const onAdd = () => {
    onOpen();
    setRecord(null);
  };

  const onSearch = ({ search }: { search: string }) => {
    const prevParams = returnAllParams();
    setSearchParams({ ...prevParams, search });
  };

  const columns = [
    ...usersTableColumns,
    {
      title: t("actions"),
      dataIndex: "actions",
      key: "actions",
      render: (text: string, record: RecordProps) => {
        return (
          <Flex align="center" gap={8}>
            <FaPen
              cursor={"pointer"}
              color="grey"
              title={t("edit")}
              onClick={() => onEdit(record)}
            />
            <DeleteTableItemUI fetch={() => deleteUser(record.id)} />
          </Flex>
        );
      },
    },
  ];

  return (
    <div>
      <ManageWrapperBox
        loading={isLoading}
        title={t("manage-users")}
        searchPart={<BasicSearchPartUI handleSearch={onSearch} />}
        add={onAdd}
        columns={columns}
        data={data?.data || []}
        totalItems={data?.total || 0}
        modalPart={
          <UserAddEditModalUI open={isOpen} onClose={onClose} record={record} />
        }
      />
    </div>
  );
};
