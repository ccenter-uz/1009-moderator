import { Col, Form, FormInstance } from "antd";
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
  SEARCHPART_KEYS,
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
      SEARCHPART_KEYS.CITY_KEY,
      SEARCHPART_KEYS.DISTRICT_KEY,
      SEARCHPART_KEYS.CATEGORY_KEY,
      SEARCHPART_KEYS.SUBCATEGORY_KEY,
      SEARCHPART_KEYS.VILLAGE_KEY,
      SEARCHPART_KEYS.NEARBY_KEY,
      SEARCHPART_KEYS.STREET_KEY,
    ]);
    setCityDisabled(false);
    setLocalStorage(SEARCHPART_KEYS.REGION_KEY, value);
    removeLocalStorage(SEARCHPART_KEYS.CITY_KEY);
  };

  const onSelectCity = (value: string) => {
    triggerDistrict({
      regionId: form.getFieldValue(SEARCHPART_KEYS.REGION_KEY),
      cityId: value,
      all: GET_ALL_ACTIVE_STATUS.all,
      status: GET_ALL_ACTIVE_STATUS.active,
    });
    form.resetFields([
      SEARCHPART_KEYS.DISTRICT_KEY,
      SEARCHPART_KEYS.CATEGORY_KEY,
      SEARCHPART_KEYS.SUBCATEGORY_KEY,
      SEARCHPART_KEYS.VILLAGE_KEY,
      SEARCHPART_KEYS.NEARBY_KEY,
      SEARCHPART_KEYS.STREET_KEY,
    ]);
    setDistrictDisabled(false);
    setLocalStorage(SEARCHPART_KEYS.CITY_KEY, value);
  };

  useEffect(() => {
    const regionId = getLocalStorage(SEARCHPART_KEYS.REGION_KEY);
    const cityId = getLocalStorage(SEARCHPART_KEYS.CITY_KEY);
    if (regionId && cityId) {
      form.setFieldValue(SEARCHPART_KEYS.REGION_KEY, regionId);
      form.setFieldValue(SEARCHPART_KEYS.CITY_KEY, cityId);
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
      form.setFieldValue(SEARCHPART_KEYS.REGION_KEY, regionId);
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
          name={SEARCHPART_KEYS.REGION_KEY}
          label={t("region")}
          style={{ marginBottom: 10 }}
        >
          <SearchableSelect
            onClear={() => {
              form.resetFields([
                SEARCHPART_KEYS.CITY_KEY,
                SEARCHPART_KEYS.DISTRICT_KEY,
                SEARCHPART_KEYS.CATEGORY_KEY,
                SEARCHPART_KEYS.SUBCATEGORY_KEY,
                SEARCHPART_KEYS.VILLAGE_KEY,
                SEARCHPART_KEYS.NEARBY_KEY,
                SEARCHPART_KEYS.STREET_KEY,
              ]),
                setCityDisabled(true),
                setDistrictDisabled(true);
              removeLocalStorage(SEARCHPART_KEYS.REGION_KEY);
              removeLocalStorage(SEARCHPART_KEYS.CITY_KEY);
            }}
            options={
              dataRegions?.data.map(
                (region: Record<string, string | number>) => ({
                  label: String(
                    region.name[i18next.language as keyof typeof region.name],
                  ),
                  value: region.id,
                }),
              ) || []
            }
            placeholder={t("region")}
            onSelect={onSelectRegion}
            loading={isLoadingRegions}
          />
        </Form.Item>
      </Col>
      <Col span={24}>
        <Form.Item
          name={SEARCHPART_KEYS.CITY_KEY}
          label={t("city")}
          style={{ marginBottom: 10 }}
        >
          <SearchableSelect
            disabled={cityDisabled}
            onClear={() => {
              form.resetFields([
                SEARCHPART_KEYS.DISTRICT_KEY,
                SEARCHPART_KEYS.CATEGORY_KEY,
                SEARCHPART_KEYS.SUBCATEGORY_KEY,
                SEARCHPART_KEYS.VILLAGE_KEY,
                SEARCHPART_KEYS.NEARBY_KEY,
                SEARCHPART_KEYS.STREET_KEY,
              ]),
                setDistrictDisabled(true);
              removeLocalStorage(SEARCHPART_KEYS.CITY_KEY);
            }}
            options={
              dataCities?.data.map((city: Record<string, string | number>) => ({
                label: String(
                  city.name[i18next.language as keyof typeof city.name],
                ),
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
          name={SEARCHPART_KEYS.DISTRICT_KEY}
          label={t("district")}
          style={{ marginBottom: 10 }}
        >
          <SearchableSelect
            disabled={dataDistrict?.data.length === 0 || districtDisabled}
            placeholder={t("district")}
            options={
              dataDistrict?.data.map(
                (passage: Record<string, string | number>) => ({
                  label: String(
                    passage.name[i18next.language as keyof typeof passage.name],
                  ),
                  value: passage.id,
                }),
              ) || []
            }
            loading={isLoadingDistrict}
          />
        </Form.Item>
      </Col>
    </>
  );
};
