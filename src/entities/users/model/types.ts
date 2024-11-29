export type getUsersType = {
  result: {
    data: { id: string }[];
    totalDocs: number;
  };
};

export type getRolesType = getUsersType;
