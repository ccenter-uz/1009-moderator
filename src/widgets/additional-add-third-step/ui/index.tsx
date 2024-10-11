import { Button, Flex, Typography } from "antd";
import DOMPurify from "dompurify";
import { FC, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

import { formats } from "../model/formats";
import { modules } from "../model/modules";

export const AdditionalAddThirdStepUI: FC = () => {
  const { t } = useTranslation();
  const [value, setValue] = useState("");
  const [editor, setEditor] = useState<{ id: string; content: string }[]>([]);

  const onChange = (e: string) => {
    setValue(e);
  };

  const onAdd = () => {
    console.log(value, "value");
    const newEditor = [
      ...editor,
      { id: Date.now().toString(), content: value },
    ];
    setEditor(newEditor);
    setValue("");
  };

  const onDelete = (id: string) => {
    const newEditor = editor.filter((el) => el.id !== id);
    setEditor(newEditor);
  };

  const onEdit = (content: string, id: string) => {
    setValue(content);
    const newEditor = editor.filter((el) => el.id !== id);
    setEditor(newEditor);
  };

  return (
    <div>
      <Button
        onClick={onAdd}
        icon={<FaPlus />}
        type="primary"
        style={{ margin: "8px 0" }}
      >
        {t("add")}
      </Button>
      <ReactQuill
        value={value}
        theme="snow"
        modules={modules}
        formats={formats}
        onChange={onChange}
      />
      <Typography.Title level={4}>{t("mentions-list")}</Typography.Title>
      {editor?.map((el) => (
        <Flex key={el.id} vertical>
          <Flex gap={8} align="center" justify="end">
            <FaPen
              onClick={() => onEdit(el.content, el.id)}
              cursor={"pointer"}
              color="grey"
              title={t("edit")}
            />
            <FaTrash
              onClick={() => onDelete(el.id)}
              cursor={"pointer"}
              color="#fb6767"
              title={t("delete")}
            />
          </Flex>
          <div
            style={{
              background: "#ffefdf",
              padding: "0.5em 1em",
              marginBottom: "1em",
            }}
            dangerouslySetInnerHTML={{
              __html: DOMPurify.sanitize(el.content),
            }}
          />
        </Flex>
      ))}
    </div>
  );
};
