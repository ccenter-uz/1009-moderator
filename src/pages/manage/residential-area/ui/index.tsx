import { Flex, Input, Button, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC } from "react";
import { FaSearch, FaPlus } from "react-icons/fa";

import { ManageWrapperBox } from "@shared/ui";
export const ManageResidentialArea: FC = () => {
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
    <Flex gap={8} vertical>
      <Flex gap={8} align="center">
        <Input type="text" placeholder="Название" />
        <Input type="text" placeholder="Название" />
        <Input type="text" placeholder="Название" />
        <Select placeholder="Регион" />
        <Select placeholder="Район" />
        <Select placeholder="Район" />
        <Button type="primary" icon={<FaPlus />}>
          Добавить
        </Button>
      </Flex>
      <TextArea />
    </Flex>
  );

  return (
    <div>
      <ManageWrapperBox
        totalItems={0}
        title="Массив/Махалля"
        searchPart={searchPart}
        addPart={addPart}
        columns={columns}
        data={data}
        onDelete={(id) => console.log(id)}
      />
    </div>
  );
};
