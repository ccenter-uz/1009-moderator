import { Button, Col, Divider, Flex, Form, Row } from "antd";
import { FC, SetStateAction, Dispatch, useState } from "react";
import { useTranslation } from "react-i18next";

import { PersonalSearchPartUI } from "@widgets/personal-search-part";

import { AddressSearchPartUI } from "@features/address-search-part";
import { CategorySubcategorySelect } from "@features/category-subCategory-select";
import { ContactSearchPartUI } from "@features/contact-search-part";

import { SearchContext } from "@shared/lib/context";
import { CITY_IDS, REGION_IDS, setLocalStorage } from "@shared/lib/helpers";

type Props = {
  setSearchValues: Dispatch<SetStateAction<{ regionId: number } | null>>;
  searchTableRef?: HTMLElement | null;
};

export const SearchPartUI: FC<Props> = (props) => {
  const { setSearchValues, searchTableRef } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [formReset, setFormReset] = useState(0);

  const onSubmit = (values: { regionId: number; cityId: number }) => {
    setSearchValues(values);

    searchTableRef?.scrollIntoView({ behavior: "smooth" });
  };

  const onCancel = () => {
    setSearchValues(null);
    form.resetFields();
    setLocalStorage("regionId", REGION_IDS.TASHKENT);
    setLocalStorage("cityId", CITY_IDS.TASHKENT);
    setFormReset((prev) => prev + 1);
  };

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
        <Divider />
      </Form>
    </SearchContext.Provider>
  );
};
