export enum CategorySubCategoryEnums {
  categoryPage = "category-page",
  categoryLimit = "category-limit",
  categorySearch = "category-search",
  categoryId = "category-id",
  categoryStatus = "category-status",

  subCategoryPage = "subCategory-page",
  subCategoryLimit = "subCategory-limit",
  subCategorySearch = "subCategory-search",
  subCategoryStatus = "sub-category-status",
  regionId = "region_id",
  cityId = "city_id",
}

export type editCategoryType = {
  name: {
    uz: string;
    ru: string;
    cy: string;
  };
  id: string | number;
  staffNumber: string;
  status: string | number;
  key?: string | number;
  region?: {
    id: number | string;
    title?: string;
    name: { ru: string; uz: string; cy: string };
  };
  city?: {
    id: number | string;
    title?: string;
    name: { ru: string; uz: string; cy: string };
  };
};

export type editSubcategoryType = editCategoryType;
