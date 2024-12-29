import { Row, Col, Select, Form, FormInstance, InputNumber } from "antd";
import { AnyObject } from "antd/es/_util/type";
import { Rule } from "antd/es/form";
import i18next from "i18next";
import { FC, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import {
  useGetRegionsQuery,
  useLazyGetCitiesQuery,
} from "@entities/region-city";

import { GET_ALL_ACTIVE_STATUS, resetFieldsValue } from "@shared/lib/helpers";

type Props = {
  withIndex?: boolean;
  form: FormInstance;
  rule: Rule;
  requiredFields?: string[];
};

const FORM_FIELDS = {
  region: "region",
  city: "city",
  index: "index",
};

// REGION AND CITY IS ANYOBJECT CAUSE CANNOT FIND PROPER TYPE

export const Address2Inputs: FC<Props> = (props) => {
  const { withIndex, form, rule, requiredFields = [] } = props;
  const { t } = useTranslation();
  const { data: dataRegions, isLoading: isLoadingRegions } = useGetRegionsQuery(
    {
      all: GET_ALL_ACTIVE_STATUS.all,
      status: GET_ALL_ACTIVE_STATUS.active,
    },
  );
  const [trigger, { data: dataCities, isLoading: isLoadingCities }] =
    useLazyGetCitiesQuery();

  const onSelectRegion = useCallback((value: string) => {
    trigger({
      regionId: value,
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

  return (
    <Row gutter={8}>
      {withIndex && (
        <Col span={8}>
          <Form.Item
            name={FORM_FIELDS.index}
            rules={[rule]}
            required={requiredFields.includes(FORM_FIELDS.index)}
            label={t(FORM_FIELDS.index)}
            layout="vertical"
          >
            <InputNumber
              style={{ width: "100%" }}
              type="number"
              placeholder={t(FORM_FIELDS.index)}
            />
          </Form.Item>
        </Col>
      )}

      <Col span={8}>
        <Form.Item
          name={FORM_FIELDS.region}
          rules={[rule]}
          required={requiredFields.includes(FORM_FIELDS.region)}
          label={t(FORM_FIELDS.region)}
          layout="vertical"
        >
          <Select
            options={
              dataRegions?.data.map((region: AnyObject) => ({
                label: region.name[i18next.language],
                value: region.id,
              })) || []
            }
            placeholder={t(FORM_FIELDS.region)}
            onChange={() => resetFieldsValue(form, [FORM_FIELDS.city])}
            onSelect={onSelectRegion}
            loading={isLoadingRegions}
          />
        </Form.Item>
      </Col>
      <Col span={8}>
        <Form.Item
          name={FORM_FIELDS.city}
          rules={[rule]}
          required={requiredFields.includes(FORM_FIELDS.region)}
          label={t(FORM_FIELDS.city)}
          layout="vertical"
        >
          <Select
            options={
              dataCities?.data.map((city: AnyObject) => ({
                label: city.name[i18next.language],
                value: city.id,
              })) || []
            }
            placeholder={t(FORM_FIELDS.city)}
            loading={isLoadingCities}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};
