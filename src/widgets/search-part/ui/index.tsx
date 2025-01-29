import { Button, Col, Divider, Flex, Form, Row } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { FC, SetStateAction, Dispatch, useState } from "react";
import { useTranslation } from "react-i18next";

import { PersonalSearchPartUI } from "@widgets/personal-search-part";

import { AddressSearchPartUI } from "@features/address-search-part";
import { CategorySubcategorySelect } from "@features/category-subCategory-select";
import { ContactSearchPartUI } from "@features/contact-search-part";

type Props = {
  setSearchValues: Dispatch<SetStateAction<AnyObject | null>>;
  searchTableRef?: HTMLElement | null;
};

export const SearchPartUI: FC<Props> = (props) => {
  const { setSearchValues, searchTableRef } = props;
  const { t } = useTranslation();
  const [form] = Form.useForm();
  const [regionId, setRegionId] = useState<number | null>(null);
  const [cityId, setCityId] = useState<number | null>(null);

  const onSubmit = (values: AnyObject) => {
    setSearchValues(values);

    searchTableRef?.scrollIntoView({ behavior: "smooth" });
  };

  const onValueChange = ({
    regionId,
    cityId,
  }: {
    regionId: number;
    cityId: number;
  }) => {
    if (regionId !== undefined) {
      setRegionId(regionId);
    }
    if (cityId !== undefined) {
      setCityId(cityId);
    }
  };

  const onCancel = () => {
    setSearchValues(null);
    setRegionId(null);
    setCityId(null);
    form.resetFields();
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
      <Divider />
    </Form>
  );
};
