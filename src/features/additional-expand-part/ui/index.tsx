import { Table } from "antd";
import { AnyObject } from "antd/es/_util/type";
import DOMPurify from "dompurify";
import { t } from "i18next";
import { FC } from "react";

import { MentionTextBlockUI } from "@shared/ui/mention-text-block";
import { WarningTextBlockUI } from "@shared/ui/warning-text-block";

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
