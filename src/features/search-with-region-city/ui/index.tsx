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

import {
  GET_ALL_ACTIVE_STATUS,
  resetFieldsValue,
  returnAllParams,
} from "@shared/lib/helpers";

interface Props {
  form: FormInstance;
  setIsSearchBtnDisable?: Dispatch<SetStateAction<boolean>>;
  handleReset: number | string | undefined;
}

const REGIONVALUES = {
  ALL: 0,
};

export const SearchWithRegionCityUI: FC<Props> = (props) => {
  const { form, setIsSearchBtnDisable, handleReset } = props;
  const { t } = useTranslation();
  const { data: dataRegions, isLoading: isLoadingRegions } = useGetRegionsQuery(
    {
      all: GET_ALL_ACTIVE_STATUS.all,
      status: GET_ALL_ACTIVE_STATUS.active,
    },
  );
  const [trigger, { data: dataCities, isLoading: isLoadingCities }] =
    useLazyGetCitiesQuery();
  const { region_id } = returnAllParams();

  const [regionValue, setRegionValue] = useState<number>(
    Number(region_id) || REGIONVALUES.ALL,
  );
  const onSelectRegion = useCallback((value: number) => {
    setRegionValue(value);
    setIsSearchBtnDisable?.(false);
    resetFieldsValue(form, ["city_id"]);

    trigger({
      regionId: value,
      all: GET_ALL_ACTIVE_STATUS.all,
      status: GET_ALL_ACTIVE_STATUS.active,
    });
  }, []);

  const onSelectCity = useCallback((value: number | undefined) => {
    if (value) {
      trigger({
        cityId: value,
        all: GET_ALL_ACTIVE_STATUS.all,
        status: GET_ALL_ACTIVE_STATUS.active,
      });
    }
  }, []);

  useEffect(() => {
    if (regionValue == REGIONVALUES.ALL) {
      setIsSearchBtnDisable?.(false);
    }
  }, [regionValue]);

  useEffect(() => {
    if (form.getFieldValue("region_id")) {
      onSelectRegion(form.getFieldValue("region_id"));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [form.getFieldValue("region_id")]);

  useEffect(() => {
    setRegionValue(REGIONVALUES.ALL);
  }, [handleReset]);

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
                value: REGIONVALUES.ALL,
              },
              ...(dataRegions?.data.map((region: AnyObject) => ({
                label: region.name[i18next.language],
                value: region.id,
              })) || []),
            ]}
            placeholder={t("region")}
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
            onSelect={onSelectCity}
            loading={isLoadingCities}
            allowClear
            disabled={!regionValue}
          />
        </Form.Item>
      </Flex>
    </Form>
  );
};
