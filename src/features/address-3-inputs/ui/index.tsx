import { Row, Col, Input, Select, Form, FormInstance } from "antd";
import { AnyObject } from "antd/es/_util/type";
import i18next from "i18next";
import { FC, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import { useLazyGetDistrictsQuery } from "@entities/district";
import {
  useGetRegionsQuery,
  useLazyGetCitiesQuery,
} from "@entities/region-city";

import { GET_ALL_ACTIVE_STATUS } from "@shared/lib/helpers";

interface Props {
  form: FormInstance;
}

export const Address3Inputs: FC<Props> = (props) => {
  const { form } = props;
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
      regionId: form.getFieldValue("region"),
      cityId: value,
      all: GET_ALL_ACTIVE_STATUS.all,
      status: GET_ALL_ACTIVE_STATUS.active,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (form.getFieldValue("region")) {
      onSelectRegion(form.getFieldValue("region"));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.getFieldValue("region")]);

  useEffect(() => {
    if (form.getFieldValue("city")) {
      onSelectCity(form.getFieldValue("city"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.getFieldValue("city")]);

  return (
    <Row gutter={8}>
      <Col xs={24} sm={12} md={12} lg={12} xl={5}>
        <Form.Item name={"index"} label={t("index")} layout="vertical">
          <Input type="text" placeholder={t("index")} />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6}>
        <Form.Item name={"region"} label={t("region")} layout="vertical">
          <Select
            allowClear
            options={
              dataRegions?.data.map((region: AnyObject) => ({
                label: region.name[i18next.language],
                value: region.id,
              })) || []
            }
            placeholder={t("region")}
            onSelect={onSelectRegion}
            loading={isLoadingRegions}
          />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6}>
        <Form.Item name={"city"} label={t("city")} layout="vertical">
          <Select
            allowClear
            options={
              dataCities?.data.map((city: AnyObject) => ({
                label: city.name[i18next.language],
                value: city.id,
              })) || []
            }
            placeholder={t("city")}
            onSelect={onSelectCity}
            loading={isLoadingCities}
          />
        </Form.Item>
      </Col>
      <Col xs={24} sm={12} md={12} lg={12} xl={6}>
        <Form.Item name={"district"} label={t("district")} layout="vertical">
          <Select
            allowClear
            placeholder={t("district")}
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
