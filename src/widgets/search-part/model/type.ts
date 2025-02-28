export type TReturnProperValues = {
  regionId: number;
  cityId: number;
  categoryId: { id: number };
  subCategoryId: { id: number };
  categoryTuId: { id: number };
  subCategoryTuId: { id: number };
  mainOrg: { id: number };
  phoneType: { id: number };
  streetId: { id: number };
  villageId: { id: number };
  nearbyId: { id: number };
};
export type TSearchValues = {
  regionId: number;
  categoryId: number;
  subCategoryId: number;
  categoryTuId: number;
  subCategoryTuId: number;
  mainOrg: number;
  phoneType: number;
  streetId: number;
  villageId: number;
  nearbyId: number;
};
