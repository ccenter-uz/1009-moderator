import { useGetUserQuery, useUpdateUserMutation } from "../api";

export const UserProfile = ({ userId }: { userId: number }) => {
  const { data: user, isLoading } = useGetUserQuery({ id: userId });
  const [updateUser] = useUpdateUserMutation();

  // ... rest of the component
};
