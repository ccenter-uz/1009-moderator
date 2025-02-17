export interface IResidentialAreaValues {
  index: string;
  region: string;
  city: string;
  district: string;
  name_uz: string;
  name_ru: string;
  name_uzcyrill: string;
  old_name_uz: string;
  old_name_ru: string;
  old_name_cyrill: string;
  new_name_uz: string;
  new_name_ru: string;
  new_name_cyrill: string;
  id?: number;
  status?: number;
  regionId?: string;
  cityId?: string;
  districtId?: string;
  region_id?: string;
  city_id?: string;
  district_id?: string;
  name: { uz: string; ru: string; cy: string };
  oldName: { uz: string; ru: string; cy: string };
  newName: { uz: string; ru: string; cy: string };
  orderNumber?: number;
  order_number?: number;
}
