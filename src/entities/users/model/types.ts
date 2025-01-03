export type getUsersType = {
  result: {
    data: { id: string; name: string }[];
    totalDocs: number;
  };
};

export type getRolesType = getUsersType;
