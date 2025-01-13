import { Col, Form, FormInstance, Input, Row, Select } from "antd";
import { AnyObject } from "antd/es/_util/type";
import i18next from "i18next";
import { FC, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useSelector } from "react-redux";

import { TableCategoryServices } from "@features/table-category-services";

import {
  useGetCategoriesQuery,
  useLazyGetSubCategoriesQuery,
} from "@entities/category-subcategory";
import { useLazyGetDistrictsQuery } from "@entities/district";
import { useGetMainOrgQuery } from "@entities/main-org";
import {
  useGetRegionsQuery,
  useLazyGetCitiesQuery,
} from "@entities/region-city";
import { useGetSegmentsQuery } from "@entities/segments";

import {
  allActives,
  getLocalStorage,
  renderLabelSelect,
} from "@shared/lib/helpers";
import { RootState } from "@shared/types";
import { ParagraphBold } from "@shared/ui/paragraph-bold";

import { setData } from "../model/Slicer";

interface IProps {
  form: FormInstance;
}

export const OrgEditFirstStepUI: FC<IProps> = (props) => {
  const { form } = props;
  const Storage = localStorage.getItem("firstStepDataEdit");
  const localS = getLocalStorage("firstStepDataEdit");
  const { t } = useTranslation();
  const { data } = useSelector(
    ({ useEditOrgFirstStepSlice }: RootState) => useEditOrgFirstStepSlice,
  );
  const { data: categoryData, isLoading: isLoadingCategories } =
    useGetCategoriesQuery({
      ...allActives,
      cityId: form.getFieldValue("cityId"),
    });
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
    triggerCities({
      regionId: value,
      ...allActives,
    });
    form.resetFields(["cityId", "districtId", "categoryId", "subCategoryId"]);
  };

  const onChangeCity = (value: string) => {
    triggerDistrict({
      cityId: value,
      ...allActives,
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
      const { cityId, districtId } = localS;
      if (cityId) {
        triggerCities({
          ...allActives,
        });
      }
      if (districtId) {
        triggerDistrict({
          ...allActives,
        });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [Storage]);

  useEffect(() => {
    if (Storage) {
      const { subCategoryId } = localS;

      if (subCategoryId) {
        trigerSubcategory({ ...allActives });
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
            <Select
              labelRender={renderLabelSelect}
              onSelect={onChangeRegion}
              loading={isLoadingRegion}
              options={regionData?.data.map((item: AnyObject) => ({
                value: item.id,
                label: item.name[i18next.language],
              }))}
              allowClear
              onClear={() =>
                form.resetFields([
                  "cityId",
                  "districtId",
                  "categoryId",
                  "subCategoryId",
                ])
              }
              showSearch
              placeholder={t("region")}
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
            <Select
              labelRender={renderLabelSelect}
              onSelect={onChangeCity}
              loading={isLoadingCities}
              options={citiesData?.data.map((item: AnyObject) => ({
                value: item.id,
                label: item.name[i18next.language],
              }))}
              allowClear
              onClear={() =>
                form.resetFields(["districtId", "categoryId", "subCategoryId"])
              }
              showSearch
              placeholder={t("city")}
            />
          </Form.Item>
          <Form.Item
            name={"districtId"}
            label={<ParagraphBold>{t("district")}</ParagraphBold>}
          >
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
            <Select
              labelRender={renderLabelSelect}
              options={categoryData?.data.map((item: AnyObject) => ({
                value: item.id,
                label: item.name[i18next.language],
              }))}
              placeholder={t("category")}
              allowClear
              showSearch
              loading={isLoadingCategories}
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
            <Select
              labelRender={renderLabelSelect}
              options={subcategoryData?.data.map((item: AnyObject) => ({
                value: item.id,
                label: item.name[i18next.language],
              }))}
              placeholder={t("sub-category")}
              allowClear
              showSearch
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
            <Select
              labelRender={renderLabelSelect}
              placeholder={t("main-org")}
              options={mainOrgData?.data.map((item: AnyObject) => ({
                value: item.id,
                label: item.name,
              }))}
              loading={isLoadingMainOrg}
              allowClear
              showSearch
            />
          </Form.Item>
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
          <Form.Item
            name={"segmentId"}
            label={<ParagraphBold>{t("segment")}</ParagraphBold>}
          >
            <Select
              labelRender={renderLabelSelect}
              placeholder={t("segment")}
              options={segmentsData?.data.map((item: AnyObject) => ({
                value: item.id,
                label: item.name,
              }))}
              loading={isLoadingSegments}
              allowClear
              showSearch
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
