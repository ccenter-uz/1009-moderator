import { Button, Divider, Flex, Form, Input, Modal, Select } from "antd";
import { FC, useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { FaPlus } from "react-icons/fa";
import { useSearchParams } from "react-router-dom";

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
  SUBCATEGORY = "sub-category",
}

export const AdditionalInputsCategoriesUI: FC = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchParams, setSearchParams] = useSearchParams();
  const [form] = Form.useForm();
  const [category, setCategory] = useState<string>(
    searchParams.get("category") || "",
  );
  const [subCategory, setSubCategory] = useState<string>(
    searchParams.get("subCategory") || "",
  );
  const [type, setType] = useState<string>("");

  const categoryOption = [
    {
      value: "entertainment",
      label: t("additional-entertainment"),
    },
    {
      value: "communal",
      label: t("additional-communal"),
    },
    {
      value: "numbers-codes",
      label: t("additional-numbers-codes"),
    },
    {
      value: "need-to-know",
      label: t("additional-need-to-know"),
    },
    {
      value: "info-tashkent",
      label: t("additional-info-tashkent"),
    },
  ];
  const subCategoryOption = [
    {
      value: "park",
      label: t("park"),
    },
    {
      value: "cinema",
      label: t("cinema"),
    },
    {
      value: "theatre",
      label: t("theatre"),
    },
  ];
  const prevParams = useMemo(() => {
    return returnAllParams();
  }, []);

  const categoryChange = (value: string) => {
    setCategory(value);
    if (value === "entertainment") {
      setSearchParams({
        ...prevParams,
        category: value,
        subCategory: subCategory,
      });
    } else {
      setSearchParams({
        ...prevParams,
        category: value,
      });
    }
  };

  const subCategoryChange = (value: string) => {
    setSubCategory(value);
    setSearchParams({
      ...prevParams,
      subCategory: value,
    });
  };

  const onCloseClear = () => {
    onClose();
    form.resetFields();
  };

  const onSubmit = (values: {
    "name-ru": string;
    "name-uz": string;
    "name-cyrill": string;
  }) => {
    if (type === ENUMS.CATEGORY) {
      console.log(values, "category");
    }
    if (type === ENUMS.SUBCATEGORY) {
      console.log(values, "subcategory");
    }
    onCloseClear();
  };

  const addPart = (menu: JSX.Element, type: string) => {
    return (
      <>
        {menu}
        <Divider style={{ margin: "8px 0" }} />
        <Button
          onClick={() => {
            setType(type), onOpen();
          }}
          icon={<FaPlus color="#1890ff" />}
        >
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
            onSelect={categoryChange}
            placeholder={t("choose-additional-category")}
            options={categoryOption}
            allowClear
            showSearch
            dropdownRender={(menu) => addPart(menu, ENUMS.CATEGORY)}
          />
        </Flex>
        {category === "entertainment" && (
          <Flex flex={1} vertical gap={5}>
            <label htmlFor={ENUMS.SUBCATEGORY}>
              {t("choose-additional-sub-category")}
            </label>
            <Select
              value={subCategory}
              id={ENUMS.SUBCATEGORY}
              onSelect={subCategoryChange}
              placeholder={t("choose-additional-sub-category")}
              options={subCategoryOption}
              allowClear
              showSearch
              dropdownRender={(menu) => addPart(menu, ENUMS.SUBCATEGORY)}
            />
          </Flex>
        )}
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
          <Form.Item name={"name-ru"} label={t("name-ru")}>
            <Input placeholder={t("name-ru")} />
          </Form.Item>
          <Form.Item name={"name-uz"} label={t("name-uz")}>
            <Input placeholder={t("name-uz")} />
          </Form.Item>
          <Form.Item name={"name-cyrill"} label={t("name-cyrill")}>
            <Input placeholder={t("name-cyrill")} />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};
