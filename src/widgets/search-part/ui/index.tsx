import { Button, Col, Divider, Flex, Form, Row } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { FC, SetStateAction, Dispatch, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { PersonalSearchPartUI } from "@widgets/personal-search-part";

import { AddressSearchPartUI } from "@features/address-search-part";
import { CategorySubcategorySelect } from "@features/category-subCategory-select";
import { ContactSearchPartUI } from "@features/contact-search-part";

import { SearchContext } from "@shared/lib/context";
import {
  getLocalStorage,
  removeLocalStorage,
  removeSessionStorage,
  setLocalStorage,
} from "@shared/lib/helpers";

type Props = {
  searchValues: AnyObject | null;
  setSearchValues: Dispatch<SetStateAction<{ regionId: number } | null>>;
  searchTableRef?: HTMLElement | null;
  setFromEdit: Dispatch<SetStateAction<boolean>>;
};

const SEARCHVALUE_KEY = "searchValues";
const FROM_EDIT_KEY = "fromEdit";
const REGION_KEY = "regionId";
const CITY_KEY = "cityId";

export const SearchPartUI: FC<Props> = (props) => {
  const { setSearchValues, searchTableRef, setFromEdit } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [formReset, setFormReset] = useState(0);

  const onSubmit = (values: { regionId: number; cityId: number }) => {
    setSearchValues(values);
    setLocalStorage(SEARCHVALUE_KEY, values);

    searchTableRef?.scrollIntoView({ behavior: "smooth" });
  };

  const onCancel = () => {
    setSearchValues(null);
    const resetValues = Object.keys(form.getFieldsValue()).filter(
      (key) => key !== REGION_KEY && key !== CITY_KEY,
    );
    form.resetFields(resetValues);
    removeSessionStorage(FROM_EDIT_KEY);
    removeLocalStorage(SEARCHVALUE_KEY);
    setFromEdit(false);
    setFormReset((prev) => prev + 1);
  };

  useEffect(() => {
    const initialValues = getLocalStorage(SEARCHVALUE_KEY);
    if (initialValues) {
      form.setFieldsValue(initialValues);
      setSearchValues(initialValues);
    }
  }, []);

  return (
    <SearchContext.Provider value={formReset}>
      <Form form={form} id="search-part" onFinish={onSubmit}>
        <CategorySubcategorySelect form={form} />
        <Divider />
        <Row gutter={24}>
          <Col span={8}>
            <PersonalSearchPartUI form={form} />
          </Col>
          <Col span={8}>
            <AddressSearchPartUI form={form} />
          </Col>
          <Col span={8}>
            <ContactSearchPartUI />
          </Col>
        </Row>
        <Flex justify="end" align="middle" gap={8}>
          <Button onClick={onCancel}>{t("cancel")}</Button>
          <Button htmlType="submit" type="primary" form="search-part">
            {t("search")}
          </Button>
        </Flex>
        <Divider style={{ margin: "0.5rem 0" }} />
      </Form>
    </SearchContext.Provider>
  );
};
