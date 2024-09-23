import { Button, Flex, Input } from "antd";
import { FC } from "react";
import { FaPlus } from "react-icons/fa";

import { BasicSearchPartUI } from "@features/index";

import { ManageWrapperBox } from "@shared/ui";
export const ManageNearbyCategory: FC = () => {
  const columns = [
    {
      title: "Название",
      dataIndex: "name",
      key: "name",
    },
  ];
  const data = [
    {
      id: 1,
      name: "John Brown",
      age: 32,
      address: "New York No. 1 Lake Park",
    },
  ];

  // ADD-CONTENT
  const addPart = (
    <Flex gap={8} align="center">
      <Input type="text" placeholder="Название" />
      <Button type="primary" icon={<FaPlus />}>
        Добавить
      </Button>
    </Flex>
  );

  return (
    <div>
      <ManageWrapperBox
        totalItems={0}
        title="Категории Ориентира"
        searchPart={
          <BasicSearchPartUI
            handleSearch={(values) => console.log(values, "search")}
          />
        }
        addPart={addPart}
        columns={columns}
        data={data}
        deleteHref="Категории Ориентира"
      />
    </div>
  );
};
