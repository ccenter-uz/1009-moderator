import {
  Button,
  Divider,
  Flex,
  Form,
  Input,
  Modal,
  Select,
  Typography,
} from "antd";
import i18next from "i18next";
import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { MdRestore } from "react-icons/md";
import { useSearchParams } from "react-router-dom";

import {
  useCreateAdditionalCategoryMutation,
  useDeleteAdditionalCategoryMutation,
  useGetAdditionalCategoriesQuery,
  useRestoreAdditionalCategoryMutation,
  useUpdateAdditionalCategoryMutation,
} from "@entities/additional";

import {
  AntDesignSwal,
  notificationResponse,
  returnAllParams,
  STATUS,
} from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { Can } from "@shared/ui";

const enum ENUMS {
  CATEGORY = "category",
}

export const AdditionalInputsCategoriesUI: FC = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchParams, setSearchParams] = useSearchParams();
  const [form] = Form.useForm();
  const [category, setCategory] = useState<string>(
    searchParams.get(ENUMS.CATEGORY) || "",
  );
  const [editCatId, setEditCatId] = useState<number | string | null>(null);
  const { data: categories, isLoading } = useGetAdditionalCategoriesQuery({
    ...returnAllParams(),
  });
  const [createAdditionalCategory] = useCreateAdditionalCategoryMutation();
  const [updateAdditionalCategory] = useUpdateAdditionalCategoryMutation();
  const [deleteAdditionalCategory] = useDeleteAdditionalCategoryMutation();
  const [restoreAdditionalCategory] = useRestoreAdditionalCategoryMutation();

  const onDeleteCategory = (id: string) => {
    AntDesignSwal.fire({
      title: t("are-you-sure"),
      text: t("content-will-be-deleted"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: t("yes-delete"),
      cancelButtonText: t("no-cancel"),
    }).then((result) => {
      if (result.isConfirmed) {
        console.log("deleted", id);
      }
    });
  };

  const onEditCategory = (name: string, id: string | number) => {
    console.log(name, "edit-title");
    console.log(id, "edit-id");
    form.setFieldsValue({
      ru: name,
    });
    setEditCatId(id);
    onOpen();
  };
  const onAddCategory = () => {
    setEditCatId(null);
    onOpen();
  };

  const options = categories?.data.map((item) => ({
    value: item.id,
    label: (
      <Flex justify="space-between" align="center">
        <Typography.Text>
          {item.name?.[i18next.language as keyof typeof item.name]}
        </Typography.Text>
        {item.status === STATUS.ACTIVE ? (
          <Flex align="center" gap={5}>
            <Can i="update" a="additional">
              <FaPen
                onClick={() =>
                  item.name &&
                  onEditCategory(
                    item.name[i18next.language as keyof typeof item.name],
                    1,
                  )
                }
                cursor={"pointer"}
                color="grey"
                title={t("edit")}
              />
            </Can>
            <Can i="delete" a="additional">
              <FaTrash
                onClick={() => onDeleteCategory(item.id)}
                cursor={"pointer"}
                color="grey"
                title={t("delete")}
              />
            </Can>
          </Flex>
        ) : (
          <Flex>
            <Can i="restore" a="additional">
              <MdRestore
                cursor={"pointer"}
                color="orange"
                title={t("delete")}
              />
            </Can>
          </Flex>
        )}
      </Flex>
    ),
  }));

  const prevParams = useMemo(() => {
    return returnAllParams();
  }, []);

  const onCategoryChange = (value: string) => {
    setCategory(value);
    setSearchParams({
      ...prevParams,
      category: value,
    });
  };

  const onCloseClear = () => {
    onClose();
    form.resetFields();
  };

  const onSubmit = async (values: { ru: string; uz: string; cy: string }) => {
    const body = {
      id: editCatId,
      name: {
        ru: values.ru,
        uz: values.uz,
        cy: values.cy,
      },
    };
    const request = editCatId
      ? updateAdditionalCategory
      : createAdditionalCategory;
    const response = await request(body);

    notificationResponse(response, onCloseClear);
    form.resetFields();
    onCloseClear();
  };

  const onClear = () => {
    setSearchParams("");
    setCategory("");
  };

  const addPart = (menu: JSX.Element) => {
    return (
      <>
        {menu}
        <Divider style={{ margin: "8px 0" }} />
        <Can i="create" a="additional">
          <Button onClick={onAddCategory} icon={<FaPlus color="#1890ff" />}>
            {t("add")}
          </Button>
        </Can>
      </>
    );
  };

  return (
    <div className="additional-inputs-categories">
      <Flex align="center" gap={8}>
        <Flex flex={1} vertical gap={5}>
          <label htmlFor={ENUMS.CATEGORY}>
            {t("choose-additional-category")}
          </label>
          <Select
            loading={isLoading}
            value={category}
            id={ENUMS.CATEGORY}
            onSelect={onCategoryChange}
            placeholder={t("choose-additional-category")}
            options={options}
            allowClear
            onClear={onClear}
            showSearch
            dropdownRender={(menu) => addPart(menu)}
          />
        </Flex>
      </Flex>
      {/* MODAL */}
      <Modal
        open={isOpen}
        onCancel={onClose}
        footer={
          <Flex align="center" gap={8} justify="end">
            <Button onClick={onClose}>{t("cancel")}</Button>
            <Button
              type="primary"
              htmlType="submit"
              form="additional-category-modal"
            >
              {t("add")}
            </Button>
          </Flex>
        }
      >
        <Form
          onFinish={onSubmit}
          form={form}
          id={"additional-category-modal"}
          layout="vertical"
        >
          <Form.Item name={"ru"} label={t("name-ru")}>
            <Input placeholder={t("name-ru")} />
          </Form.Item>
          <Form.Item name={"uz"} label={t("name-uz")}>
            <Input placeholder={t("name-uz")} />
          </Form.Item>
          <Form.Item name={"cy"} label={t("name-cyrill")}>
            <Input placeholder={t("name-cyrill")} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
