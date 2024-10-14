import { Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import DOMPurify from "dompurify";
import { t } from "i18next";
import { FC } from "react";

import { MentionTextBlockUI } from "@shared/ui/mention-text-block";
import { WarningTextBlockUI } from "@shared/ui/warning-text-block";

/**
 * AdditionalExpandPartUI
 *
 * This component is used to display additional information in the expanded view
 * of the table in the Manage pages.
 *
 * It has the following functionality:
 *
 * - Displays the text block with the mention
 * - Displays the warning text block
 * - Displays tables with columns and data
 * - Displays editor data
 *
 * It takes the following props:
 *
 * - `record`: The record from the table. It should contain the following fields:
 *   - `mention`: The text to display in the mention text block.
 *   - `warning`: The text to display in the warning text block.
 *   - `table`: An array of tables to display. Each table should contain the following fields:
 *     - `id`: The id of the table.
 *     - `columns`: The columns of the table.
 *     - `data`: The data of the table.
 *   - `editor`: An array of editor data to display. Each editor should contain the following fields:
 *     - `id`: The id of the editor.
 *     - `html`: The HTML content of the editor.
 *
 * It has the following state:
 *
 * - `tableColumns`: The columns of the table.
 *
 * @param {Object} props - The props of the component.
 * @param {Object} props.record - The record from the table.
 *
 * @returns {JSX.Element} - The JSX element of the component.
 */
type Props = {
  record: AnyObject;
};
export const AdditionalExpandPartUI: FC<Props> = (props) => {
  const { record } = props;

  return (
    <div style={{ padding: "0 0.5em" }}>
      <MentionTextBlockUI content={record?.mention} />
      <WarningTextBlockUI content={record?.warning} />
      {/* TABLES */}
      {record?.table &&
        record?.table?.map((table: AnyObject) => (
          <Table
            bordered
            style={{ marginBottom: "2em" }}
            key={table.id}
            columns={table?.columns}
            dataSource={table?.data}
            pagination={false}
            size="small"
          />
        ))}
      {/* {record?.table &&
        record?.table?.map((table: AnyObject) => (
          <div
            style={{
              background: "#ffefdf",
              padding: "0.5em 1em",
              marginBottom: "1em",
            }}
            key={table.id}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(table.content),
            }}
          />
        ))} */}
      {/* EDITORS */}
      {record?.editor &&
        record?.editor?.map((editor: AnyObject) => (
          <div
            style={{
              background: "#ffefdf",
              padding: "0.5em 1em",
              marginBottom: "1em",
            }}
            key={editor.id}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(editor.content),
            }}
          />
        ))}
      <p style={{ margin: 0, color: "grey", fontSize: "12px" }}>
        {t("updated")}:
        {new Date(record?.update_date).toLocaleDateString("ru-GB", {
          hour12: false,
        })}
      </p>
    </div>
  );
};
