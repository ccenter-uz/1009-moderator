export type successLoginType = {
  result: {
    accessToken: string;
    permissions: string;
    role: string;
  };
};

export type errorLoginType = {
  error: {
    message: string;
  };
  result?: string;
  status: number;
};
