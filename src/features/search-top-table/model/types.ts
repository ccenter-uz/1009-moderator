export type TAttr = {
  id?: number;
  Phone: {
    phone: string;
    isSecret: boolean;
    PhoneTypes: { name: { [key: string]: string } };
  }[];

  ProductServices: {
    ProductServiceSubCategory: { name: { [key: string]: string } };
  }[];
};
export type TPhone = {
  phone: string;
  isSecret: boolean;
  phoneType: string;
};
