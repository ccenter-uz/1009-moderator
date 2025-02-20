import { Col, Form, FormInstance } from "antd";
import { AnyObject } from "antd/es/_util/type";
import i18next, { t } from "i18next";
import { FC, useEffect, useState } from "react";

import { useLazyGetDistrictsQuery } from "@entities/district";
import {
  useGetRegionsQuery,
  useLazyGetCitiesQuery,
} from "@entities/region-city";

import { useSearchContext } from "@shared/lib/context";
import {
  GET_ALL_ACTIVE_STATUS,
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@shared/lib/helpers";
import { SearchableSelect } from "@shared/ui";

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

  const formReset = useSearchContext();

  const onSelectRegion = (value: string) => {
    triggerCities({
      regionId: value,
      all: GET_ALL_ACTIVE_STATUS.all,
      status: GET_ALL_ACTIVE_STATUS.active,
    });
    form.resetFields([
      "cityId",
      "districtId",
      "categoryId",
      "subCategoryId",
      "villageId",
      "nearbyId",
      "streetId",
    ]);
    setCityDisabled(false);
    setLocalStorage("regionId", value);
    removeLocalStorage("cityId");
  };

  const onSelectCity = (value: string) => {
    triggerDistrict({
      regionId: form.getFieldValue("regionId"),
      cityId: value,
      all: GET_ALL_ACTIVE_STATUS.all,
      status: GET_ALL_ACTIVE_STATUS.active,
    });
    form.resetFields([
      "districtId",
      "categoryId",
      "subCategoryId",
      "villageId",
      "nearbyId",
      "streetId",
    ]);
    setDistrictDisabled(false);
    setLocalStorage("cityId", value);
  };

  useEffect(() => {
    const regionId = getLocalStorage("regionId");
    const cityId = getLocalStorage("cityId");
    if (regionId) {
      form.setFieldValue("regionId", regionId);
    }
    if (cityId) {
      form.setFieldValue("cityId", cityId);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formReset]);

  useEffect(() => {
    const regionId = getLocalStorage("regionId");
    const cityId = getLocalStorage("cityId");
    if (regionId && cityId) {
      triggerCities({
        regionId: regionId,
        all: GET_ALL_ACTIVE_STATUS.all,
        status: GET_ALL_ACTIVE_STATUS.active,
      });
      triggerDistrict({
        regionId: regionId,
        cityId: cityId,
        all: GET_ALL_ACTIVE_STATUS.all,
        status: GET_ALL_ACTIVE_STATUS.active,
      });
      setCityDisabled(false);
      setDistrictDisabled(false);
    } else if (regionId) {
      triggerCities({
        regionId: regionId,
        all: GET_ALL_ACTIVE_STATUS.all,
        status: GET_ALL_ACTIVE_STATUS.active,
      });
      setCityDisabled(false);
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [formReset]);

  return (
    <>
      <Col span={24}>
        <Form.Item
          name="regionId"
          label={t("region")}
          style={{ marginBottom: 10 }}
        >
          <SearchableSelect
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
              removeLocalStorage("regionId");
              removeLocalStorage("cityId");
            }}
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
      <Col span={24}>
        <Form.Item name="cityId" label={t("city")} style={{ marginBottom: 10 }}>
          <SearchableSelect
            disabled={cityDisabled}
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
              removeLocalStorage("cityId");
            }}
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
      <Col span={24}>
        <Form.Item
          name="districtId"
          label={t("district")}
          style={{ marginBottom: 10 }}
        >
          <SearchableSelect
            disabled={dataDistrict?.data.length === 0 || districtDisabled}
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
