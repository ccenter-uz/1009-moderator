import { Row, Col, Select, Form, Input, FormInstance } from "antd";
import { AnyObject } from "antd/es/_util/type";
import i18next from "i18next";
import { FC, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import {
  useGetRegionsQuery,
  useLazyGetCitiesQuery,
} from "@entities/region-city";

import { GET_ALL_ACTIVE_STATUS } from "@shared/lib/helpers";

type Props = {
  withIndex?: boolean;
  form: FormInstance;
};

// REGION AND CITY IS ANYOBJECT CAUSE CANNOT FIND PROPER TYPE

export const Address2Inputs: FC<Props> = (props) => {
  const { withIndex, form } = props;
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
    form.setFieldsValue({ city: undefined });

    trigger({
      regionId: value,
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

  return (
    <Row gutter={8}>
      {withIndex && (
        <Col span={8}>
          <Form.Item name={"index"} label={t("index")} layout="vertical">
            <Input type="text" placeholder={t("index")} />
          </Form.Item>
        </Col>
      )}

      <Col span={8}>
        <Form.Item name={"region"} label={t("region")} layout="vertical">
          <Select
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
      <Col span={8}>
        <Form.Item name={"city"} label={t("city")} layout="vertical">
          <Select
            options={
              dataCities?.data.map((city: AnyObject) => ({
                label: city.name[i18next.language],
                value: city.id,
              })) || []
            }
            placeholder={t("city")}
            loading={isLoadingCities}
          />
        </Form.Item>
      </Col>
    </Row>
  );
};
