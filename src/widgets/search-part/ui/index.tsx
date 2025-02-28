import { Button, Col, Divider, Flex, Form, Row } from "antd";
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
  SEARCHPART_KEYS,
  setLocalStorage,
} from "@shared/lib/helpers";

import { TReturnProperValues, TSearchValues } from "../model/type";

type Props = {
  searchValues: TSearchValues | null;
  setSearchValues: Dispatch<SetStateAction<TSearchValues | null>>;
  searchTableRef?: HTMLElement | null;
  setFromEdit: Dispatch<SetStateAction<boolean>>;
};

const returnProperValues = (values: TReturnProperValues) => {
  return {
    ...values,
    categoryId: values.categoryId?.id,
    subCategoryId: values.subCategoryId?.id,
    categoryTuId: values.categoryTuId?.id,
    subCategoryTuId: values.subCategoryTuId?.id,
    mainOrg: values.mainOrg?.id,
    phoneType: values.phoneType?.id,
    streetId: values.streetId?.id,
    villageId: values.villageId?.id,
    nearbyId: values.nearbyId?.id,
  };
};

export const SearchPartUI: FC<Props> = (props) => {
  const { setSearchValues, searchTableRef, setFromEdit } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [formReset, setFormReset] = useState(0);

  const onSubmit = (values: TReturnProperValues) => {
    setSearchValues(returnProperValues(values));
    setLocalStorage(SEARCHPART_KEYS.SEARCHVALUE_KEY, values);

    searchTableRef?.scrollIntoView({ behavior: "smooth" });
  };

  const onCancel = () => {
    setSearchValues(null);
    const resetValues = Object.keys(form.getFieldsValue()).filter(
      (key) =>
        key !== SEARCHPART_KEYS.REGION_KEY && key !== SEARCHPART_KEYS.CITY_KEY,
    );
    form.resetFields(resetValues);
    removeSessionStorage(SEARCHPART_KEYS.FROM_EDIT_KEY);
    removeLocalStorage(SEARCHPART_KEYS.SEARCHVALUE_KEY);
    setFromEdit(false);
    setFormReset((prev) => prev + 1);
  };

  useEffect(() => {
    const initialValues = getLocalStorage(SEARCHPART_KEYS.SEARCHVALUE_KEY);
    if (initialValues) {
      form.setFieldsValue(initialValues);
      setSearchValues(returnProperValues(initialValues));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
