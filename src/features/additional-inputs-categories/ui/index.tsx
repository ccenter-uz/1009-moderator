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
import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPen, FaPlus, FaTrash } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";
import Swal from "sweetalert2";

import { returnAllParams } from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";

/**
 * AdditionalInputsCategoriesUI
 *
 * This component is used to select additional categories and subcategories
 * for the search.
 *
 * It has the following functions:
 *
 * - `categoryChange`: This function is called when the category select is changed.
 *   It updates the category state and navigates to the new URL with the selected category.
 * - `subCategoryChange`: This function is called when the subcategory select is changed.
 *   It updates the subcategory state and navigates to the new URL with the selected subcategory.
 * - `onCloseClear`: This function is called when the modal is closed.
 *   It resets the form fields and closes the modal.
 * - `onSubmit`: This function is called when the form is submitted.
 *   It logs the form values to the console and closes the modal.
 *
 * It has the following state:
 *
 * - `category`: This state is used to store the selected category.
 * - `subCategory`: This state is used to store the selected subcategory.
 * @returns {JSX.Element} - The JSX element of the component.
 */

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
  const onDeleteCategory = () => {
    Swal.fire({
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
        console.log("deleted");
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

  const categoryOption = [
    {
      value: "entertainment",
      label: (
        <Flex justify="space-between" align="center">
          <Typography.Text>{t("additional-entertainment")}</Typography.Text>
          <Flex align="center" gap={5}>
            <FaPen
              onClick={() => onEditCategory(t("additional-entertainment"), 1)}
              cursor={"pointer"}
              color="grey"
              title={t("edit")}
            />
            <FaTrash
              onClick={onDeleteCategory}
              cursor={"pointer"}
              color="grey"
              title={t("delete")}
            />
          </Flex>
        </Flex>
      ),
    },
    {
      value: "communal",
      label: (
        <Flex justify="space-between" align="center">
          <Typography.Text>{t("additional-communal")}</Typography.Text>
          <Flex align="center" gap={5}>
            <FaPen
              onClick={() => onEditCategory(t("additional-communal"), 2)}
              cursor={"pointer"}
              color="grey"
              title={t("edit")}
            />
            <FaTrash
              onClick={onDeleteCategory}
              cursor={"pointer"}
              color="grey"
              title={t("delete")}
            />
          </Flex>
        </Flex>
      ),
    },
    {
      value: "numbers-codes",
      label: (
        <Flex justify="space-between" align="center">
          <Typography.Text>{t("additional-numbers-codes")}</Typography.Text>
          <Flex align="center" gap={5}>
            <FaPen
              onClick={() => onEditCategory(t("additional-numbers-codes"), 3)}
              cursor={"pointer"}
              color="grey"
              title={t("edit")}
            />
            <FaTrash
              onClick={onDeleteCategory}
              cursor={"pointer"}
              color="grey"
              title={t("delete")}
            />
          </Flex>
        </Flex>
      ),
    },
    {
      value: "need-to-know",
      label: (
        <Flex justify="space-between" align="center">
          <Typography.Text>{t("additional-need-to-know")}</Typography.Text>
          <Flex align="center" gap={5}>
            <FaPen
              onClick={() => onEditCategory(t("additional-need-to-know"), 4)}
              cursor={"pointer"}
              color="grey"
              title={t("edit")}
            />
            <FaTrash
              onClick={onDeleteCategory}
              cursor={"pointer"}
              color="grey"
              title={t("delete")}
            />
          </Flex>
        </Flex>
      ),
    },
    {
      value: "info-tashkent",
      label: (
        <Flex justify="space-between" align="center">
          <Typography.Text>{t("additional-info-tashkent")}</Typography.Text>
          <Flex align="center" gap={5}>
            <FaPen
              onClick={() => onEditCategory(t("additional-info-tashkent"), 5)}
              cursor={"pointer"}
              color="grey"
              title={t("edit")}
            />
            <FaTrash
              onClick={onDeleteCategory}
              cursor={"pointer"}
              color="grey"
              title={t("delete")}
            />
          </Flex>
        </Flex>
      ),
    },
  ];

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

  const onSubmit = (values: { ru: string; uz: string; cy: string }) => {
    if (editCatId) {
      console.log("editing", { ...values, category_id: editCatId });
    } else {
      console.log("creating", values);
    }
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
        <Button onClick={onAddCategory} icon={<FaPlus color="#1890ff" />}>
          {t("add")}
        </Button>
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
            value={category}
            id={ENUMS.CATEGORY}
            onSelect={onCategoryChange}
            placeholder={t("choose-additional-category")}
            options={categoryOption}
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
