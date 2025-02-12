import { Flex, Typography } from "antd";
import i18next from "i18next";
import { FC } from "react";
import { useTranslation } from "react-i18next";

import { IAdditionalType } from "@entities/additional";

import { renderHtml } from "@shared/lib/helpers";
import { MentionTextBlockUI } from "@shared/ui/mention-text-block";
import { WarningTextBlockUI } from "@shared/ui/warning-text-block";

type Props = {
  record: IAdditionalType;
};

export const AdditionalExpandPartUI: FC<Props> = (props) => {
  const { record } = props;
  const { t } = useTranslation();

  return (
    <div style={{ padding: "0 0.5em" }}>
      <MentionTextBlockUI
        content={
          record?.mention[i18next.language as keyof typeof record.mention]
        }
      />
      <WarningTextBlockUI
        content={
          record?.warning[i18next.language as keyof typeof record.warning]
        }
      />
      {/* TABLES */}
      {record?.table &&
        record?.table?.map((table) => (
          <Flex key={table.id} vertical style={{ margin: "0.5em 0" }} gap={5}>
            <Typography.Text>
              {table.name[i18next.language as keyof typeof table.name]}
            </Typography.Text>
            <div
              className={"rendered-html-container"}
              dangerouslySetInnerHTML={{
                __html: renderHtml(
                  table.content[i18next.language as keyof typeof table.content],
                ),
              }}
            />
          </Flex>
        ))}
      {/* CONTENT */}
      {record?.content &&
        record?.content?.map((editor) => (
          <Flex key={editor.id} vertical style={{ margin: "0.5em 0" }} gap={5}>
            <Typography.Text>
              {editor.name[i18next.language as keyof typeof editor.name]}
            </Typography.Text>
            <div
              className="editor-style"
              key={editor.id}
              dangerouslySetInnerHTML={{
                __html: renderHtml(
                  editor.content[
                    i18next.language as keyof typeof editor.content
                  ],
                ),
              }}
            />
          </Flex>
        ))}

      <p style={{ margin: 0, color: "grey", fontSize: "12px" }}>
        {t("updated")}:{" "}
        {new Date(record?.updated_at).toLocaleDateString("ru-GB", {
          hour12: false,
        })}
      </p>
    </div>
  );
};
