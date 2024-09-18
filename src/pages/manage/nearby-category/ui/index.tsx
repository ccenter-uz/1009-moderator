import { Button, Flex, Input } from "antd";
import { FC } from "react";
import { FaPlus, FaSearch } from "react-icons/fa";

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

  // SEARCH-CONTENT
  const searchPart = (
    <Flex gap={8} align="center">
      <Input type="text" placeholder="Поиск" />
      <Button type="primary" icon={<FaSearch />}>
        Поиск
      </Button>
    </Flex>
  );

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
        searchPart={searchPart}
        addPart={addPart}
        columns={columns}
        data={data}
        onDelete={(id) => console.log(id)}
      />
    </div>
  );
};
