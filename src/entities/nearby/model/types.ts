export type getNearbyCategoryType = {
  result: {
    data: { id: string; name: string }[];
    totalDocs: number;
  };
};

export type getNearbyType = getNearbyCategoryType;
