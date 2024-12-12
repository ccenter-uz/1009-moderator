export enum CategorySubCategoryEnums {
  categoryPage = "category-page",
  categoryLimit = "category-limit",
  categorySearch = "category-search",
  categoryId = "category-id",
  subCategoryPage = "subCategory-page",
  subCategoryLimit = "subCategory-limit",
  subCategorySearch = "subCategory-search",
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
};

export type editSubcategoryType = editCategoryType;
