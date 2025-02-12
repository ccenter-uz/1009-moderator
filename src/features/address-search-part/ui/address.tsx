import { Col, Select, Form, FormInstance } from "antd";
import { AnyObject } from "antd/es/_util/type";
import i18next, { t } from "i18next";
import { FC, useCallback, useEffect, useState } from "react";

import { useLazyGetDistrictsQuery } from "@entities/district";
import {
  useGetRegionsQuery,
  useLazyGetCitiesQuery,
} from "@entities/region-city";

import { GET_ALL_ACTIVE_STATUS } from "@shared/lib/helpers";

type Props = {
  form: FormInstance;
};

export const AddressThreeSearchPartUI: FC<Props> = (props) => {
  const { form } = props;
  const [cityDisabled, setCityDisabled] = useState(true);
  const [districtDisabled, setDistrictDisabled] = useState(true);
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
    form.resetFields(["cityId", "districtId"]);
    setCityDisabled(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onSelectCity = useCallback((value: string) => {
    triggerDistrict({
      regionId: form.getFieldValue("regionId"),
      cityId: value,
      all: GET_ALL_ACTIVE_STATUS.all,
      status: GET_ALL_ACTIVE_STATUS.active,
    });
    form.resetFields(["districtId"]);
    setDistrictDisabled(false);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (form.getFieldValue("regionId")) {
      onSelectRegion(form.getFieldValue("regionId"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.getFieldValue("regionId")]);

  return (
    <>
      <Col span={24}>
        <Form.Item
          name="regionId"
          label={t("region")}
          style={{ marginBottom: 10 }}
        >
          <Select
            allowClear
            onClear={() => {
              form.resetFields([
                "cityId",
                "districtId",
                "categoryId",
                "subCategoryId",
                "villageId",
                "nearbyId",
                "streetId",
              ]),
                setCityDisabled(true),
                setDistrictDisabled(true);
            }}
            options={
              dataRegions?.data.map((region: AnyObject) => ({
                label: region.name[i18next.language],
                value: region.id,
              })) || []
            }
            placeholder={t("region")}
            onChange={() =>
              form.resetFields([
                "cityId",
                "districtId",
                "categoryId",
                "subCategoryId",
                "villageId",
                "nearbyId",
                "streetId",
              ])
            }
            onSelect={onSelectRegion}
            loading={isLoadingRegions}
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item name="cityId" label={t("city")} style={{ marginBottom: 10 }}>
          <Select
            disabled={cityDisabled}
            allowClear
            onClear={() => {
              form.resetFields([
                "districtId",
                "categoryId",
                "subCategoryId",
                "villageId",
                "nearbyId",
                "streetId",
              ]),
                setDistrictDisabled(true);
            }}
            options={
              dataCities?.data.map((city: AnyObject) => ({
                label: city.name[i18next.language],
                value: city.id,
              })) || []
            }
            placeholder={t("city")}
            onChange={() =>
              form.resetFields([
                "districtId",
                "categoryId",
                "subCategoryId",
                "villageId",
                "nearbyId",
                "streetId",
              ])
            }
            onSelect={onSelectCity}
            loading={isLoadingCities}
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name="districtId"
          label={t("district")}
          style={{ marginBottom: 10 }}
        >
          <Select
            disabled={dataDistrict?.data.length === 0 || districtDisabled}
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
    </>
  );
};
