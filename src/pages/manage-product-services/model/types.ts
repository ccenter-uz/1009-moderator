export enum ProductServicesEnum {
  productPage = "products-page",
  productLimit = "products-limit",
  productSearch = "products-search",
  productStatus = "products-status",
  productId = "product-id",
  servicePage = "service-page",
  serviceLimit = "service-limit",
  serviceSearch = "service-search",
  serviceStatus = "service-status",
}

export type editProductType = {
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

export type editServiceType = editProductType;
