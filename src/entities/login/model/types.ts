export type successLoginType = {
  result: {
    accessToken: string;
    permissions: string;
  };
};

export type errorLoginType = {
  data: {
    error: {
      message: string;
    };
    result?: string;
    status: number;
  };
};
