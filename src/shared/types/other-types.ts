import { AnyObject } from "antd/es/_util/type";

export type ItableDataAddress = {
  key: string | number;
  id: number | string;
  name_ru?: string;
  new_name_ru?: string;
  old_name_ru?: string;
  name_uz?: string;
  old_name_uz?: string;
  new_name_uz?: string;
  name_uzcyrill?: string;
  old_name_uzcyrill?: string;
  new_name_uzcyrill?: string;
  index: string;
  region: string;
  city: string;
  district: string;
  updated_date: string;
  employee: string;
};

export type ItableBasicData = {
  key: string | number;
  id: number | string;
  name?: string;
  name_ru?: string;
  name_uz?: string;
  name_uzcyrill?: string;
  name_cyrill?: string;
  updated_date: string;
  employee: string;
};

export type ItableWithRegions = ItableBasicData & {
  region: string;
  city: string;
  status?: number;
  staffNumber?: string | number;
};

export interface IOrganizationBody {
  [key: string]: AnyObject | string | number;
}
