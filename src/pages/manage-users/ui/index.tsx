import { Flex } from "antd";
import i18next from "i18next";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPen } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useSearchParams } from "react-router-dom";

import { BasicSearchPartUI } from "@features/basic-search-part";
import { DeleteTableItemUI } from "@features/delete-table-item";

import { BASE_URL, getCookie } from "@shared/lib/helpers";
import { RootState } from "@shared/types";
import { ManageWrapperBox } from "@shared/ui";

import { setUsers } from "../model/Slicer";

const status: { [key: number]: string } = {
  0: i18next.t("not-active"),
  1: i18next.t("active"),
};

export const ManageUsersPage: FC = () => {
  const { t } = useTranslation();
  const [searchParams] = useSearchParams();
  const { users } = useSelector(
    ({ useManageUsersSlice }: RootState) => useManageUsersSlice,
  );
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const columns = [
    {
      title: t("full-name"),
      dataIndex: "fullName",
      key: "fullName",
    },
    {
      title: t("role"),
      dataIndex: "role",
      key: "role",
      render: (text: { name: string }) => text.name,
    },
    {
      title: t("password"),
      dataIndex: "password",
      key: "password",
    },
    {
      title: t("user-number"),
      dataIndex: "numericId",
      key: "numericId",
    },
    {
      title: t("status"),
      dataIndex: "status",
      key: "status",
      render: (text: number) => status[text],
    },
    {
      title: t("createAt"),
      dataIndex: "createAt",
      key: "createAt",
    },
    {
      title: t("updateAt"),
      dataIndex: "updateAt",
      key: "updateAt",
    },
    {
      title: t("deleteAt"),
      dataIndex: "deleteAt",
      key: "deleteAt",
    },
    {
      title: t("actions"),
      dataIndex: "actions",
      key: "actions",
      render: () => {
        return (
          <Flex align="center" gap={8}>
            <FaPen cursor={"pointer"} color="grey" title={t("edit")} />
            <DeleteTableItemUI id={1} href={"/delete"} />
          </Flex>
        );
      },
    },
  ];

  const onSearch = (search: string) => {
    console.log(search, "search");
  };

  const onAdd = () => {
    console.log("add");
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch(
          `${BASE_URL}user?${searchParams.toString()}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${getCookie("access_token")}`,
            },
          },
        );
        const data = await response.json();
        if (!data) return null;

        dispatch(
          setUsers(
            data?.result?.data.map((item: { id: number }) => ({
              ...item,
              key: item.id,
            })),
          ),
        );
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    };

    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [searchParams]);

  return (
    <div>
      <ManageWrapperBox
        loading={loading}
        title={t("manage-users")}
        searchPart={<BasicSearchPartUI handleSearch={onSearch} />}
        add={onAdd}
        columns={columns}
        data={users}
        totalItems={0}
      />
    </div>
  );
};
