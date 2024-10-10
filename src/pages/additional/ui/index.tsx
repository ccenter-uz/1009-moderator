import { Divider } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { FC, useState } from "react";

import { AdditionalTablePartUI } from "@widgets/additional-table-part";

import { AdditionalInputsCategoriesUI } from "@features/additional-inputs-categories";
import { AdditionalSearchAddUI } from "@features/additional-search-add";

// MOCKS
const mock = [
  {
    id: 1,
    key: "1",
    name: "John Brown",
    warning: "warning",
    mention: "mention",
    update_date: "10.10.2021",
    table: [
      {
        id: 1,
        key: "1",
        columns: [
          {
            title: "Name",
            dataIndex: "name",
            key: "name",
          },
          {
            title: "Age",
            dataIndex: "age",
            key: "age",
          },
          {
            title: "Address",
            dataIndex: "address",
            key: "address",
          },
        ],
        data: [
          {
            id: 1,
            key: "1",
            name: "John Brown",
            age: 32,
            address: "New York No. 1 Lake Park",
            tags: ["nice", "developer"],
          },
          {
            id: 2,
            key: "2",
            name: "Jim Green",
            age: 42,
            address: "London No. 1 Lake Park",
            tags: ["loser"],
          },
          {
            id: 3,
            key: "3",
            name: "Joe Black",
            age: 32,
            address: "Sidney No. 1 Lake Park",
            tags: ["cool", "teacher"],
          },
        ],
      },
    ],
    editor: [
      {
        id: 1,
        key: "1",
        content: "BLA BLA BLA text",
      },
      {
        id: 2,
        key: "2",
        content: "FEJIFEIFJEIJFEJIF",
      },
    ],
  },
];
export const Additional: FC = () => {
  const [data, setData] = useState<AnyObject[]>(mock || []);

  return (
    <div className="additional">
      <AdditionalInputsCategoriesUI setData={setData} />
      <Divider />
      <AdditionalSearchAddUI setData={setData} />
      <AdditionalTablePartUI data={data} />
    </div>
  );
};
