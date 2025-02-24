import { Row, Col, Input, Form } from "antd";
import i18next from "i18next";
import { FC } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { TableOrientirUI } from "@features/table-orientir";

import { useGetAreasQuery } from "@entities/area";
import { useGetAvenuesQuery } from "@entities/avenue";
import { useGetImpassesQuery } from "@entities/impasse";
import { useGetLanesQuery } from "@entities/lane";
import { useGetNeighborhoodsQuery } from "@entities/neighborhood";
import { useGetPassagesQuery } from "@entities/passage";
import { useGetResidentialAreasQuery } from "@entities/residential-area";
import { useGetStreetsQuery } from "@entities/street";
import { useGetVillagesQuery } from "@entities/village";

import { allActives, getLocalStorage } from "@shared/lib/helpers";
import { RootState } from "@shared/types";
import { SearchableSelect } from "@shared/ui";
import { ParagraphBold } from "@shared/ui/paragraph-bold";

import { setData } from "../model/Slicer";

export const OrgEditSecondStepUI: FC = () => {
  const { t } = useTranslation();
  const getDataWithRegionCityParams = {
    ...allActives,
    regionId: getLocalStorage("firstStepDataEdit")?.regionId,
    cityId: getLocalStorage("firstStepDataEdit")?.cityId,
    districtId: getLocalStorage("firstStepDataEdit")?.districtId,
  };
  const { data } = useSelector(
    ({ useEditOrgSecondStepSlice }: RootState) => useEditOrgSecondStepSlice,
  );
  const { data: villageData, isLoading: isLoadingVillage } =
    useGetVillagesQuery(getDataWithRegionCityParams);
  const { data: avenueData, isLoading: isLoadingAvenue } = useGetAvenuesQuery(
    getDataWithRegionCityParams,
  );
  const { data: residentialAreaData, isLoading: isLoadingResidentialArea } =
    useGetResidentialAreasQuery(getDataWithRegionCityParams);
  const { data: neighborhoodData, isLoading: isLoadingNeighborhood } =
    useGetNeighborhoodsQuery(getDataWithRegionCityParams);
  const { data: areaData, isLoading: isLoadingArea } = useGetAreasQuery(
    getDataWithRegionCityParams,
  );
  const { data: streetData, isLoading: isLoadingStreet } = useGetStreetsQuery(
    getDataWithRegionCityParams,
  );
  const { data: laneData, isLoading: isLoadingLane } = useGetLanesQuery(
    getDataWithRegionCityParams,
  );
  const { data: impasseData, isLoading: isLoadingImpasse } =
    useGetImpassesQuery(getDataWithRegionCityParams);
  const { data: passageData, isLoading: isLoadingPassage } =
    useGetPassagesQuery(getDataWithRegionCityParams);

  return (
    <>
      <Row justify={"space-between"} gutter={24}>
        <Col span={8}>
          <Form.Item
            name={"villageId"}
            label={<ParagraphBold>{t("village")}</ParagraphBold>}
          >
            <SearchableSelect
              loading={isLoadingVillage}
              options={villageData?.data.map(
                (item: Record<string, string | number>) => ({
                  value: item.id,
                  label: String(
                    item.name[i18next.language as keyof typeof item.name],
                  ),
                }),
              )}
              placeholder={t("village")}
            />
          </Form.Item>
          <Form.Item
            name={"avenueId"}
            label={<ParagraphBold>{t("avenue")}</ParagraphBold>}
          >
            <SearchableSelect
              loading={isLoadingAvenue}
              options={avenueData?.data.map(
                (item: Record<string, string | number>) => ({
                  value: item.id,
                  label: String(
                    item.name[i18next.language as keyof typeof item.name],
                  ),
                }),
              )}
              placeholder={t("avenue")}
            />
          </Form.Item>
          <Form.Item
            name={"residentialId"}
            label={<ParagraphBold>{t("residential-area")}</ParagraphBold>}
          >
            <SearchableSelect
              loading={isLoadingResidentialArea}
              options={residentialAreaData?.data.map(
                (item: Record<string, string | number>) => ({
                  value: item.id,
                  label: String(
                    item.name[i18next.language as keyof typeof item.name],
                  ),
                }),
              )}
              placeholder={t("residential-area")}
            />
          </Form.Item>
          <Form.Item
            name={"neighborhoodId"}
            label={<ParagraphBold>{t("neighborhood")}</ParagraphBold>}
          >
            <SearchableSelect
              loading={isLoadingNeighborhood}
              options={neighborhoodData?.data.map(
                (item: Record<string, string | number>) => ({
                  value: item.id,
                  label: String(
                    item.name[i18next.language as keyof typeof item.name],
                  ),
                }),
              )}
              placeholder={t("neighborhood")}
            />
          </Form.Item>
          <Form.Item
            name={"areaId"}
            label={<ParagraphBold>{t("area")}</ParagraphBold>}
          >
            <SearchableSelect
              loading={isLoadingArea}
              options={areaData?.data.map(
                (item: Record<string, string | number>) => ({
                  value: item.id,
                  label: String(
                    item.name[i18next.language as keyof typeof item.name],
                  ),
                }),
              )}
              placeholder={t("area")}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={"kvartal"}
            label={<ParagraphBold>{t("kvartal")}</ParagraphBold>}
          >
            <Input type="text" placeholder={t("kvartal")} allowClear />
          </Form.Item>
          <Form.Item
            name={"streetId"}
            label={<ParagraphBold>{t("street")}</ParagraphBold>}
          >
            <SearchableSelect
              loading={isLoadingStreet}
              options={streetData?.data.map(
                (item: Record<string, string | number>) => ({
                  value: item.id,
                  label: String(
                    item.name[i18next.language as keyof typeof item.name],
                  ),
                }),
              )}
              placeholder={t("street")}
            />
          </Form.Item>
          <Form.Item
            name={"laneId"}
            label={<ParagraphBold>{t("lane")}</ParagraphBold>}
          >
            <SearchableSelect
              loading={isLoadingLane}
              options={laneData?.data.map(
                (item: Record<string, string | number>) => ({
                  value: item.id,
                  label: String(
                    item.name[i18next.language as keyof typeof item.name],
                  ),
                }),
              )}
              placeholder={t("lane")}
            />
          </Form.Item>
          <Form.Item
            name={"passageId"}
            label={<ParagraphBold>{t("passage")}</ParagraphBold>}
          >
            <SearchableSelect
              loading={isLoadingPassage}
              options={passageData?.data.map(
                (item: Record<string, string | number>) => ({
                  value: item.id,
                  label: String(
                    item.name[i18next.language as keyof typeof item.name],
                  ),
                }),
              )}
              placeholder={t("passage")}
            />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item
            name={"impasseId"}
            label={<ParagraphBold>{t("impasse")}</ParagraphBold>}
          >
            <SearchableSelect
              loading={isLoadingImpasse}
              options={impasseData?.data.map(
                (item: Record<string, string | number>) => ({
                  value: item.id,
                  label: String(
                    item.name[i18next.language as keyof typeof item.name],
                  ),
                }),
              )}
              placeholder={t("impasse")}
            />
          </Form.Item>
          <Form.Item
            name={"address"}
            label={<ParagraphBold>{t("address")}</ParagraphBold>}
          >
            <Input type="text" placeholder={t("address")} allowClear />
          </Form.Item>
          <Form.Item
            name={"home"}
            label={<ParagraphBold>{t("home")}</ParagraphBold>}
          >
            <Input type="text" placeholder={t("home")} allowClear />
          </Form.Item>
          <Form.Item
            name={"apartment"}
            label={<ParagraphBold>{t("apartment")}</ParagraphBold>}
          >
            <Input type="text" placeholder={t("apartment")} allowClear />
          </Form.Item>
        </Col>
      </Row>
      <TableOrientirUI data={data} setData={setData} type="edit" />
    </>
  );
};
