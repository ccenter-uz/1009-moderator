import { Row, Col, Select, Form, FormInstance } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { Rule } from "antd/es/form";
import TextArea from "antd/es/input/TextArea";
import i18next from "i18next";
import { FC, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useLazyGetDistrictsQuery } from "@entities/district";
import {
  useGetRegionsQuery,
  useLazyGetCitiesQuery,
} from "@entities/region-city";

import { GET_ALL_ACTIVE_STATUS, resetFieldsValue } from "@shared/lib/helpers";

interface Props {
  form: FormInstance;
  rule: Rule;
  requiredFields?: string[];
}

export const FORM_FIELDS = {
  index: "index",
  region: "region",
  city: "city",
  district: "district",
};

export const Address3Inputs: FC<Props> = (props) => {
  const { form, rule, requiredFields = [] } = props;
  const { t } = useTranslation();
  const { data: dataRegions, isLoading: isLoadingRegions } = useGetRegionsQuery(
    {
      all: GET_ALL_ACTIVE_STATUS.all,
      status: GET_ALL_ACTIVE_STATUS.active,
    },
  );

  const [triggerCities, { data: dataCities, isLoading: isLoadingCities }] =
    useLazyGetCitiesQuery();

  const [
    triggerDistrict,
    { data: dataDistrict, isLoading: isLoadingDistrict },
  ] = useLazyGetDistrictsQuery();

  const onSelectRegion = useCallback((value: string) => {
    triggerCities({
      regionId: value,
      all: GET_ALL_ACTIVE_STATUS.all,
      status: GET_ALL_ACTIVE_STATUS.active,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelectCity = useCallback((value: string) => {
    triggerDistrict({
      regionId: form.getFieldValue(FORM_FIELDS.region),
      cityId: value,
      all: GET_ALL_ACTIVE_STATUS.all,
      status: GET_ALL_ACTIVE_STATUS.active,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (form.getFieldValue(FORM_FIELDS.region)) {
      onSelectRegion(form.getFieldValue(FORM_FIELDS.region));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.getFieldValue(FORM_FIELDS.region)]);

  useEffect(() => {
    if (form.getFieldValue(FORM_FIELDS.city)) {
      onSelectCity(form.getFieldValue(FORM_FIELDS.city));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.getFieldValue(FORM_FIELDS.city)]);

  return (
    <Row gutter={8}>
      <Col xs={24} sm={12} md={12} lg={12} xl={8}>
        <Form.Item
          name={FORM_FIELDS.index}
          rules={[rule]}
          required={requiredFields.includes(FORM_FIELDS.index)}
          label={t(FORM_FIELDS.index)}
          layout="vertical"
        >
          <TextArea placeholder={t(FORM_FIELDS.index)} />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={5}>
        <Form.Item
          name={FORM_FIELDS.region}
          rules={[rule]}
          required={requiredFields.includes(FORM_FIELDS.region)}
          label={t(FORM_FIELDS.region)}
          layout="vertical"
        >
          <Select
            allowClear
            options={
              dataRegions?.data.map((region: AnyObject) => ({
                label: region.name[i18next.language],
                value: region.id,
              })) || []
            }
            placeholder={t(FORM_FIELDS.region)}
            onChange={() =>
              resetFieldsValue(form, [FORM_FIELDS.city, FORM_FIELDS.district])
            }
            onSelect={onSelectRegion}
            loading={isLoadingRegions}
          />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6}>
        <Form.Item
          name={FORM_FIELDS.city}
          rules={[rule]}
          required={requiredFields.includes(FORM_FIELDS.city)}
          label={t(FORM_FIELDS.city)}
          layout="vertical"
        >
          <Select
            allowClear
            options={
              dataCities?.data.map((city: AnyObject) => ({
                label: city.name[i18next.language],
                value: city.id,
              })) || []
            }
            placeholder={t(FORM_FIELDS.city)}
            onChange={() => resetFieldsValue(form, [FORM_FIELDS.district])}
            onSelect={onSelectCity}
            loading={isLoadingCities}
          />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={5}>
        <Form.Item
          name={FORM_FIELDS.district}
          rules={[rule]}
          required={requiredFields.includes(FORM_FIELDS.district)}
          label={t(FORM_FIELDS.district)}
          layout="vertical"
        >
          <Select
            allowClear
            placeholder={t(FORM_FIELDS.district)}
            options={
              dataDistrict?.data.map((passage: AnyObject) => ({
                label: passage.name[i18next.language],
                value: passage.id,
              })) || []
            }
            loading={isLoadingDistrict}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};
