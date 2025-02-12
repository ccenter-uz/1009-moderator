export type TGetMonitoringUsers = {
  result: {
    data: { id: string; name: string }[];
    totalDocs: number;
  };
};

export type TGetMonitoringOrganizations = TGetMonitoringUsers;
