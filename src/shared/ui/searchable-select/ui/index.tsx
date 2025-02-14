import { Select, SelectProps } from "antd";
import { FC } from "react";

import { renderLabelSelect } from "@shared/lib/helpers";

export const SearchableSelect: FC<SelectProps> = ({ ...props }) => {
  return (
    <Select
      {...props}
      labelRender={renderLabelSelect}
      showSearch
      allowClear
      filterOption={(input, option) =>
        (option?.label?.toString() ?? "")
          .toLowerCase()
          .includes(input.toLowerCase())
      }
    />
  );
};
