import { Button, Col, Divider, Flex, Form, Row } from "antd";
import { FC, SetStateAction, Dispatch, useState } from "react";
import { useTranslation } from "react-i18next";

import { PersonalSearchPartUI } from "@widgets/personal-search-part";

import { AddressSearchPartUI } from "@features/address-search-part";
import { CategorySubcategorySelect } from "@features/category-subCategory-select";
import { ContactSearchPartUI } from "@features/contact-search-part";

import { REGION_IDS } from "@shared/lib/helpers";

type Props = {
  setSearchValues: Dispatch<SetStateAction<{ regionId: number } | null>>;
  searchTableRef?: HTMLElement | null;
};

export const SearchPartUI: FC<Props> = (props) => {
  const { setSearchValues, searchTableRef } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [regionId, setRegionId] = useState<number | null>(REGION_IDS.TASHKENT);
  const [cityId, setCityId] = useState<number | null>(null);

  const onSubmit = (values: { regionId: number; cityId: number }) => {
    setSearchValues(values);

    searchTableRef?.scrollIntoView({ behavior: "smooth" });
  };

  const onValueChange = (
    changingValue: { cityId: number },
    allValues: {
      regionId: number;
      cityId: number;
    },
  ) => {
    const { regionId } = allValues;
    if (changingValue.cityId) {
      setRegionId(regionId);
      setCityId(changingValue.cityId);
    } else {
      setRegionId(regionId);
      setCityId(null);
    }
  };

  const onCancel = () => {
    setSearchValues(null);
    setRegionId(REGION_IDS.TASHKENT);
    setCityId(null);
    form.resetFields();
    form.setFieldValue("regionId", REGION_IDS.TASHKENT);
  };

  return (
    <Form
      form={form}
      id="search-part"
      onFinish={onSubmit}
      onValuesChange={onValueChange}
    >
      <CategorySubcategorySelect
        form={form}
        regionId={regionId}
        cityId={cityId}
      />
      <Divider />
      <Row gutter={24}>
        <Col span={8}>
          <PersonalSearchPartUI form={form} />
        </Col>
        <Col span={8}>
          <AddressSearchPartUI
            form={form}
            regionId={regionId}
            cityId={cityId}
          />
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
  );
};
