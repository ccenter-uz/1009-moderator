export interface IAdditionalType {
  id: number;
  staff_number: string;
  additional_category_id: number;
  created_at: string;
  updated_at: string;
  deleted_at: null;
  status: number;
  content: [
    {
      id: number;
      name: {
        cy: string;
        ru: string;
        uz: string;
      };
      status: number;
      content: {
        cy: string;
        ru: string;
        uz: string;
      };
      createdAt: string;
      deletedAt: null;
      updatedAt: string;
      additionalId: number;
    },
  ];
  table: [
    {
      id: number;
      name: {
        cy: string;
        ru: string;
        uz: string;
      };
      status: number;
      content: {
        cy: string;
        ru: string;
        uz: string;
      };
      createdAt: string;
      deletedAt: null;
      updatedAt: string;
    },
  ];
  name: {
    uz: string;
    cy: string;
    ru: string;
  };
  warning: {
    uz: string;
    cy: string;
    ru: string;
  };
  mention: {
    uz: string;
    cy: string;
    ru: string;
  };
}
export interface IAdditionalCategoryType {
  id: number;
  staff_number: string;
  created_at: string;
  updated_at: string;
  deleted_at: null | string;
  status: number;
  name: {
    ru: string;
    uz: string;
    cy: string;
  };
}

export interface getAdditionalsType {
  result: {
    data: IAdditionalType[];
    totalDocs: number;
  };
}
export interface getAdditionalCategoryType {
  result: {
    data: IAdditionalCategoryType[];
    totalDocs: number;
  };
}
