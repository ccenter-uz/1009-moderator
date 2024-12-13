import { Flex, FormInstance, Select, Form } from "antd";
import { AnyObject } from "antd/es/_util/type";
import i18next from "i18next";
import { FC, useCallback, useEffect } from "react";
import { useTranslation } from "react-i18next";

import {
  useGetRegionsQuery,
  useLazyGetCitiesQuery,
} from "@entities/region-city";

import { GET_ALL_ACTIVE_STATUS } from "@shared/lib/helpers";

interface Props {
  form: FormInstance;
}

export const SearchWithRegionCityUI: FC<Props> = (props) => {
  const { form } = props;
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
      region_id: value,
      all: GET_ALL_ACTIVE_STATUS.all,
      status: GET_ALL_ACTIVE_STATUS.active,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

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
            options={
              dataRegions?.data.map((region: AnyObject) => ({
                label: region.name[i18next.language],
                value: region.id,
              })) || []
            }
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
            loading={isLoadingCities}
            allowClear
          />
        </Form.Item>
      </Flex>
    </Form>
  );
};
