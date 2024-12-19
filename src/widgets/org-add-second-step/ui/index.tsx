import { Row, Col, Input, Form, Select } from "antd";
import { AnyObject } from "antd/es/_util/type";
import i18next from "i18next";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { TableOrientirUI } from "@features/table-orientir";

import { useGetAreasQuery } from "@entities/area";
import { useGetAvenuesQuery } from "@entities/avenue";
import { useLazyGetDistrictsQuery } from "@entities/district";
import { useGetImpassesQuery } from "@entities/impasse";
import { useGetLanesQuery } from "@entities/lane";
import { useGetPassagesQuery } from "@entities/passage";
import {
  useGetRegionsQuery,
  useLazyGetCitiesQuery,
} from "@entities/region-city";
import { useGetResidentialAreasQuery } from "@entities/residential-area";
import { useGetStreetsQuery } from "@entities/street";
import { useGetVillagesQuery } from "@entities/village";

import {
  allActives,
  getLocalStorage,
  renderLabelSelect,
} from "@shared/lib/helpers";
import { RootState } from "@shared/types";

import { setData } from "../model/Slicer";

export const OrgAddSecondStepUI: FC = () => {
  const localStorage = getLocalStorage("secondStepData");
  const { t } = useTranslation();
  const { data } = useSelector(
    ({ useAddOrgSecondStepSlice }: RootState) => useAddOrgSecondStepSlice,
  );
  const { data: regionData, isLoading: isLoadingRegion } =
    useGetRegionsQuery(allActives);
  const [triggerCities, { data: citiesData, isLoading: isLoadingCities }] =
    useLazyGetCitiesQuery();
  const [
    triggerDistrict,
    { data: districtData, isLoading: isLoadingDistrict },
  ] = useLazyGetDistrictsQuery();
  const { data: villageData, isLoading: isLoadingVillage } =
    useGetVillagesQuery(allActives);
  const { data: avenueData, isLoading: isLoadingAvenue } =
    useGetAvenuesQuery(allActives);
  const { data: residentialAreaData, isLoading: isLoadingResidentialArea } =
    useGetResidentialAreasQuery(allActives);
  const { data: areaData, isLoading: isLoadingArea } =
    useGetAreasQuery(allActives);
  const { data: streetData, isLoading: isLoadingStreet } =
    useGetStreetsQuery(allActives);
  const { data: laneData, isLoading: isLoadingLane } =
    useGetLanesQuery(allActives);
  const { data: impasseData, isLoading: isLoadingImpasse } =
    useGetImpassesQuery(allActives);
  const { data: passageData, isLoading: isLoadingPassage } =
    useGetPassagesQuery(allActives);

  const onChangeRegion = (value: string) => {
    triggerCities({
      regionId: value,
      ...allActives,
    });
  };

  const onChangeCity = (value: string) => {
    triggerDistrict({
      cityId: value,
      ...allActives,
    });
  };

  useEffect(() => {
    const { city, district } = localStorage;
    if (city) {
      triggerCities({
        ...allActives,
      });
    }
    if (district) {
      triggerDistrict({
        ...allActives,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [localStorage]);

  return (
    <>
      <Row justify={"space-between"} gutter={24}>
        <Col span={8}>
          <Form.Item name={"region"} label={t("region")} required>
            <Select
              labelRender={renderLabelSelect}
              onSelect={onChangeRegion}
              loading={isLoadingRegion}
              options={regionData?.data.map((item: AnyObject) => ({
                value: item.id,
                label: item.name[i18next.language],
              }))}
              allowClear
              showSearch
              placeholder={t("region")}
            />
          </Form.Item>
          <Form.Item name={"city"} label={t("city")} required>
            <Select
              labelRender={renderLabelSelect}
              onSelect={onChangeCity}
              loading={isLoadingCities}
              options={citiesData?.data.map((item: AnyObject) => ({
                value: item.id,
                label: item.name[i18next.language],
              }))}
              allowClear
              showSearch
              placeholder={t("city")}
            />
          </Form.Item>
          <Form.Item name={"district"} label={t("district")}>
            <Select
              labelRender={renderLabelSelect}
              loading={isLoadingDistrict}
              options={districtData?.data.map((item: AnyObject) => ({
                value: item.id,
                label: item.name[i18next.language],
              }))}
              allowClear
              showSearch
              placeholder={t("district")}
            />
          </Form.Item>
          <Form.Item name={"village"} label={t("village")}>
            <Select
              labelRender={renderLabelSelect}
              loading={isLoadingVillage}
              options={villageData?.data.map((item: AnyObject) => ({
                value: item.id,
                label: item.name[i18next.language],
              }))}
              allowClear
              showSearch
              placeholder={t("village")}
            />
          </Form.Item>
          <Form.Item name={"avenue"} label={t("avenue")}>
            <Select
              labelRender={renderLabelSelect}
              loading={isLoadingAvenue}
              options={avenueData?.data.map((item: AnyObject) => ({
                value: item.id,
                label: item.name[i18next.language],
              }))}
              allowClear
              showSearch
              placeholder={t("avenue")}
            />
          </Form.Item>
          <Form.Item name={"residential-area"} label={t("residential-area")}>
            <Select
              labelRender={renderLabelSelect}
              loading={isLoadingResidentialArea}
              options={residentialAreaData?.data.map((item: AnyObject) => ({
                value: item.id,
                label: item.name[i18next.language],
              }))}
              allowClear
              showSearch
              placeholder={t("residential-area")}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={"area"} label={t("area")}>
            <Select
              labelRender={renderLabelSelect}
              loading={isLoadingArea}
              options={areaData?.data.map((item: AnyObject) => ({
                value: item.id,
                label: item.name[i18next.language],
              }))}
              allowClear
              showSearch
              placeholder={t("area")}
            />
          </Form.Item>
          <Form.Item name={"kvartal"} label={t("kvartal")}>
            <Input type="text" placeholder={t("kvartal")} allowClear />
          </Form.Item>
          <Form.Item name={"street"} label={t("street")}>
            <Select
              labelRender={renderLabelSelect}
              loading={isLoadingStreet}
              options={streetData?.data.map((item: AnyObject) => ({
                value: item.id,
                label: item.name[i18next.language],
              }))}
              allowClear
              showSearch
              placeholder={t("street")}
            />
          </Form.Item>
          <Form.Item name={"lane"} label={t("lane")}>
            <Select
              labelRender={renderLabelSelect}
              loading={isLoadingLane}
              options={laneData?.data.map((item: AnyObject) => ({
                value: item.id,
                label: item.name[i18next.language],
              }))}
              allowClear
              showSearch
              placeholder={t("lane")}
            />
          </Form.Item>
          <Form.Item name={"passage"} label={t("passage")}>
            <Select
              labelRender={renderLabelSelect}
              loading={isLoadingPassage}
              options={passageData?.data.map((item: AnyObject) => ({
                value: item.id,
                label: item.name[i18next.language],
              }))}
              allowClear
              showSearch
              placeholder={t("passage")}
            />
          </Form.Item>
          <Form.Item name={"impasse"} label={t("impasse")}>
            <Select
              labelRender={renderLabelSelect}
              loading={isLoadingImpasse}
              options={impasseData?.data.map((item: AnyObject) => ({
                value: item.id,
                label: item.name[i18next.language],
              }))}
              allowClear
              showSearch
              placeholder={t("impasse")}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name={"address"} label={t("address")}>
            <Input type="text" placeholder={t("address")} allowClear />
          </Form.Item>
          <Form.Item name={"home"} label={t("home")}>
            <Input type="text" placeholder={t("home")} allowClear />
          </Form.Item>
          <Form.Item name={"apartment"} label={t("apartment")}>
            <Input type="text" placeholder={t("apartment")} allowClear />
          </Form.Item>
        </Col>
      </Row>
      <TableOrientirUI data={data} setData={setData} />
    </>
  );
};
