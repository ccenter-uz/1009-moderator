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
