export type getCategoryType = {
  result: {
    data: { id: string; name: string }[];
    totalDocs: number;
  };
};

export type getSubCategoryType = getCategoryType;
