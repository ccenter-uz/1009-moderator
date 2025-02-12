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
import { useSearchParams } from "react-router-dom";

import {
  IAdditionalCategoryType,
  useCreateAdditionalCategoryMutation,
  useDeleteAdditionalCategoryMutation,
  useGetAdditionalCategoriesQuery,
  useUpdateAdditionalCategoryMutation,
} from "@entities/additional";

import {
  AntDesignSwal,
  GET_ALL_ACTIVE_STATUS,
  notificationResponse,
  renderLabelSelect,
  returnAllParams,
} from "@shared/lib/helpers";
import { useDisclosure } from "@shared/lib/hooks";
import { Can } from "@shared/ui";

const enum ENUMS {
  CATEGORY = "additionalCategoryId",
}

export const AdditionalInputsCategoriesUI: FC = () => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [searchParams, setSearchParams] = useSearchParams();
  const [form] = Form.useForm();
  const [category, setCategory] = useState<number | null>(
    Number(searchParams.get(ENUMS.CATEGORY)) || null,
  );
  const [editCatId, setEditCatId] = useState<number | string | null>(null);
  const { data: categories, isLoading } = useGetAdditionalCategoriesQuery({
    status: GET_ALL_ACTIVE_STATUS.active,
    all: GET_ALL_ACTIVE_STATUS.all,
  });
  const [createAdditionalCategory] = useCreateAdditionalCategoryMutation();
  const [updateAdditionalCategory] = useUpdateAdditionalCategoryMutation();
  const [deleteAdditionalCategory] = useDeleteAdditionalCategoryMutation();

  const onDeleteCategory = (id: number) => {
    AntDesignSwal.fire({
      title: t("are-you-sure"),
      text: t("content-will-be-deleted"),
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: t("yes-delete"),
      cancelButtonText: t("no-cancel"),
    }).then(async (result) => {
      if (result.isConfirmed) {
        await deleteAdditionalCategory(id);
        form.resetFields();
        const prevParams = returnAllParams();
        delete prevParams[ENUMS.CATEGORY];
        setSearchParams(prevParams);
        setCategory(null);
      }
    });
  };

  const onEditCategory = (item: IAdditionalCategoryType) => {
    form.setFieldsValue({
      ru: item.name?.ru,
      uz: item.name?.uz,
      cy: item.name?.cy,
    });
    setEditCatId(item.id);
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

        <Flex align="center" gap={5}>
          <Can i="update" a="additional">
            <FaPen
              onClick={() => onEditCategory(item)}
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
      </Flex>
    ),
  }));

  const prevParams = useMemo(() => {
    return returnAllParams();
  }, []);

  const onCategoryChange = (value: number) => {
    setCategory(value);
    setSearchParams({
      ...prevParams,
      additionalCategoryId: String(value),
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
    setCategory(null);
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
            labelRender={renderLabelSelect}
            loading={isLoading}
            value={Number(category)}
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
