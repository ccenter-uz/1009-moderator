export interface User {
  id: number;
  name: string;
  email: string;
}

export interface UserUpdateData {
  name?: string;
  email?: string;
}

export interface GetUserParams {
  id: number;
}

export interface UpdateUserParams {
  id: number;
  data: UserUpdateData;
}
