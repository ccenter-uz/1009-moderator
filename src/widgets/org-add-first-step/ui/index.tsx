import { Col, Form, FormInstance, Input, Row } from "antd";
import i18next from "i18next";
import { FC, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { TableCategoryServices } from "@features/table-category-services";

import {
  useLazyGetCategoriesQuery,
  useLazyGetSubCategoriesQuery,
} from "@entities/category-subcategory";
import { useLazyGetDistrictsQuery } from "@entities/district";
import { useGetMainOrgQuery } from "@entities/main-org";
import {
  useGetRegionsQuery,
  useLazyGetCitiesQuery,
} from "@entities/region-city";
import { useGetSegmentsQuery } from "@entities/segments";

import { allActives, getLocalStorage } from "@shared/lib/helpers";
import { RootState } from "@shared/types";
import { SearchableSelect } from "@shared/ui";
import { ParagraphBold } from "@shared/ui/paragraph-bold";

import { setData } from "../model/Slicer";

interface IProps {
  form: FormInstance;
}

export const OrgAddFirstStepUI: FC<IProps> = (props) => {
  const { form } = props;
  const Storage = localStorage.getItem("firstStepData");
  const localS = getLocalStorage("firstStepData");
  const role = getLocalStorage("user-role");
  const { t } = useTranslation();
  const [disabledInputs, setDisabledInputs] = useState(false);
  const { data } = useSelector(
    ({ useAddOrgFirstStepSlice }: RootState) => useAddOrgFirstStepSlice,
  );
  const [
    triggerCategory,
    { data: categoryData, isLoading: isLoadingCategory },
  ] = useLazyGetCategoriesQuery();
  const { data: mainOrgData, isLoading: isLoadingMainOrg } =
    useGetMainOrgQuery(allActives);
  const { data: segmentsData, isLoading: isLoadingSegments } =
    useGetSegmentsQuery(allActives);
  const [
    trigerSubcategory,
    { data: subcategoryData, isLoading: isLoadingSubcategory },
  ] = useLazyGetSubCategoriesQuery();

  const { data: regionData, isLoading: isLoadingRegion } =
    useGetRegionsQuery(allActives);
  const [triggerCities, { data: citiesData, isLoading: isLoadingCities }] =
    useLazyGetCitiesQuery();
  const [
    triggerDistrict,
    { data: districtData, isLoading: isLoadingDistrict },
  ] = useLazyGetDistrictsQuery();

  const onChangeRegion = (value: string) => {
    if (!value) return null;
    triggerCities({
      regionId: value,
      ...allActives,
    });
    triggerCategory({
      ...allActives,
      regionId: Number(value),
    });
    form.resetFields(["cityId", "districtId", "categoryId", "subCategoryId"]);
    setDisabledInputs(false);
  };
  const onChangeCity = (value: string) => {
    if (!value) return null;
    triggerDistrict({
      regionId: Number(form.getFieldValue("regionId")),
      cityId: value,
      ...allActives,
    });
    triggerCategory({
      ...allActives,
      regionId: Number(form.getFieldValue("regionId")),
      cityId: Number(value),
    });
    form.resetFields(["districtId", "categoryId", "subCategoryId"]);
  };

  const onChangeCategory = (value: string) => {
    trigerSubcategory({
      categoryId: value,
      ...allActives,
    });
  };

  useEffect(() => {
    if (Storage) {
      const { cityId, districtId, regionId } = localS;
      if (regionId) {
        setDisabledInputs(false);
      }
      if (cityId && regionId) {
        triggerCities({
          regionId: Number(regionId),
          ...allActives,
        });
      }
      if (districtId && regionId && cityId) {
        triggerDistrict({
          regionId: Number(regionId),
          cityId: Number(cityId),
          ...allActives,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Storage]);

  useEffect(() => {
    if (Storage) {
      const { subCategoryId, categoryId, regionId, cityId } = localS;
      if (categoryId && regionId && cityId) {
        triggerCategory({
          regionId,
          cityId,
          ...allActives,
        });
      }
      if (subCategoryId) {
        trigerSubcategory({ ...allActives, categoryId });
      }
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Storage]);

  return (
    <>
      <Row justify={"space-between"} gutter={24}>
        <Col span={12}>
          <Form.Item
            name={"name"}
            label={<ParagraphBold>{t("abonent")}</ParagraphBold>}
            rules={[
              {
                required: true,
                message: t("required-field"),
              },
            ]}
          >
            <Input type="text" placeholder={t("abonent")} allowClear />
          </Form.Item>
          <Form.Item
            name={"legalName"}
            label={<ParagraphBold>{t("org-name")}</ParagraphBold>}
          >
            <Input type="text" placeholder={t("org-name")} allowClear />
          </Form.Item>
          <Form.Item
            name={"regionId"}
            label={<ParagraphBold>{t("region")}</ParagraphBold>}
            rules={[
              {
                required: true,
                message: t("required-field"),
              },
            ]}
          >
            <SearchableSelect
              onSelect={onChangeRegion}
              loading={isLoadingRegion}
              placeholder={t("region")}
              options={regionData?.data.map(
                (item: Record<string, string | number>) => ({
                  value: item.id,
                  label: String(
                    item.name[i18next.language as keyof typeof item.name],
                  ),
                }),
              )}
              onClear={() => {
                form.resetFields([
                  "cityId",
                  "districtId",
                  "categoryId",
                  "subCategoryId",
                ]),
                  setDisabledInputs(true);
              }}
            />
          </Form.Item>
          <Form.Item
            name={"cityId"}
            label={<ParagraphBold>{t("city")}</ParagraphBold>}
            rules={[
              {
                required: true,
                message: t("required-field"),
              },
            ]}
          >
            <SearchableSelect
              disabled={disabledInputs}
              onSelect={onChangeCity}
              loading={isLoadingCities}
              options={citiesData?.data.map(
                (item: Record<string, string | number>) => ({
                  value: item.id,
                  label: String(
                    item.name[i18next.language as keyof typeof item.name],
                  ),
                }),
              )}
              onClear={() =>
                form.resetFields(["districtId", "categoryId", "subCategoryId"])
              }
              placeholder={t("city")}
            />
          </Form.Item>
          <Form.Item
            name={"districtId"}
            label={<ParagraphBold>{t("district")}</ParagraphBold>}
          >
            <SearchableSelect
              disabled={disabledInputs}
              loading={isLoadingDistrict}
              options={districtData?.data.map(
                (item: Record<string, string | number>) => ({
                  value: item.id,
                  label: String(
                    item.name[i18next.language as keyof typeof item.name],
                  ),
                }),
              )}
              placeholder={t("district")}
            />
          </Form.Item>
          <Form.Item
            name={"categoryId"}
            label={<ParagraphBold>{t("category")}</ParagraphBold>}
            rules={[
              {
                required: true,
                message: t("required-field"),
              },
            ]}
          >
            <SearchableSelect
              disabled={disabledInputs}
              options={categoryData?.data.map(
                (item: Record<string, string | number>) => ({
                  value: item.id,
                  label: String(
                    item.name[i18next.language as keyof typeof item.name],
                  ),
                }),
              )}
              placeholder={t("category")}
              loading={isLoadingCategory}
              onSelect={onChangeCategory}
            />
          </Form.Item>
        </Col>
        <Col span={12}>
          <Form.Item
            name={"subCategoryId"}
            label={<ParagraphBold>{t("sub-category")}</ParagraphBold>}
            rules={[
              {
                required: true,
                message: t("required-field"),
              },
            ]}
          >
            <SearchableSelect
              disabled={disabledInputs}
              options={subcategoryData?.data.map(
                (item: Record<string, string | number>) => ({
                  value: item.id,
                  label: String(
                    item.name[i18next.language as keyof typeof item.name],
                  ),
                }),
              )}
              placeholder={t("sub-category")}
              loading={isLoadingSubcategory}
            />
          </Form.Item>
          <Form.Item
            name={"mainOrganizationId"}
            label={<ParagraphBold>{t("main-org")}</ParagraphBold>}
            rules={[
              {
                required: true,
                message: t("required-field"),
              },
            ]}
          >
            <SearchableSelect
              placeholder={t("main-org")}
              options={mainOrgData?.data.map(
                (item: Record<string, string | number>) => ({
                  value: item.id,
                  label: item.name,
                }),
              )}
              loading={isLoadingMainOrg}
            />
          </Form.Item>
          {role === "moderator" ? (
            <Form.Item
              name={"secret"}
              label={<ParagraphBold>{t("Секрет")}</ParagraphBold>}
              rules={[
                {
                  required: true,
                  message: t("required-field"),
                },
              ]}
            >
              <Input type="text" placeholder={t("Секрет")} allowClear />
            </Form.Item>
          ) : null}

          <Form.Item
            name={"segmentId"}
            label={<ParagraphBold>{t("segment")}</ParagraphBold>}
          >
            <SearchableSelect
              placeholder={t("segment")}
              options={segmentsData?.data.map(
                (item: Record<string, string | number>) => ({
                  value: item.id,
                  label: item.name,
                }),
              )}
              loading={isLoadingSegments}
            />
          </Form.Item>
          <Form.Item
            name={"manager"}
            label={<ParagraphBold>{t("manager")}</ParagraphBold>}
          >
            <Input type="text" placeholder={t("manager")} allowClear />
          </Form.Item>
        </Col>
      </Row>
      <TableCategoryServices data={data} setData={setData} />
    </>
  );
};
