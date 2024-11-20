import { Flex, Typography } from "antd";
import { AnyObject } from "antd/es/_util/type";
import DOMPurify from "dompurify";
import i18next from "i18next";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { renderHtml } from "@shared/lib/helpers";
import { MentionTextBlockUI } from "@shared/ui/mention-text-block";
import { WarningTextBlockUI } from "@shared/ui/warning-text-block";

/**
 * AdditionalExpandPartUI
 *
 * This component is used to display additional information about a specific row in
 * the table of the Manage pages. It displays the mention and warning text blocks,
 * then the tables and the editors.
 *
 * It takes the following props:
 *
 * - `record`: The record of the table to display the information of.
 *
 * @param {Object} props - The props of the component.
 * @param {AnyObject} props.record - The record of the table to display the information of.
 *
 * @returns {JSX.Element} - The JSX element of the component.
 */

type Props = {
  record: AnyObject;
};
export const AdditionalExpandPartUI: FC<Props> = (props) => {
  const { record } = props;
  const { t } = useTranslation();
  const locale = i18next.language;

  return (
    <div style={{ padding: "0 0.5em" }}>
      <MentionTextBlockUI content={record?.mention[locale]} />
      <WarningTextBlockUI content={record?.warning[locale]} />
      {/* TABLES */}
      {record?.table &&
        record?.table?.map((table: AnyObject) => (
          <Flex key={table.id} vertical style={{ margin: "0.5em 0" }} gap={5}>
            <Typography.Text>{table.title[locale]}</Typography.Text>
            <div
              className={"rendered-html-container"}
              dangerouslySetInnerHTML={{
                __html: renderHtml(table.content[locale]),
              }}
            />
          </Flex>
        ))}
      {/* CONTENT */}
      {record?.content &&
        record?.content?.map((editor: AnyObject) => (
          <Flex key={editor.id} vertical style={{ margin: "0.5em 0" }} gap={5}>
            <Typography.Text>{editor.title[locale]}</Typography.Text>
            <div
              className="editor-style"
              key={editor.id}
              dangerouslySetInnerHTML={{
                __html: DOMPurify.sanitize(editor.content[locale]),
              }}
            />
          </Flex>
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
