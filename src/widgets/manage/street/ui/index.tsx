import { Button, Flex, Input, Select } from "antd";
import TextArea from "antd/es/input/TextArea";
import { FC } from "react";
import { FaPlus } from "react-icons/fa";

import { BasicSearchPartUI } from "@features/index";

import { ManageWrapperBox } from "@shared/ui";

export const ManageStreet: FC = () => {
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
        title="Улица"
        searchPart={
          <BasicSearchPartUI
            handleSearch={(values) => console.log(values, "search")}
          />
        }
        addPart={addPart}
        columns={columns}
        data={data}
        deleteHref="Улица"
      />
    </div>
  );
};
