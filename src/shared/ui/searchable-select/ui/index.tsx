import { Select, SelectProps } from "antd";
import { FC } from "react";

import { renderLabelSelect } from "@shared/lib/helpers";

export const SearchableSelect: FC<SelectProps> = ({ ...props }) => {
  return (
    <Select
      {...props}
      labelRender={renderLabelSelect}
      style={{ maxWidth: "25rem", width: "100%" }}
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
