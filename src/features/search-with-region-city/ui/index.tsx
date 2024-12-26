/* eslint-disable react-hooks/exhaustive-deps */
import { Flex, FormInstance, Select, Form } from "antd";
import { AnyObject } from "antd/es/_util/type";
import i18next from "i18next";
import {
  Dispatch,
  FC,
  SetStateAction,
  useCallback,
  useEffect,
  useState,
} from "react";
import { useTranslation } from "react-i18next";

import {
  useGetRegionsQuery,
  useLazyGetCitiesQuery,
} from "@entities/region-city";

import { GET_ALL_ACTIVE_STATUS, resetFieldsValue } from "@shared/lib/helpers";

interface Props {
  form: FormInstance;
  setIsSearchBtnDisable?: Dispatch<SetStateAction<boolean>>;
}

export const SearchWithRegionCityUI: FC<Props> = (props) => {
  const { form, setIsSearchBtnDisable } = props;
  const { t } = useTranslation();
  const { data: dataRegions, isLoading: isLoadingRegions } = useGetRegionsQuery(
    {
      all: GET_ALL_ACTIVE_STATUS.all,
      status: GET_ALL_ACTIVE_STATUS.active,
    },
  );
  const [trigger, { data: dataCities, isLoading: isLoadingCities }] =
    useLazyGetCitiesQuery();
  const [regionValue, setRegionValue] = useState<number>();

  const onSelectRegion = useCallback((value: string) => {
    trigger({
      regionId: value,
      all: GET_ALL_ACTIVE_STATUS.all,
      status: GET_ALL_ACTIVE_STATUS.active,
    });
  }, []);

  const onSelectCity = useCallback((value: string | undefined) => {
    if (value) {
      trigger({
        cityId: value,
        all: GET_ALL_ACTIVE_STATUS.all,
        status: GET_ALL_ACTIVE_STATUS.active,
      });
    }
  }, []);

  const onRegionSelectChange = (value: string) => {
    setRegionValue(+value);
    if (value === "0") {
      setIsSearchBtnDisable?.(false);
    } else {
      setIsSearchBtnDisable?.(true);
    }

    resetFieldsValue(form, ["city_id"]);
  };

  useEffect(() => {
    if (regionValue == 0) {
      setIsSearchBtnDisable?.(false);
    }
  }, [regionValue]);

  const onCitySelectChange = (value: string | undefined) => {
    setIsSearchBtnDisable?.(value === undefined ? true : false);
  };

  useEffect(() => {
    if (form.getFieldValue("region_id")) {
      onSelectRegion(form.getFieldValue("region_id"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.getFieldValue("region_id")]);

  return (
    <Form form={form} style={{ flex: 0.5 }}>
      <Flex align="center" gap={16}>
        <Form.Item
          name={"region_id"}
          label={t("region")}
          style={{ marginBottom: 0, flex: 1 }}
        >
          <Select
            options={[
              {
                id: 0,
                label: t("all"),
                value: 0,
              },
              ...(dataRegions?.data.map((region: AnyObject) => ({
                label: region.name[i18next.language],
                value: region.id,
              })) || []),
            ]}
            placeholder={t("region")}
            onChange={onRegionSelectChange}
            onSelect={onSelectRegion}
            loading={isLoadingRegions}
            allowClear
          />
        </Form.Item>
        <Form.Item
          name={"city_id"}
          label={t("city")}
          style={{ marginBottom: 0, flex: 1 }}
        >
          <Select
            options={
              dataCities?.data.map((city: AnyObject) => ({
                label: city.name[i18next.language],
                value: city.id,
              })) || []
            }
            placeholder={t("city")}
            onChange={onCitySelectChange}
            onSelect={onSelectCity}
            loading={isLoadingCities}
            allowClear
          />
        </Form.Item>
      </Flex>
    </Form>
  );
};
