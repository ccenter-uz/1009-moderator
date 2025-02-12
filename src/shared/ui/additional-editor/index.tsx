import { Button, Collapse, Flex, Input, Typography } from "antd";
import { ChangeEvent, FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { SunEditorOptions } from "suneditor/src/options";
import SunEditor from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";

import {
  getLocalStorage,
  renderHtml,
  setLocalStorage,
} from "@shared/lib/helpers";

type Props = {
  localName: string;
  editorOptions: SunEditorOptions;
  className: string;
};

export const AdditionalEditor: FC<Props> = (props) => {
  const { localName, editorOptions, className } = props;
  const { t } = useTranslation();
  const [valueRu, setValueRu] = useState<string>("");
  const [valueUz, setValueUz] = useState<string>("");
  const [valueCyrill, setValueCyrill] = useState<string>("");
  const [name, setName] = useState<{
    ru: string;
    uz: string;
    cy: string;
  }>({ ru: "", uz: "", cy: "" });
  const [editor, setEditor] = useState<
    {
      id: string;
      content: { ru: string; uz: string; cy: string };
      name: { ru: string; uz: string; cy: string };
    }[]
  >(getLocalStorage(localName) ? getLocalStorage(localName) : []);

  const onAdd = () => {
    const newEditor = [
      ...editor,
      {
        id: Date.now().toString(),
        name,
        content: {
          ru: valueRu,
          uz: valueUz,
          cy: valueCyrill,
        },
      },
    ];
    setEditor(newEditor);
    setValueRu("");
    setValueUz("");
    setValueCyrill("");
    setName({ ru: "", uz: "", cy: "" });
  };

  const onEdit = ({
    content,
    id,
    name,
  }: {
    content: { ru: string; uz: string; cy: string };
    id: string;
    name: { ru: string; uz: string; cy: string };
  }) => {
    setValueRu(content.ru);
    setValueUz(content.uz);
    setValueCyrill(content.cy);
    setName(name);
    const newEditor = editor.filter((el) => el.id !== id);
    setEditor(newEditor);
  };

  const onDelete = (id: string) => {
    const newEditor = editor.filter((el) => el.id !== id);
    setEditor(newEditor);
  };

  const onChangeTitle = (e: ChangeEvent<HTMLInputElement>) => {
    const { name: targetName, value: targetValue } = e.target;
    setName({ ...name, [targetName]: targetValue });
  };

  useEffect(() => {
    setLocalStorage(localName, editor);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [editor]);

  return (
    <Flex vertical>
      <Typography.Title level={4}>{t("ru")}</Typography.Title>
      <Input
        type="text"
        placeholder={t("title-ru")}
        name="ru"
        onChange={onChangeTitle}
        value={name.ru}
      />
      <SunEditor
        setContents={valueRu}
        onChange={setValueRu}
        setOptions={editorOptions}
      />
      <Typography.Title level={4}>{t("uz")}</Typography.Title>
      <Input
        type="text"
        placeholder={t("title-uz")}
        name="uz"
        onChange={onChangeTitle}
        value={name.uz}
      />
      <SunEditor
        setContents={valueUz}
        onChange={setValueUz}
        setOptions={editorOptions}
      />
      <Typography.Title level={4}>{t("cyrill")}</Typography.Title>
      <Input
        type="text"
        placeholder={t("title-cyrill")}
        name="cy"
        onChange={onChangeTitle}
        value={name.cy}
      />
      <SunEditor
        setContents={valueCyrill}
        onChange={setValueCyrill}
        setOptions={editorOptions}
      />
      <Button
        onClick={onAdd}
        icon={<FaPlus />}
        type="primary"
        style={{
          margin: "8px 0",
          width: "fit-content",
        }}
      >
        {t("add")}
      </Button>
      <Typography.Title level={4}>{t("list-table")}</Typography.Title>
      {editor.length > 0 && (
        <Collapse
          items={editor.map((el) => ({
            key: el.id,
            label: (
              <Flex align="center" justify="space-between">
                <Typography.Text>{el.name.ru}</Typography.Text>
                <Flex gap={8} align="center" justify="end">
                  <FaPen
                    onClick={() => onEdit(el)}
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
              </Flex>
            ),
            children: (
              <Flex key={el.id} vertical>
                <Typography.Text>{el.name.ru}</Typography.Text>
                <div
                  className={className}
                  dangerouslySetInnerHTML={{
                    __html: renderHtml(el.content.ru),
                  }}
                />
                <Typography.Text>{el.name.uz}</Typography.Text>
                <div
                  className={className}
                  dangerouslySetInnerHTML={{
                    __html: renderHtml(el.content.uz),
                  }}
                />
                <Typography.Text>{el.name.cy}</Typography.Text>
                <div
                  className={className}
                  dangerouslySetInnerHTML={{
                    __html: renderHtml(el.content.cy),
                  }}
                />
              </Flex>
            ),
          }))}
        />
      )}
    </Flex>
  );
};
