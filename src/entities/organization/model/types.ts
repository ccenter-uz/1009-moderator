export type getOrganizationType = {
  result: {
    data: {
      id: string;
      name: string;
      status: number;
      organizationId?: number;
    }[];
    totalDocs: number;
  };
};
export type getOneOrganizationType = {
  result: {
    id: string;
    name: string;
    status: number;
    organizationId?: number;
    totalDocs: number;
  };
};
